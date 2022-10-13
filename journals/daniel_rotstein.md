## 10/13/22

Today, I worked on:

* Exploring more options on how our currency converter should be set up, and helping Alex with the expense form.

Joey and I brainstormed on different approaches on how to implement a currency converter into ExpenseBook. Looks like 3rd party Api's are limited to only a few requests per day. Another option instead of hardcoding could be to fetch data from XML files saved to google sheets.

Today, I learned the steps needed to get our app deployed.



## 10/12/22

Today, I worked on:

* Getting the login page up&running.

While I was driving, Olivia, Alex and George helped out to implement the login code. We got it to work, so now we can successfully login with the username/password credentials, we created in the backend.

Today, I learned the use of FormData to handle a login POST request submission.



## 10/11/22

Today, I worked on:

* Starting with the Front-End of ExpenseBook using Redux.

While Alex was driving, we helped out to implement the code for displaying a dashboard for all budgets data and a form to create a new budget.

Today, I learned how to implement Redux in our React frontend, so all the states can be managed central via store.



## 10/10/22

Today, I worked on:

* Figuring out the authentication code for ExpenseBook to successfully create an account, login/logout.

While I was driving, Olivia and George helped out to implement the authentication code with the existing accounts table. Now we can successfully create an account & login/logout. Also we added some code for some services like get_all_expenses for example, that a user needs to be logged in to get all the expenses data.

Today, I learned how to change an already created table and how to use authentication-tokens.



## 10/06/22

Today, I worked on:

* Helping to finish up the remaining CRUD functions for ExpenseBook and testing all of them.

Today, I learned how to use JOIN to successfully combine rows for all our tables.



## 10/05/22

Today, I worked on:

* Pair coding with Olivia and Joey starting with sql-code for the Expenses pydantic model in queries.py and writing python to interact with FastAPI in routers.py.

While I was driving they both helped out to get the code up&running.

Today, I learned how to write CRUD to be able to dynamically interact the data in FastAPI.


## 10/04/22

Today, I worked on:

* Helping to map out an entity relationship diagram (ERD), and to successfully configuring docker containers & pgadmin server. 

I created a couple files & directories in VS code, the team contributed and helped me with the required code for each file, here a quick overview what we added to our app:

- migrations
__init__.py
__main__.py
001_create_my_table.py

- queries
pool.py

- routers

Dockerfile.dev
main.py
requirements.txt

Today, I learned that there's no real polling between microservices instead we'll be using foreign keys between tables to communicate with each other. 
