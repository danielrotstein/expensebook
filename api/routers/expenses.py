from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.expenses import (
    ExpenseIn,
    ExpenseOut,
    ExpenseRepository,
    Error,
)


router = APIRouter()



@router.post("/expenses", response_model=Union[ExpenseIn, Error])
def create_expense(
    vacation: ExpenseIn,
    response: Response, 
    repo: ExpenseRepository = Depends(),
):
    response.status_code = 400
    return repo.create_expense(vacation)  


@router.get("/expenses", response_model=Union[List[ExpenseOut], Error])
def get_all_expenses(
    repo: ExpenseRepository = Depends(),
):
    return repo.get_all_expenses()
    