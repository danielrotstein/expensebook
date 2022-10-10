from fastapi import FastAPI

from routers import expenses, accounts, budgets, categories, auth
from authenticator import authenticator

app = FastAPI()

app.include_router(accounts.router)
app.include_router(categories.router)
app.include_router(budgets.router)
app.include_router(expenses.router)
<<<<<<< HEAD

app.include_router(authenticator.router)
app.include_router(auth.router)

=======
app.include_router(recommendations.router)
app.include_router(authenticator.router)
>>>>>>> 16f5eaa302a3e62c24eb1a7facb9abac00d53487
