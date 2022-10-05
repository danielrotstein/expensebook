from fastapi import APIRouter, Depends
from typing import Union, List
from queries.expenses import (
    ExpensesOut, 
    ExpensesRepository,
    Error,
)


router = APIRouter()


@router.get("/expenses", response_model=Union[List[ExpensesOut], Error])
def get_all_expenses(
    repo: ExpensesRepository = Depends(),
):
    return repo.get_all()
    