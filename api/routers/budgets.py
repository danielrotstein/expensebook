from fastapi import (
    APIRouter,
    Depends,
    Response,
)
from typing import List, Optional, Union
from queries.budgets import (
    Error,
    BudgetRepository,
    BudgetIn,
    BudgetOut,
)


router = APIRouter(tags=["Budgets"])


@router.get("/budgets", response_model=Union[List[BudgetOut], Error])
def get_all_budget(
    repo: BudgetRepository = Depends(),
):
    return repo.get_all_budget()


@router.get("/budgets/id={budget_id}", response_model=Optional[BudgetOut])
def get_one_budget(
    budget_id: int,
    response: Response,
    repo: BudgetRepository = Depends(),
) -> BudgetOut:
    budget = repo.get_one_budget(budget_id)
    if budget is None:
        response.status_code = 404
    return budget


@router.get("/budgets/{email}", response_model=Union[List[BudgetOut], Error])
def get_all_budget_by_oneuser(
    email: str,
    repo: BudgetRepository = Depends(),
):
    return repo.get_all_budget_by_oneuser(email)


@router.post("/budgets", response_model=Union[BudgetOut, Error])
def create_budget(
    budget: BudgetIn,
    repo: BudgetRepository = Depends(),
):
    return repo.create_budget(budget)


@router.put("/budgets/id={budget_id}", response_model=Union[BudgetOut, Error])
def update_budget(
    budget_id: int,
    budget: BudgetIn,
    repo: BudgetRepository = Depends(),
) -> Union[Error, BudgetOut]:
    return repo.update_budget(budget_id, budget)


@router.delete("/budgets/id={budget_id}", response_model=bool)
def delete_budget(
    budget_id: int,
    repo: BudgetRepository = Depends(),
) -> bool:
    return repo.delete_budget(budget_id)
