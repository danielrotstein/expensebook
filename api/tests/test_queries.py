from fastapi.testclient import TestClient
from main import app
from queries.categories import CategoryRepository
from queries.expenses import ExpenseRepository
from queries.budgets import BudgetRepository
from queries.recommendations import RecommendationRepository

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


class EmptyBudgetRepository:
    def get_all_budget(self):
        return []

class CreateBudgetRepository:
    def create_budget(self, budget):
        result = {
            "id": 1,
            "title": "string",
            "start_date": "2022-10-24",
            "end_date": "2022-11-24",
            "budget": 100,
            "home_country": "string",
            "destination_country": "string",
            "account_id": 1
        }
        result.update(budget)
        return result


def test_get_all_budget():
    #Arrange
    app.dependency_overrides[BudgetRepository] = EmptyBudgetRepository

    #Act
    response = client.get("/budgets")

    # Clean up
    app.dependency_overrides = {}
    
    # Assert
    assert response.status_code == 200
    assert response.json() == []


def test_create_budget():
    #Arrange
    app.dependency_overrides[BudgetRepository] = CreateBudgetRepository
    json = {
            "title": "string",
            "start_date": "2022-10-24",
            "end_date": "2022-11-24",
            "budget": 100,
            "home_country": "string",
            "destination_country": "string",
            "account_id": 1
    }
    expected = {
        "id": 1,
        "title": "string",
        "start_date": "2022-10-24",
        "end_date": "2022-11-24",
        "budget": 100,
        "home_country": "string",
        "destination_country": "string",
        "account_id": 1
    }
    #Act
    response = client.post("/budgets", json=json)

    # Clean up
    app.dependency_overrides = {}
    
    # Assert
    assert response.status_code == 200
    assert response.json() == expected


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


def test_create_recommendations():
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