from fastapi import(
    APIRouter, 
    Depends,
)
from typing import Union, List
from queries.budgets import(
    Error,
    BudgetRepository,
    BudgetIn,
    BudgetOut,
)


router = APIRouter()


@router.get("/budgets", response_model=Union[List[BudgetOut], Error])
def get_all_budgets(
    repo: BudgetRepository = Depends(),
):
    return repo.get_all_budgets()


@router.post("/budgets", response_model=Union[BudgetOut, Error])
def create_budget(
    budget: BudgetIn,
    repo: BudgetRepository = Depends(),
):
    return repo.create_budget(budget)
