## 10/18/22

Today, I worked on:

* Creating the currency converter page with the help of a 3rd party Api.

The page will be accessible for ExpenseBook users, aswell as guests who want to use a free currency converter. Found a currency converter Api, no key necessary and no limits on requests (https://exchangerate.host). Now user is able to convert from over 150 currencies with a daily updated exchange rate. Used my knowledge of useState, useEffect and fetching to get the converter up & running.

I learned that its really hard to find Api's with good documentation, usage and free of use.



## 10/17/22

Today, I worked on:

*  Changing code so only budget detail of a specific ID will be displayed and creating a modal for Add Expense "form".

When user clicks on a specific budget in the dashboard, only that specific budget will be displayed in details page, so with that, once we create a new expense for that certain budget, the budget ID is already stored in the DB. Inside specific budget detail, there's now an Add Expense modal "form", just need to figure out how the data gets populated to the details page without having to refresh the page first.

I learned how to write code to use modal for one of our forms.



## 10/14/22

Today, I worked on:

*  Creating a currency converter for Expensebook.

Joey and I created a new file countryList that has an array of objects with country name and the associate currency code. We then imported that file to the BudgetForm so we can select countries via dropdown menu. Now the country is saved in the DB. We then should be able to work with the associate currency code to fill out the ExpenseForm to perform a currency conversion.

I learned how to successfully import a js file into a react component, use it in a form and then be saved in the DB.



## 10/13/22

Today, I worked on:

* Exploring more options on how our currency converter should be set up, and helping Alex with the expense form.

Joey and I brainstormed on different approaches on how to implement a currency converter into ExpenseBook. Looks like 3rd party Api's are limited to only a few requests per day. Another option instead of hardcoding could be to fetch data from XML files saved to google sheets.

I learned the steps needed to get our app deployed.



## 10/12/22

Today, I worked on:

* Getting the login page up&running.

While I was driving, Olivia, Alex and George helped out to implement the login code. We got it to work, so now we can successfully login with the username/password credentials, we created in the backend.

I learned the use of FormData to handle a login POST request submission.



## 10/11/22

Today, I worked on:

* Starting with the Front-End of ExpenseBook using Redux.

While Alex was driving, we helped out to implement the code for displaying a dashboard for all budgets data and a form to create a new budget.

I learned how to implement Redux in our React frontend, so all the states can be managed central via store.



## 10/10/22

Today, I worked on:

* Figuring out the authentication code for ExpenseBook to successfully create an account, login/logout.

While I was driving, Olivia and George helped out to implement the authentication code with the existing accounts table. Now we can successfully create an account & login/logout. Also we added some code for some services like get_all_expenses for example, that a user needs to be logged in to get all the expenses data.

I learned how to change an already created table and how to use authentication-tokens.



## 10/06/22

Today, I worked on:

* Helping to finish up the remaining CRUD functions for ExpenseBook and testing all of them.

I learned how to use JOIN to successfully combine rows for all our tables.



## 10/05/22

Today, I worked on:

* Pair coding with Olivia and Joey starting with sql-code for the Expenses pydantic model in queries.py and writing python to interact with FastAPI in routers.py. While I was driving they both helped out to get the code up&running.

I learned how to write CRUD to be able to dynamically interact the data in FastAPI.


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

I learned that there's no real polling between microservices instead we'll be using foreign keys between tables to communicate with each other. 
