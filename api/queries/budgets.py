from pydantic import BaseModel
from typing import (
    Union,
    List,
    Optional,
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
    def get_all_budget(self) -> Union[List[BudgetOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            id
                            , title
                            , start_date
                            , end_date
                            , budget
                            , home_country
                            , destination_country
                            , account_id
                        FROM budgets
                        ORDER BY id;
                        """,
                    )

                    return [self.record_to_budget_out(record)
                            for record in result]
        except Exception as e:
            print("There was an error: ", e)
            return {"message": "Unable to get all budgets"}

    def get_one_budget(self, budget_id: int) -> Optional[BudgetOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT b.id
                             , b.title
                             , b.start_date
                             , b.end_date
                             , b.budget
                             , b.home_country
                             , b.destination_country
                             , a.id
                        FROM budgets AS b
                        LEFT JOIN accounts AS a
                            ON (b.account_id = a.id)
                        WHERE b.id = %s
                        ORDER BY b.start_date;
                        """,
                        [budget_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_budget_out(record)
        except Exception as e:
            print(e)

    def get_all_budget_by_oneuser(
            self, email: str) -> Union[List[BudgetOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT b.id
                             , b.title
                             , b.start_date
                             , b.end_date
                             , b.budget
                             , b.home_country
                             , b.destination_country
                             , b.account_id
                             , a.email
                        FROM budgets AS b
                        INNER JOIN accounts AS a
                            ON (b.account_id = a.id)
                            AND a.email = %s
                        ORDER BY b.start_date;
                        """,
                        [email],
                    )
                    return [self.record_to_budget_out(record)
                            for record in result]
        except Exception as e:
            print("There was an error: ", e)
            return {"message":
                    "Unable to get all budgets for this user: {email}"}

    def create_budget(self, budget: BudgetIn) -> BudgetOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO budgets
                            (
                                 title
                                , start_date
                                , end_date
                                , budget
                                , home_country
                                , destination_country
                                , account_id
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
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.budget_in_to_out(id, budget)
        except Exception as e:
            print("There was an error: ", e)
            return {"message": "Unable to create a budget"}

    def delete_budget(self, budget_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM budgets
                        WHERE id = %s
                        """,
                        [budget_id],
                    )
                    return True
        except Exception:
            return False

    def update_budget(
        self, budget_id: int, budget: BudgetIn
    ) -> Union[BudgetOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE budgets
                        SET title = %s
                          , start_date = %s
                          , end_date = %s
                          , budget = %s
                          , home_country = %s
                          , destination_country = %s
                          , account_id = %s
                        WHERE id = %s
                        """,
                        [
                            budget.title,
                            budget.start_date,
                            budget.end_date,
                            budget.budget,
                            budget.home_country,
                            budget.destination_country,
                            budget.account_id,
                            budget_id,
                        ],
                    )
                    return self.budget_in_to_out(budget_id, budget)
        except Exception as e:
            print(e)
            return {"message": "Could not update that budget"}

    def budget_in_to_out(self, id: int, budget: BudgetIn):
        old_data = budget.dict()
        return BudgetOut(id=id, **old_data)

    def record_to_budget_out(self, record):
        return BudgetOut(
            id=record[0],
            title=record[1],
            start_date=record[2],
            end_date=record[3],
            budget=record[4],
            home_country=record[5],
            destination_country=record[6],
            account_id=record[7],
        )
