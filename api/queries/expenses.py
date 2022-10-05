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



class ExpensesRepository:
    def get_all(self) -> Union[Error, List[ExpensesOut]]:
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
                            expense = ExpensesOut(
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