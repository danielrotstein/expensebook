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
    


class ExpenseOut(BaseModel):
    id: int
    title: str
    date: date
    expense_total: int
    description: Optional[str]
    budget_id: int
    category_id: int


class ExpenseRepository:
    def get_all_expense(self) -> Optional[ExpenseOut]:
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



    def get_one_expense(self, expense_id) -> Optional[ExpenseOut]:
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
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO expenses
                            (
                             title
                            ,date
                            ,expense_total
                            ,description
                            ,budget_id
                            ,category_id)
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                             expense.title
                            ,expense.date
                            ,expense.expense_total
                            ,expense.description
                            ,expense.budget_id
                            ,expense.category_id
                        ]
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    # old_data = expense.dict()
                    # return ExpenseOut(id=id, **old_data)
                    return self.expense_in_to_out(id, expense)
        except Exception:
            return {"message": "Unable to create an expense"}

    def expense_in_to_out(self, id: int, expense: ExpenseIn):
        old_data = expense.dict()
        return ExpenseOut(id=id, **old_data)
            

    def record_to_expense_out(self, record):
        return ExpenseOut(
            id=record[0],
            title=record[1],
            date=record[2],
            expense_total=record[3],
            description=record[4],
            budget_id=record[5],
            category_id=record[6]
        )
