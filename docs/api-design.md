# Login
* Endpoint path: /token
* Endpoint method: POST

* Request body (form):
  * email: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        "email": "string",
        "password": "string",
      },
      "token": "string",
    }
    ```

# Logout
* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```


# Account - POST
* Endpoint path: /accounts
* Endpoint method: POST

* Request body (JSON):
    ```json
    {
      "account": {
        "first_name": "string",
        "last_name": "string",
        "email": "string",
        "password": "string",
      },
      "token": "string",
    }
    ```

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        "first_name": "string",
        "last_name": "string",
        "email": "string",
        "password": "string",
      },
      "token": "string",
    }
    ```


# Budget - GET
* Endpoint path: /budgets
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Budget information
* Response shape (JSON):
    ```json
    {
      "budget": {
        "title": "string",
        "start_date": "date",
        "end_date": "date",
        "budget": "integer",
        "international": "boolean",
        "home_country": "string",
        "destination_country": "string",
      },
      "account": "account",
    }
    ```


# Budget - POST
* Endpoint path: /budgets
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request body (JSON):
    ```json
    {
      "budget": {
        "title": "string",
        "start_date": "date",
        "end_date": "date",
        "budget": "integer",
        "international": "boolean",
        "home_country": "string",
        "destination_country": "string",
      },
      "account": "account",
    }
    ```

* Response: Budget information
* Response shape (JSON):
    ```json
    {
      "budget": {
        "title": "string",
        "start_date": "date",
        "end_date": "date",
        "budget": "integer",
        "international": "boolean",
        "home_country": "string",
        "destination_country": "string",
      },
      "account": "account",
    }
    ```


# Budget - GET
* Endpoint path: /budgets/<int:pk>/
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Budget information
* Response shape (JSON):
    ```json
    {
      "budget": {
        "title": "string",
        "start_date": "date",
        "end_date": "date",
        "budget": "integer",
        "international": "boolean",
        "home_country": "string",
        "destination_country": "string",
      },
      "account": "account",
    }
    ```


# Budget - DELETE
* Endpoint path: /budgets/<int:pk>/
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Budget information
* Response shape (JSON):
    ```json
    true
    ```


# Budget - PUT
* Endpoint path: /budgets/<int:pk>/
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request body (JSON):
    ```json
    {
      "budget": {
        "title": "string",
        "start_date": "date",
        "end_date": "date",
        "budget": "integer",
        "international": "boolean",
        "home_country": "string",
        "destination_country": "string",
      },
      "account": "account",
    }
    ```

* Response: Budget information
* Response shape (JSON):
    ```json
    {
      "budget": {
        "title": "string",
        "start_date": "date",
        "end_date": "date",
        "budget": "integer",
        "international": "boolean",
        "home_country": "string",
        "destination_country": "string",
      },
      "account": "account",
    }
    ```


# Expense - GET
* Endpoint path: /expenses
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Expense information
* Response shape (JSON):
    ```json
    {
      "expense": {
        "title": "string",
        "date": "date",
        "expense_total": "integer",
        "description": "string",
      },
      "budget": "budget",
      "category": "category",
    }
    ```


# Expense - POST
* Endpoint path: /expenses
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request body (JSON):
    ```json
    {
      "expense": {
        "title": "string",
        "date": "date",
        "expense_total": "integer",
        "description": "string",
      },
      "budget": "budget",
      "category": "category",
    }
    ```

* Response: Expense information
* Response shape (JSON):
    ```json
    {
      "expense": {
        "title": "string",
        "date": "date",
        "expense_total": "integer",
        "description": "string",
      },
      "budget": "budget",
      "category": "category",
    }
    ```

# Expense - GET
* Endpoint path: /expenses/<int:pk>/
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Budget information
* Response shape (JSON):
    ```json
    {
      "expense": {
        "title": "string",
        "date": "date",
        "expense_total": "integer",
        "description": "string",
      },
      "budget": "budget",
      "category": "category",
    }
    ```

# Expense - DELETE
* Endpoint path: /expenses/<int:pk>/
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Budget information
* Response shape (JSON):
    ```json
    true
    ```


# Expense - PUT
* Endpoint path: /expenses/<int:pk>/
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request body (JSON):
    ```json
    {
      "expense": {
        "title": "string",
        "date": "date",
        "expense_total": "integer",
        "description": "string",
      },
      "budget": "budget",
      "category": "category",
    }
    ```

* Response: Expense information
* Response shape (JSON):
    ```json
    {
      "expense": {
        "title": "string",
        "date": "date",
        "expense_total": "integer",
        "description": "string",
      },
      "budget": "budget",
      "category": "category",
    }
    ```


# Recommendation - GET
* Endpoint path: /recommendations
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Recommendation information
* Response shape (JSON):
    ```json
    {
      "recommendation": {
        "title": "string",
        "price": "integer",
        "image": "url",
        "url": "url",
        "description": "string",
      },
      "category": "category",
    }
    ```


# Recommendation - POST
* Endpoint path: /recommendations
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request body (JSON):
    ```json
    {
      "recommendation": {
        "title": "string",
        "price": "integer",
        "image": "url",
        "url": "url",
        "description": "string",
      },
      "category": "category",
    }
    ```

* Response: Recommendation information
* Response shape (JSON):
    ```json
    {
      "recommendation": {
        "title": "string",
        "price": "integer",
        "image": "url",
        "url": "url",
        "description": "string",
      },
      "category": "category",
    }
    ```


# Recommendation - GET
* Endpoint path: /recommendations/<int:pk>/
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Recommendation information
* Response shape (JSON):
    ```json
    {
      "recommendation": {
        "title": "string",
        "price": "integer",
        "image": "url",
        "url": "url",
        "description": "string",
      },
      "category": "category",
    }
    ```

# Recommendation - DELETE
* Endpoint path: /recommendations/<int:pk>/
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Recommendation information
* Response shape (JSON):
    ```json
    true
    ```


# Recommendation - PUT
* Endpoint path: /recommendations/<int:pk>/
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request body (JSON):
    ```json
    {
      "recommendation": {
        "title": "string",
        "price": "integer",
        "image": "url",
        "url": "url",
        "description": "string",
      },
      "category": "category",
    }
    ```

* Response: Recommendation information
* Response shape (JSON):
    ```json
    {
      "recommendation": {
        "title": "string",
        "price": "integer",
        "image": "url",
        "url": "url",
        "description": "string",
      },
      "category": "category",
    }
    ```


# Pexels - GET
* Endpoint path: /v1/search
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Request body (JSON):
    ```json
    {
      "picture": {
        "query": "string",
        "PEXELS_API_KEY": "sting",
      }
    }
    ```

* Response: Pexels information
* Response shape (JSON):
    ```json
    {
      "picture": {
        "picture_url": "url",
      }
    }
    ```


# OpenWeather - GET
* Endpoint path: /2.5/weather
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Request body (JSON):
    ```json
    {
      "weather": {
        "q": "string",
        "units": "string",
        "appid": "integer",
      }
    }
    ```

* Response: Weather information
* Response shape (JSON):
    ```json
    {
      "weather": {
        "temperature": "string",
        "description": "string",
      }
    }
    ```