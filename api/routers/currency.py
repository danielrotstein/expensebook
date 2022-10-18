from fastapi import APIRouter, Depends
import requests
import json

router = APIRouter(tags=["Currency"])

@router.get("/currency/{search}")
async def convert_expense(
    search: int,
    home_currency: str,
    away_currency: str
):
    # get data from budget
    # pass budget.home_country & budget.destination_country to URL
    url = f"https://api.exchangerate.host/convert?from={home_currency.upper()}&to={away_currency.upper()}&amount={search}&places=2"
    response = requests.get(url)
    content = json.loads(response.content)
    return content["result"]
    # pass returned content to expenseform to be saved

@router.get("/currency/")
async def conversion_rates():
    url = f"https://api.exchangerate.host/latest"
    response = requests.get(url)
    content = json.loads(response.content)
    return content["rates"]
