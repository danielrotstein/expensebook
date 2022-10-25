from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.categories import (
    Error,
    CategoryIn,
    CategoryRepository,
    CategoryOut,
)


router = APIRouter(tags=["Categories"])


@router.get("/categories", response_model=Union[List[CategoryOut], Error])
def get_all_categories(
    repo: CategoryRepository = Depends(),
):
    return repo.get_all_categories()


@router.get("/categories/{category_id}", response_model=Optional[CategoryOut])
def get_one_category(
    category_id: int,
    response: Response,
    repo: CategoryRepository = Depends(),
) -> CategoryOut:
    category = repo.get_one_category(category_id)
    if category is None:
        response.status_code = 404
    return category


@router.post("/categories", response_model=Union[CategoryOut, Error])
def create_category(
    category: CategoryIn,
    repo: CategoryRepository = Depends(),
):
    return repo.create_category(category)


@router.put("/categories/{category_id}", response_model=Union[CategoryOut, Error])
def update_category(
    category_id: int,
    category: CategoryIn,
    repo: CategoryRepository = Depends(),
) -> Union[Error, CategoryOut]:
    return repo.update_category(category_id, category)


@router.delete("/categories/{category_id}", response_model=bool)
def delete_category(
    category_id: int,
    repo: CategoryRepository = Depends(),
) -> bool:
    return repo.delete_category(category_id)
