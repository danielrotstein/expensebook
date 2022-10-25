from fastapi.testclient import TestClient
from main import app
from queries.categories import CategoryRepository


client = TestClient(app)


class EmptyCategoryRepository:
    def get_all_categories(self):
        return []


class CreateCategoryQueries:
    def create_category(self, category):
        result = {
            "id": 999,
            "title": "Test event",
        }
        result.update(category)
        return result


def test_get_all_categories():
    # Arrange
    app.dependency_overrides[CategoryRepository] = EmptyCategoryRepository

    # Act
    response = client.get("/categories")

    # Clean up
    app.dependency_overrides = {}
    
    # Assert
    assert response.status_code == 200
    assert response.json() == []


def test_create_categories():
    # Arrange
    app.dependency_overrides[CategoryRepository] = CreateCategoryQueries
    json = {
        "title": "Test event",
    }
    expected = {
        "id": 999,
        "title": "Test event",
    }

    # Act 
    response = client.post("/categories", json=json)

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected