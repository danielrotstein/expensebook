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
    def create_expense(self, expense: ExpenseIn) -> Union[ExpenseOut, Error]:
        try:
            # connect the DB
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO expenses
                            (title, date, expense_total, description, budget_id, category_id)
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            expense.title, 
                            expense.date,
                            expense.expense_total, 
                            expense.description, 
                            expense.budget_id, 
                            expense.category_id, 
                        ]
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    old_data = expense.dict()
                    return ExpenseOut(id=id, **old_data)

        except Exception as e:
            print(e)
            return {"message": "Could not create vacation!"}



    def get_all_expenses(self) -> Union[Error, List[ExpenseOut]]:
        try:
        # connect the DB
                with pool.connection() as conn:
                    # get a cursor (something to run SQL with)
                    with conn.cursor() as db:
                        # Run our SELECT statement
                        result = db.execute(
                            """
                            SELECT id, title, date, expense_total, description, budget_id, category_id
                            FROM expenses
                            ORDER BY id
                            """ 
                        )
                        result = []
                        for record in db:
                            expense = ExpenseOut(
                                id=record[0],
                                title=record[1],
                                date=record[2],
                                expense_total=record[3],
                                description=record[4],
                                budget_id=record[5],
                                category_id=record[6],
                            )
                            result.append(expense)
                        return result

        except Exception as e:
            print(e)
            return {"message": "Could not get all expenses!"}