from pydantic import BaseModel
from typing import ( 
    Union, 
    List,
)
from datetime import date
from queries.pool import pool


class DuplicateAccountError(ValueError):
    pass

class Error(BaseModel):
    message: str


class Account(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    password: str
    hashed_password: str


class AccountIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
    # hashed_password: str


class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str


class AccountRepository:

    def get_accounts(self) -> Union[List[AccountOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , first_name
                            , last_name
                            , email
                            , password
                            , hashed_password
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
                            password = record[4],
                            hashed_password = record[5]
                        )
                        output.append(account)
                    return output
        except Exception as e:
            print("There was an error: ", e)
            return {"message": "Unable to get all accounts"}


    def get_one_account(self, email: str) -> Account:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our SELECT statement
                result = db.execute(
                    """
                    SELECT id
                         , first_name
                         , last_name
                         , email
                         , password
                         , hashed_password
                         
                    FROM accounts
                    WHERE email = %s;
                    """,
                    [email]
                )
                record = result.fetchone()
                if record is None:
                    return None
                return Account(
                    id=record[0],
                    first_name=record[1],
                    last_name=record[2],
                    email=record[3],
                    password=record[4],
                    hashed_password=record[5],
                )


    def create_account(self, account: AccountIn, hashed_password: str) -> Account:
    # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our SELECT statement
                result = db.execute(
                    """
                    INSERT INTO accounts (first_name, last_name, email, password, hashed_password)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [account.first_name, account.last_name, account.email, account.password, hashed_password]
                )
                id = result.fetchone()[0]
                print("ACCOUNT: ", account.password)
                return Account(
                    id=id,
                    first_name=account.first_name,
                    last_name=account.last_name,
                    email=account.email,
                    password=account.password,
                    hashed_password=hashed_password,
                )
    

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
                    return self.account_in_to_out(account_id, account)
        except Exception as e:
            print(e)
            return {"message": "Could not update that account"}


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
