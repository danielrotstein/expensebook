from fastapi.testclient import TestClient
from main import app
from queries.budgets import BudgetRepository


client = TestClient(app)

class EmptyBudgetRepository:
    def get_all_budget(self):
        return []

def test_get_all_budget():
    # Arrange
    app.dependency_overrides[BudgetRepository] = EmptyBudgetRepository
    # Act
    response = client.get("/budgets")
    # Clean up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == []
































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




