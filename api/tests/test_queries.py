from fastapi.testclient import TestClient
from main import app
from queries.categories import CategoryRepository
from queries.expenses import ExpenseRepository
from queries.budgets import BudgetRepository
from queries.recommendations import RecommendationRepository
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
    app.dependency_overrides[
        CategoryRepository
    ] = EmptyCategoryRepository
    response = client.get("/categories")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_create_categories():
    app.dependency_overrides[
        CategoryRepository
    ] = CreateCategoryQueries
    json = {
        "title": "Test event",
    }
    expected = {
        "id": 999,
        "title": "Test event",
    }
    response = client.post("/categories", json=json)
    app.dependency_overrides = {}
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
    app.dependency_overrides[
        ExpenseRepository
    ] = EmptyExpenseRepository
    response = client.get("/expenses")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_create_expense():
    app.dependency_overrides[
        ExpenseRepository
    ] = CreateExpenseQueries
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
    response = client.post("/expenses", json=json)
    app.dependency_overrides = {}
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
    app.dependency_overrides[
        BudgetRepository
    ] = EmptyBudgetRepository
    response = client.get("/budgets")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_create_budget():
    app.dependency_overrides[
        BudgetRepository
    ] = CreateBudgetRepository
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
    response = client.post("/budgets", json=json)
    app.dependency_overrides = {}
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
    app.dependency_overrides[
        RecommendationRepository
    ] = EmptyRecommendationRepository
    response = client.get("/recommendations")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_create_recommendations():
    app.dependency_overrides[
        RecommendationRepository
    ] = CreateRecommendationQueries
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
    response = client.post("/recommendation", json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
