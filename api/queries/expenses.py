from pydantic import BaseModel
from typing import Optional, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class ExpenseIn(BaseModel):
    title: str
    date: date
    expense_total: float
    expense_converted: float
    description: Optional[str]
    budget_id: int
    category_id: int


class ExpenseOut(BaseModel):
    id: int
    title: str
    date: date
    expense_total: float
    expense_converted: float
    description: Optional[str]
    budget_id: int
    category_id: int


class ExpensePatch(BaseModel):
    title: str
    date: date
    expense_total: int
    description: Optional[str]
    category_id: int


class ExpenseRepository:
    def get_all_expenses(self) -> Optional[ExpenseOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT e.id
                             , e.title
                             , e.date
                             , e.expense_total
                             , e.expense_converted
                             , e.description
                             , b.id
                             , c.id
                        FROM expenses AS e
                        LEFT JOIN budgets AS b
                            ON (e.budget_id = b.id)
                        LEFT JOIN categories AS c
                            ON (e.category_id = c.id)
                        ORDER BY date;
                        """,
                    )
                    return [
                        self.record_to_expense_out(record)
                        for record in result]
        except Exception as e:
            print(e)
            return {"message": "Could not get all expenses"}

    def get_one_expense(self, expense_id) -> Optional[ExpenseOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT e.id
                             , e.title
                             , e.date
                             , e.expense_total
                             , e.expense_converted
                             , e.description
                             , b.id
                             , c.id
                        FROM expenses AS e
                        LEFT JOIN budgets AS b
                            ON (e.budget_id = b.id)
                        LEFT JOIN categories AS c
                            ON (e.category_id = c.id)
                        WHERE e.id = %s
                        ORDER BY e.date;
                        """,
                        [expense_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_expense_out(record)
        except Exception as e:
            print(e)

    def create_expense(self, expense: ExpenseIn) -> Union[ExpenseOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO expenses
                            ( title
                            , date
                            , expense_total
                            , expense_converted
                            , description
                            , budget_id
                            , category_id)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            expense.title,
                            expense.date,
                            expense.expense_total,
                            expense.expense_converted,
                            expense.description,
                            expense.budget_id,
                            expense.category_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.expense_in_to_out(id, expense)
        except Exception:
            return {"message": "Unable to create an expense"}

    def delete_expense(self, expense_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM expenses
                        WHERE id = %s
                        """,
                        [expense_id],
                    )
                    return True
        except Exception:
            return False

    def update_expense(
        self, expense_id: int, expense: ExpenseIn
    ) -> Union[ExpenseOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE expenses
                        SET title = %s
                          , date = %s
                          , expense_total = %s
                          , expense_converted = %s
                          , description = %s
                          , budget_id = %s
                          , category_id = %s
                        WHERE id = %s
                        """,
                        [
                            expense.title,
                            expense.date,
                            expense.expense_total,
                            expense.expense_converted,
                            expense.description,
                            expense.budget_id,
                            expense.category_id,
                            expense_id,
                        ],
                    )
                    return self.expense_in_to_out(expense_id, expense)
        except Exception as e:
            print(e)
            return {"message": "Could not update that expense"}

    def expense_in_to_out(self, id: int, expense: ExpenseIn):
        old_data = expense.dict()
        return ExpenseOut(id=id, **old_data)

    def record_to_expense_out(self, record):
        return ExpenseOut(
            id=record[0],
            title=record[1],
            date=record[2],
            expense_total=record[3],
            expense_converted=record[4],
            description=record[5],
            budget_id=record[6],
            category_id=record[7],
        )
