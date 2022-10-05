from fastapi import FastAPI
from routers import (
    budgets,
    accounts,
)


app = FastAPI()
app.include_router(budgets.router)
app.include_router(accounts.router)