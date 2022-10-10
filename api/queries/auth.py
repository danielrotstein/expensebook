from pydantic import BaseModel
from queries.pool import pool


class Auth(BaseModel):
    id: int
    email: str
    hashed_password: str
    full_name: str



class AuthIn(BaseModel):
    email: str
    password: str
    full_name: str


class AuthOut(BaseModel):
    id: int
    email: str
    full_name: str



class AuthsQueries:
    def get_one(self, email: str) -> Auth:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our SELECT statement
                result = db.execute(
                    """
                    SELECT id
                         , email
                         , hashed_password
                         , full_name
                    FROM auths
                    WHERE email = %s;
                    """,
                    [email]
                )
                record = result.fetchone()
                if record is None:
                    return None
                return Auth(
                    id=record[0],
                    email=record[1],
                    hashed_password=record[2],
                    full_name=record[3],
                )

    def create(self, auth: AuthIn, hashed_password: str) -> Auth:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our SELECT statement
                result = db.execute(
                    """
                    INSERT INTO auths (email, hashed_password, full_name)
                    VALUES (%s, %s, %s)
                    RETURNING id;
                    """,
                    [auth.email, hashed_password, auth.full_name]
                )
                id = result.fetchone()[0]
                return Auth(
                    id=id,
                    email=auth.email,
                    hashed_password=hashed_password,
                    full_name=auth.full_name,
                )
