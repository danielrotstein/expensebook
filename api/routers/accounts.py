from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from typing import Union, List
from pydantic import BaseModel

from queries.accounts import (
    Error,
    AccountRepository,
    AccountOut,
    AccountIn,
    Account,
)


class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str


router = APIRouter(tags=["SIGN IN"])



@router.post("/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    account = repo.create(info, hashed_password)
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: Account = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return { 
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }




# from fastapi import(
#     APIRouter, 
#     Depends,
# )
# from typing import Union, List
# from queries.accounts import(
#     Error,
#     AccountRepository,
#     AccountIn,
#     AccountOut,
# )


# router = APIRouter(tags=["Accounts"])


@router.get("/accounts", response_model=Union[List[AccountOut], Error])
def get_accounts(
    repo: AccountRepository = Depends(),
):
    return repo.get_accounts()


# @router.post("/accounts", response_model=Union[AccountOut, Error])
# def create_account(
#     account: AccountIn,
#     repo: AccountRepository = Depends(),
# ):
#     return repo.create_account(account)
