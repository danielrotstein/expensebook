from pydantic import BaseModel
from typing import Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class CategoryIn(BaseModel):
    title: str


class CategoryOut(BaseModel):
    id: int
    title: str


class CategoryRepository:
    def get_all_categories(self) -> Optional[CategoryOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, title
                        FROM categories
                        ORDER BY id;
                        """,
                    )
                    return [self.record_to_category_out(record)for record in result]
        except Exception as e:
            print(e)
            return {"message": "Could not get all categories"}

    def get_one_category(self, category_id) -> Optional[CategoryOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , title
                        FROM categories
                        WHERE id = %s
                        ORDER BY id;
                        """,
                        [category_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_category_out(record)
        except Exception as e:
            print(e)

    def create_category(self, category: CategoryIn) -> Union[
            CategoryOut, Error]:
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
                        ],
                    )
                    id = result.fetchone()[0]
                    old_data = category.dict()
                    return CategoryOut(id=id, **old_data)
        except Exception as e:
            print("There was an error: ", e)
            return {"message": "Unable to create a category"}

    def delete_category(self, category_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM categories
                        WHERE id = %s
                        """,
                        [category_id],
                    )
                    return True
        except Exception:
            return False

    def update_category(
        self, category_id: int, category: CategoryIn
    ) -> Union[CategoryOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE categories
                        SET title = %s
                        WHERE id = %s
                        """,
                        [category.title, category_id],
                    )
                    return self.category_in_to_out(category_id, category)
        except Exception as e:
            print(e)
            return {"message": "Could not update that category"}

    def category_in_to_out(self, id: int, category: CategoryIn):
        old_data = category.dict()
        return CategoryOut(id=id, **old_data)

    def record_to_category_out(self, record):
        return CategoryOut(
            id=record[0],
            title=record[1],
        )
