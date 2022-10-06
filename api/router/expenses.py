from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from datetime import date
from queries.expenses import (
    Error,
    ExpenseIn,
    ExpenseRepository,
    ExpensesOut,
)


router = APIRouter()


@router.post("/expenses", response_model=Union[ExpensesOut, Error])
def create_expense(
    expense: ExpenseIn,
    repo: ExpenseRepository = Depends(),
):
    return repo.create(expense)

@router.get("/expenses", response_model=Union[List[ExpensesOut], Error])
def get_all(
    repo: ExpenseRepository = Depends(),
):
    return repo.get_all()

@router.get("/expenses/{expense_id}", response_model=Optional[ExpensesOut])
def get_one_expense(
    expense_id: int,
    response: Response,
    repo: ExpenseRepository = Depends(),
) -> ExpensesOut:
    expense = repo.get_one(expense_id)
    if expense is None:
        response.status_code = 404
    return expense


@router.put("/expenses/{expense_id}", response_model=Union[ExpensesOut, Error])
def update_vacation(
    expense_id: int,
    expense: ExpenseIn,
    repo: ExpenseRepository = Depends(),
) -> Union[Error, ExpensesOut]:
    return repo.update(expense_id, expense)


@router.delete("/expenses/{expense_id}", response_model=bool)
def delete_vacation(
    expense_id: int,
    repo: ExpenseRepository = Depends(),
) -> bool:
    return repo.delete(expense_id)


