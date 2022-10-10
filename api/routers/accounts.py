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

from pydantic import BaseModel
from typing import Union, List
from queries.accounts import (
    Error,
    AccountRepository,
    AccountOut,
    AccountIn,
)


class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str


# router = APIRouter(tags=["SIGN IN"])
router = APIRouter(tags=["Accounts"])


@router.get("/accounts", response_model=Union[List[AccountOut], Error])
def get_all_account(
    repo: AccountRepository = Depends(),
):
    return repo.get_all_account()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
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


@router.get("/accounts", response_model=Union[List[AccountOut], Error])
def get_all_account(
    repo: AccountRepository = Depends(),
):
    return repo.get_all_account()


# @router.post("/accounts", response_model=Union[AccountOut, Error])
# def create_account(
#     account: AccountIn,
#     repo: AccountRepository = Depends(),
# ):
#     return repo.create_account(account)


@router.put("/accounts/{account_id}", response_model=Union[AccountOut, Error])
def update_account(
    account_id: int,
    account: AccountIn,
    repo: AccountRepository = Depends(),
) -> Union[Error, AccountOut]:
    return repo.update_account(account_id, account)


@router.delete("/accounts/{account_id}", response_model=bool)
def delete_account(
    account_id: int,
    repo: AccountRepository = Depends(),
) -> bool:
    return repo.delete_account(account_id)
