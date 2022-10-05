from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool



class Error(BaseModel):
    message: str


class ExpensesIn(BaseModel):
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
                        SELECT id
                             , title
                             , date
                             , expense_total
                             , description
                             , budget_id
                             , category_id
                        FROM expenses
                        ORDER BY date;
                        """
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
                        SELECT id
                             , title
                             , date
                             , expense_total
                             , description
                             , budget_id
                             , category_id
                        FROM expenses
                        WHERE id = %s
                        """,
                        [expense_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_expense_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that expense"}

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
