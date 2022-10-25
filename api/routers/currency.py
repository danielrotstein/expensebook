from fastapi import APIRouter
from urllib.parse import urljoin
import requests
import json


router = APIRouter(tags=["Currency"])


@router.get("/currency/{search}")
async def convert_expense(search: int, home_currency: str, away_currency: str):
    base_url = f"https://api.exchangerate.host/convert?from={home_currency.upper()}"
    path = f"&to={away_currency.upper()}&amount={search}&places=2"
    result = urljoin(base_url, path)
    response = requests.get(result)
    content = json.loads(response.content)
    return content["result"]


@router.get("/currency/")
async def conversion_rates():
    url = "https://api.exchangerate.host/latest"
    response = requests.get(url)
    content = json.loads(response.content)
    return content["rates"]
