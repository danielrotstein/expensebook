import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.auth import AuthsQueries, Auth, AuthOut


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AuthsQueries,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get_one(username)

    def get_account_getter(
        self,
        accounts: AuthsQueries = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: Auth):
        # Return the encrypted password value from your
        # account object
        return account.hashed_password

    def get_account_data_for_cookie(self, account: Auth):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.email, AuthOut(**account.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])