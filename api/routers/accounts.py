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
def get_all_account(
    repo: AccountRepository = Depends(),
):
    return repo.get_all_account()


@router.post("/accounts", response_model=Union[AccountOut, Error])
def create_account(
    account: AccountIn,
    repo: AccountRepository = Depends(),
):
    return repo.create_account(account)


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
