from fastapi.testclient import TestClient
from main import app
from queries.recommendations import RecommendationRepository


client = TestClient(app)


class EmptyRecommendationRepository:
    def get_all_recommendations(self):
        return []


class CreateRecommendationQueries:
    def create_recommendation(self, recommendation):
        result = {
            "id": 999,
            "title": "Test event",
            "price": 99,
            "image": "TEST image",
            "url": "TEST url",
            "description": "TEST description",
            "country": "USD",
            "category_id": 99,
        }
        result.update(recommendation)
        return result


def test_get_all_recommendations():
    # Arrange
    app.dependency_overrides[RecommendationRepository] = EmptyRecommendationRepository

    # Act
    response = client.get("/recommendations")

    # Clean up
    app.dependency_overrides = {}
    
    # Assert
    assert response.status_code == 200
    assert response.json() == []


def test_create_categories():
    # Arrange
    app.dependency_overrides[RecommendationRepository] = CreateRecommendationQueries
    json = {
        "title": "Test event",
        "price": 99,
        "image": "TEST image",
        "url": "TEST url",
        "description": "TEST description",
        "country": "USD",
        "category_id": 99,
    }
    expected = {
        "id": 999,
        "title": "Test event",
        "price": 99,
        "image": "TEST image",
        "url": "TEST url",
        "description": "TEST description",
        "country": "USD",
        "category_id": 99,
    }

    # Act 
    response = client.post("/recommendation", json=json)

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected