from pydantic import BaseModel
from typing import ( 
    Union, 
    List,
)
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class AccountIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str


class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    password: str


class AccountRepository:
    def get_accounts(self) -> Union[List[AccountOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, first_name, last_name, email, password
                        FROM accounts
                        ORDER BY id 
                        """
                    )
                    output = []
                    for record in db:
                        account = AccountOut(
                            id = record[0],
                            first_name = record[1],
                            last_name = record[2],
                            email = record[3],
                            password = record[4]
                        )
                        output.append(account)
                    return output
        except Exception as e:
            print("There was an error: ", e)
            return {"message": "Unable to get all accounts"}

    def create_account(self, account: AccountIn) -> Union[AccountOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO accounts
                            (
                                first_name,
                                last_name,
                                email,
                                password
                            )
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            account.first_name,
                            account.last_name,
                            account.email,
                            account.password,
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = account.dict()
                    return AccountOut(id=id, **old_data)
        except Exception as e:
            print("There was an error: ", e)
            return {"message": "Unable to create an account"}
