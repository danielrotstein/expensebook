from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.recommendations import (
    Error,
    RecommendationIn,
    RecommendationRepository,
    RecommendationOut,
)


router = APIRouter(tags=["Recommendation"])


@router.get("/recommendations",
            response_model=Union[List[RecommendationOut], Error]
            )
def get_all_recommendations(
    repo: RecommendationRepository = Depends(),
):
    return repo.get_all_recommendations()


@router.get("/recommendations/{recommendation_id}",
            response_model=Optional[RecommendationOut]
            )
def get_one_recommendation(
    recommendation_id: int,
    response: Response,
    repo: RecommendationRepository = Depends(),
) -> RecommendationOut:
    recommendation = repo.get_one_recommendation(recommendation_id)
    if recommendation is None:
        response.status_code = 404
    return recommendation


@router.post("/recommendation", response_model=Union[RecommendationOut, Error])
def create_recommendation(
    recommendation: RecommendationIn,
    repo: RecommendationRepository = Depends(),
):
    return repo.create_recommendation(recommendation)


@router.delete("/recommendations/{recommendation_id}", response_model=bool)
def delete_recommendation(
    recommendation_id: int,
    repo: RecommendationRepository = Depends(),
) -> bool:
    return repo.delete_recommendation(recommendation_id)


@router.put(
    "/recommendations/{recommendation_id}",
    response_model=Union[RecommendationOut, Error],
)
def update_recommendation(
    recommendation_id: int,
    recommendation: RecommendationIn,
    repo: RecommendationRepository = Depends(),
) -> Union[Error, RecommendationOut]:
    return repo.update_recommendation(recommendation_id, recommendation)
