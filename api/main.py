from fastapi import FastAPI
from routers import expenses, accounts, budgets, categories, recommendations
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


app.include_router(accounts.router)
app.include_router(categories.router)
app.include_router(budgets.router)
app.include_router(expenses.router)
app.include_router(recommendations.router)
app.include_router(authenticator.router)


origins = [
    "http://localhost",
    "http://localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)