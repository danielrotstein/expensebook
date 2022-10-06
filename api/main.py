from fastapi import FastAPI

from router import expenses, accounts, budgets, categories

app = FastAPI()

app.include_router(accounts.router)
app.include_router(categories.router)
app.include_router(budgets.router)
app.include_router(expenses.router)
