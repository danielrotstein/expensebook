from fastapi.testclient import TestClient
from main import app
from queries.budgets import BudgetRepository


client = TestClient(app)

class CreateBudgetQueries:
    def create_budget(self, event):
        result = {
            "id": 1,
            "title": "Test budget",
            "start_date": "2022-10-22",
            "end_date": "2022-10-28",
            "budget": 500,
            "home_country": "USA",
            "destination_country": "Canada",
            "account_id": 1,
        }
        result.update(event)
        return result

def test_create_event():

    # Arrange
    app.dependency_overrides[BudgetRepository] = CreateBudgetQueries
    json = {
            "title": "Test budget",
            "start_date": "2022-10-22",
            "end_date": "2022-10-28",
            "budget": 500,
            "home_country": "USA",
            "destination_country": "Canada",
            "account_id": 1,
    }
    expected = {
        "id": 1,
        "title": "Test budget",
        "start_date": "2022-10-22",
        "end_date": "2022-10-28",
        "budget": 500,
        "home_country": "USA",
        "destination_country": "Canada",
        "account_id": 1,
    }

    # Act 
    response = client.post("/budgets", json=json)

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected






























# class CreateCategoryQueries:
#     def create_category(self, category):
#         result = {
#             "id": 999,
#             "title": "Test event",
#         }
#         result.update(category)
#         return result



# def test_create_categories():
#     # Arrange
#     app.dependency_overrides[CategoryRepository] = EmptyCategoryRepository
#     json = {
#         "title": "Test event",
#     }
#     expected = {
#         "id": 999,
#         "name": "Test event",
#     }

#     # Act 
#     response = client.post("/categories", json=json)

#     # Clean up
#     app.dependency_overrides = {}

#     # Assert
#     assert response.status_code == 200
#     assert response.json() == expected




