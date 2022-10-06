from fastapi import FastAPI

from routers import expenses, accounts, budgets, categories

app = FastAPI()
app.include_router(expenses.router)

app.include_router(accounts.router)
app.include_router(categories.router)
app.include_router(budgets.router)
app.include_router(expenses.router)
