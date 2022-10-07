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
    def get_all_account(self) -> Union[List[AccountOut], Error]:
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

                    return [
                        self.record_to_account_out(record)
                        for record in result
                    ]

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
                    # Return new data
                    # old_data = account.dict()
                    # return AccountOut(id=id, **old_data)                    
                    return self.account_in_to_out(id, account)


        except Exception as e:
            print("There was an error: ", e)
            return {"message": "Unable to create an account"}


    def delete_account(self, account_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM accounts
                        WHERE id = %s
                        """,
                        [account_id],
                    )
                    return True
        except Exception as e:
            return False


    def update_account(self, account_id: int, account: AccountIn) -> Union[AccountOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE accounts
                        SET first_name = %s
                          , last_name = %s
                          , email = %s
                          , password = %s
                        WHERE id = %s
                        """,
                        [
                              account.first_name
                            , account.last_name
                            , account.email
                            , account.password
                            , account_id
                        ],
                    )
                    # old_data = expense.dict()
                    # return ExpenseOut(id=expense_id, **old_data)
                    return self.account_in_to_out(account_id, account)
        except Exception as e:
            print(e)
            return {"message": "Could not update that expense"}


    def account_in_to_out(self, id: int, account: AccountIn):
        old_data = account.dict()
        return AccountOut(id=id, **old_data)
            

    def record_to_account_out(self, record):
        return AccountOut(
            id = record[0],
            first_name = record[1],
            last_name = record[2],
            email = record[3],
            password = record[4]
        )

