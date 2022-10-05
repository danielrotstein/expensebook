from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from datetime import date
from queries.expenses import (
    Error,
    ExpensesIn,
    ExpenseRepository,
    ExpensesOut,
)


router = APIRouter()


@router.post("/expenses", response_model=Union[ExpensesOut, Error])
def create_expense(
    expense: ExpensesIn,
    response: Response,
    repo: ExpenseRepository = Depends(),
):
    response.status_code = 400
    return repo.create(expense)

@router.get("/expenses", response_model=Union[List[ExpensesOut], Error])
def get_all(
    repo: ExpenseRepository = Depends(),
):
    return repo.get_all()

