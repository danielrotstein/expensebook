# router.py
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from queries.auth import (
    AuthsQueries,
    AuthOut,
    AuthIn,
)

class AuthForm(BaseModel):
    username: str
    password: str

class AuthToken(Token):
    account: AuthOut

class HttpError(BaseModel):
    detail: str

router = APIRouter(tags=["Authentication"])




# @router.get("/api/protected", response_model=bool)
# async def get_protected(
#     account_data: dict = Depends(authenticator.get_current_account_data),
# ):
#     return True




# @router.get("/token", response_model=AuthToken | None)
# async def get_token(
#     request: Request,
#     account: AuthOut = Depends(authenticator.try_get_current_account_data)
# ) -> AuthToken | None:
#     if authenticator.cookie_name in request.cookies:
#         return {
#             "access_token": request.cookies[authenticator.cookie_name],
#             "type": "Bearer",
#             "account": account,
#         }




@router.post("/api/auths", response_model=AuthToken | HttpError)
async def create_auth(
    info: AuthIn,
    request: Request,
    response: Response,
    repo: AuthsQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    account = repo.create(info, hashed_password)
    form = AuthForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AuthToken(account=account, **token.dict())
