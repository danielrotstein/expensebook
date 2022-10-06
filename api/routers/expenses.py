from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from datetime import date
from queries.expenses import (
    Error,
    ExpenseIn,
    ExpenseRepository,
    ExpenseOut,
)


router = APIRouter(tags=["Expenses"])


@router.post("/expenses", response_model=Union[ExpenseOut, Error])
def create_expense(
    expense: ExpenseIn,
    repo: ExpenseRepository = Depends(),
):
    return repo.create_expense(expense)

@router.get("/expenses", response_model=Union[List[ExpenseOut], Error])
def get_all_expense(
    repo: ExpenseRepository = Depends(),
):
    return repo.get_all_expense()


@router.get("/expenses/{expense_id}", response_model=Optional[ExpenseOut])
def get_one_expense(
    expense_id: int,
    response: Response,
    repo: ExpenseRepository = Depends(),
) -> ExpenseOut:
    expense = repo.get_one_expense(expense_id)
    if expense is None:
        response.status_code = 404
    return expense


@router.post("/expenses", response_model=Union[ExpenseOut, Error])
def create_expense(
    expense: ExpenseIn,
    repo: ExpenseRepository = Depends(),
):
    return repo.create_expense(expense)


@router.put("/expenses/{expense_id}", response_model=Union[ExpenseOut, Error])
def update_expense(
    expense_id: int,
    expense: ExpenseIn,
    repo: ExpenseRepository = Depends(),
) -> Union[Error, ExpenseOut]:
    return repo.update_expense(expense_id, expense)


@router.delete("/expenses/{expense_id}", response_model=bool)
def delete_expense(
    expense_id: int,
    repo: ExpenseRepository = Depends(),
) -> bool:
    return repo.delete_expense(expense_id)


