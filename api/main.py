from fastapi import FastAPI
from routers import expenses, accounts
from routers import budgets, categories, recommendations, currency
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI()


app.include_router(accounts.router)
app.include_router(categories.router)
app.include_router(currency.router)
app.include_router(budgets.router)
app.include_router(expenses.router)
app.include_router(recommendations.router)
app.include_router(authenticator.router)


origins = [
    "http://localhost:8000",
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
]
print("ORIGINS ------", origins)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
