from fastapi import FastAPI

from router import expenses

app = FastAPI()

app.include_router(expenses.router)

