
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
from typing import List, Optional, Union
from pydantic import BaseModel

from queries.accounts import (
    Error,
    DuplicateAccountError,
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

not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


@router.get("/accounts", response_model=Union[List[AccountOut], Error])
def get_accounts(
    repo: AccountRepository = Depends(),
):
    return repo.get_accounts()


@router.get("/accounts/{email}", response_model=Optional[AccountOut])
def get_one_account(
    email: str,
    response: Response,
    repo: AccountRepository = Depends(),
) -> AccountOut:
    account = repo.get_one_account(email)
    if account is None:
        response.status_code = 404
    return account


@router.post("/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    account = repo.create_account(info, hashed_password)
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.put("/accounts/id={account_id}", response_model=Union[AccountOut, Error])
def update_account(
    account_id: int,
    account: AccountIn,
    repo: AccountRepository = Depends(),
) -> Union[Error, AccountOut]:
    return repo.update_account(account_id, account)


@router.delete("/accounts/id={account_id}", response_model=bool)
def delete_account(
    account_id: int,
    repo: AccountRepository = Depends(),
) -> bool:
    return repo.delete_account(account_id)


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

