from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool



class Error(BaseModel):
    message: str


class ExpenseIn(BaseModel):
    title: str
    date: date
    expense_total: int
    description: Optional[str]
    budget_id: int
    category_id: int
    


class ExpensesOut(BaseModel):
    id: int
    title: str
    date: date
    expense_total: int
    description: Optional[str]
    budget_id: int
    category_id: int


class ExpenseRepository:
    def get_all(self) -> Optional[ExpensesOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT e.id
                             , e.title
                             , e.date
                             , e.expense_total
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
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not all expenses"}



    def get_one(self, expense_id: int) -> Optional[ExpensesOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT e.id
                             , e.title
                             , e.date
                             , e.expense_total
                             , e.description
                             , b.id
                             , c.id
                        FROM expenses
                        WHERE id = %s
                        LEFT JOIN budgets AS b
                            ON (e.budget_id = b.id)
                        LEFT JOIN categories AS c
                            ON (e.category_id = c.id)
                        ORDER BY date;
                        """,
                        [expense_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_expense_out(record)
        except Exception as e:
            print(e)
            


    def create(self, expense: ExpenseIn) -> Union[ExpensesOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO expenses
                            (id
                             ,title
                             ,date
                             ,expense_total
                             ,description
                             ,budget_id
                             ,category_id)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING e.id;
                        """,
                        [
                            expense.title,
                            expense.date,
                            expense.expense_total,
                            expense.description,
                            expense.budget_id,
                            expense.category_id
                        ]
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    # old_data = vacation.dict()
                    # return VacationOut(id=id, **old_data)
                    return self.expense_in_to_out(id, expense)
        except Exception:
            return {"message": "Create did not work"}

    def expense_in_to_out(self, id: int, expense: ExpenseIn):
        old_data = expense.dict()
        return ExpensesOut(id=id, **old_data)
            

    def record_to_vacation_out(self, record):
        return ExpensesOut(
            id=record[0],
            title=record[1],
            date=record[2],
            expense_total=record[3],
            description=record[4],
            budget_id=record[5],
            category_id=record[6]
        )
