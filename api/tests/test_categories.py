from fastapi.testclient import TestClient
from main import app
from queries.categories import CategoryRepository
from queries.expenses import ExpenseRepository


client = TestClient(app)


class EmptyCategoryRepository:
    def get_all_categories(self):
        return []


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


class EmptyExpenseRepository:
    def get_all_expenses(self):
        return []


class CreateExpenseQueries:
    def create_expense(self, event):
        result = {
            "id": 1,
            "title": "Airbnb in Reykjavik",
            "date": "2022-10-01",
            "expense_total": 62500.00,
            "expense_converted": 432.96,
            "description": "Stay for two in Reykjavik",
            "budget_id": 1,
            "category_id": 1,
        }
        result.update(event)
        return result


def test_get_all_expenses():
    # Arrange
    app.dependency_overrides[ExpenseRepository] = EmptyExpenseRepository

    # Act
    response = client.get("/expenses")

    # Clean up
    app.dependency_overrides = {}
    
    # Assert
    assert response.status_code == 200
    assert response.json() == []


def test_create_expense():
    # Arrange
    app.dependency_overrides[ExpenseRepository] = CreateExpenseQueries
    json = {
        "title": "Airbnb in Reykjavik",
        "date": "2022-10-01",
        "expense_total": 62500.00,
        "expense_converted": 432.96,
        "description": "Stay for two in Reykjavik",
        "budget_id": 1,
        "category_id": 1,
    }
    expected = {
        "id": 1,
        "title": "Airbnb in Reykjavik",
        "date": "2022-10-01",
        "expense_total": 62500.00,
        "expense_converted": 432.96,
        "description": "Stay for two in Reykjavik",
        "budget_id": 1,
        "category_id": 1,
    }

    # Act 
    response = client.post("/expenses", json=json)

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




