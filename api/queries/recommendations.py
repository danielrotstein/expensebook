from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class RecommendationIn(BaseModel):
    title: str
    price: int
    image: str
    url: str
    description: str
    country: str
    category_id: int
    

class RecommendationOut(BaseModel):
    id: int
    title: str
    price: int
    image: str
    url: str
    description: str
    country: str
    category_id: int


class RecommendationRepository:
    def get_all_recommendations(self) -> Optional[RecommendationOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT r.id
                             , r.title
                             , r.price
                             , r.image
                             , r.url
                             , r.description
                             , r.country
                             , c.id
                        FROM recommendations AS r
                        LEFT JOIN categories AS c
                            ON (r.category_id = c.id)
                        ORDER BY r.title;
                        """,
                    )
                    return [
                        self.record_to_recommendation_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all recommendations"}


    def get_one_recommendation(self, recommendation_id) -> Optional[RecommendationOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT r.id
                             , r.title
                             , r.price
                             , r.image
                             , r.url
                             , r.description
                             , r.country
                             , c.id
                        FROM recommendations AS r
                        LEFT JOIN categories AS c
                            ON (r.category_id = c.id)
                        WHERE r.id = %s
                        ORDER BY r.title;
                        """,
                        [recommendation_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_recommendation_out(record)
        except Exception as e:
            print(e)


    def create_recommendation(self, recommendation: RecommendationIn) -> Union[RecommendationOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO recommendations
                            (
                                title
                                , price
                                , image
                                , url
                                , description
                                , country
                                , category_id
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            recommendation.title
                            , recommendation.price
                            , recommendation.image
                            , recommendation.url
                            , recommendation.description
                            , recommendation.country
                            , recommendation.category_id
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.recommendation_in_to_out(id, recommendation)
        except Exception:
            return {"message": "Unable to create a recommendation"}


    def delete_recommendation(self, recommendation_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM recommendations
                        WHERE id = %s
                        """,
                        [recommendation_id],
                    )
                    return True
        except Exception as e:
            return False


    def update_recommendation(self, recommendation_id: int, recommendation: RecommendationIn) -> Union[RecommendationOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE recommendations
                        SET title = %s
                          , price = %s
                          , image = %s
                          , url = %s
                          , description = %s
                          , country = %s
                          , category_id = %s
                        WHERE id = %s
                        """,
                        [
                            recommendation.title
                            , recommendation.price
                            , recommendation.image
                            , recommendation.url
                            , recommendation.description
                            , recommendation.country
                            , recommendation.category_id
                            , recommendation_id
                        ],
                    )
                    # old_data = expense.dict()
                    # return ExpenseOut(id=expense_id, **old_data)
                    return self.recommendation_in_to_out(recommendation_id, recommendation)
        except Exception as e:
            print(e)
            return {"message": "Could not update that recommendation"}


    def recommendation_in_to_out(self, id: int, recommendation: RecommendationIn):
        old_data = recommendation.dict()
        return RecommendationOut(id=id, **old_data)
            

    def record_to_recommendation_out(self, record):
        return RecommendationOut(
            id=record[0],
            title=record[1],
            price=record[2],
            image=record[3],
            url=record[4],
            description=record[5],
            country=record[6],
            category_id=record[7]
        )
