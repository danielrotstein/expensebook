from fastapi import(
    APIRouter, 
    Depends,
)
from typing import Union, List
from queries.accounts import(
    Error,
    AccountRepository,
    AccountIn,
    AccountOut,
)


router = APIRouter(tags=["Accounts"])


@router.get("/accounts", response_model=Union[List[AccountOut], Error])
def get_accounts(
    repo: AccountRepository = Depends(),
):
    return repo.get_accounts()


@router.post("/accounts", response_model=Union[AccountOut, Error])
def create_account(
    account: AccountIn,
    repo: AccountRepository = Depends(),
):
    return repo.create_account(account)
