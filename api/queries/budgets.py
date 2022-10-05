from pydantic import BaseModel
from typing import (
    Union, 
    List,
)
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class BudgetIn(BaseModel):
    title: str
    start_date: date
    end_date: date
    budget: int
    home_country: str
    destination_country: str
    account_id: int


class BudgetOut(BaseModel):
    id: int
    title: str
    start_date: date
    end_date: date
    budget: int
    home_country: str
    destination_country: str
    account_id: int


class BudgetRepository:
    def get_budgets(self) -> Union[List[BudgetOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, title, start_date, end_date, budget, home_country, destination_country, account_id
                        FROM budgets
                        ORDER BY id;
                        """
                    )
                    output = []
                    for record in db:
                        print("RECORD: ", record)
                        budget = BudgetOut(
                            id = record[0],
                            title = record[1],
                            start_date = record[2],
                            end_date = record[3],
                            budget = record[4],
                            home_country = record[5],
                            destination_country = record[6],
                            account_id = record[7],
                        )
                        output.append(budget)
                    return output
        except Exception as e:
            print("There was an error: ", e)
            return {"message": "Unable to get all budgets"}

    def create_budget(self, budget: BudgetIn) -> BudgetOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO budgets
                            (
                                title, 
                                start_date, 
                                end_date, 
                                budget, 
                                home_country, 
                                destination_country,
                                account_id
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            budget.title,
                            budget.start_date,
                            budget.end_date,
                            budget.budget,
                            budget.home_country,
                            budget.destination_country,
                            budget.account_id,
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = budget.dict()
                    return BudgetOut(id=id, **old_data)
        except Exception as e:
            print("There was an error: ", e)
            return {"message": "Unable to create a budget"}