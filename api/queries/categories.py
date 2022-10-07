from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class CategoryIn(BaseModel):
    title: str
 

class CategoryOut(BaseModel):
    id: int
    title: str


class CategoryRepository:
    def get_all_category(self) -> Optional[CategoryOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id, title
                        FROM categories
                        ORDER BY id;
                        """,
                    )

                    return [
                        self.record_to_category_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all categories"}


    def create_category(self, category: CategoryIn) -> Union[CategoryOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO categories
                            ( title )
                        VALUES
                            ( %s )
                        RETURNING id;
                        """,
                        [
                            category.title,
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = category.dict()
                    return CategoryOut(id=id, **old_data)
        except Exception as e:
            print("There was an error: ", e)
            return {"message": "Unable to create an category"}


    def record_to_category_out(self, record):
        return CategoryOut(
            id=record[0],
            title=record[1],
        )


