## 10/27/22

Today, I worked on:

* Fixing errors so our localhost is up & running again, as during yesterdays deployment it failed to load locally, and also finalized the README file. 

We worked as a team to get localhost back up, unfortuntaly the deployment process is put on ice at the moment, because we need some more help from more experienced engineers. I finished up the README with help of the team.

I learned how important a README is and what should be included in it.



## 10/26/22

Today, I worked on:

* Finishing the deployment process for our app as a team.

We got our gitlab pipelines for test, build and deploy to pass, yeaaah, super exciting! However when we load our app in deployment mode, we get like a CORS error and can't log-in/sign-in. We got help from 3 instructors on troubleshooting the issue - still no luck, we'll continue tomorrow. 

I learned that the CI/CD requires a lot of attention to details and that CORS errors don't necessarly mean its a CORS related error at all. 



## 10/25/22

Today, I worked on:

* Writing tests for the app, finishing the footer, and worked with the team on building our .gitlab-ci.yml file for deployment.

Wrote tests for get_all & create recommendations and categories. Could finally finish up the footer. Then Alex was driving while we all helped implement the code for the .gitlab-ci.yml file.

I learned how to write class unit tests using TestClient from fastapi.testclient with overriding dependencies for testing purposes.



## 10/24/22

Today, I worked on:

* Finishing the update & delete functions for budgets, and starting on the readme file for the team.

George was driving and I helped to implement code so users can update & delete a budget. Then started on the foundation for our readme file, by setting up the layout and adding some text. Also, reviewed the explorations on unit tests and CI/CD.

I learned that the CI/CD requires a .gitlab-ci.yml file that includes all the instructions that we want it to perform and that we'll working with Heroku.



## 10/20/22

Today, I worked on:

* Helping George with the update & delete functions in the budget dashboard, and helping the team to fix some bugs.

George was driving and Olivia and I helped to implement code so user can update & delete an expense in the budget dashboard from the expenses list. Also, we had a couple of errors and could fix most of them as a team.

I learned that the query in the update method of the builder mutation requires a spread for the data to get successfully saved.



## 10/19/22

Today, I worked on:

* Helping to implement a list of country name & currency code into a dropdown for the currency converter and fixing some bugs with the team.

Right now we can only use the currency converter by the 3 digits currency code, because that's what the Api is using to fetch the exchange rate. We would like to add the country name to the currency code, so its more user friendly. We were able to add the list to the dropdown but every time we select a country that has a currency code thats shared with multiple countries (e.g. USD, EUR) the dropdown would always switch to the first currency code in the list, so for example if we select United States it would always switch to American Samoa because they're using USD aswell and its the first USD in the list. We'll work on that tomorrow. 

I learned how to add a delete & update method to the Api builder mutation.



## 10/18/22

Today, I worked on:

* Creating the currency converter page with the help of a 3rd party Api.

The page will be accessible for ExpenseBook users, aswell as guests who want to use a free currency converter. Found a currency converter Api, no key necessary and no limits on requests (https://exchangerate.host). Now user is able to convert from over 150 currencies with a daily updated exchange rate. Used my knowledge of useState, useEffect and fetching to get the converter up & running.

I learned that its really hard to find Api's with good documentation and free of use.



## 10/17/22

Today, I worked on:

* Changing code so only budget detail of a specific ID will be displayed and creating a modal for Add Expense "form".

When user clicks on a specific budget in the dashboard, only that specific budget will be displayed in details page, so with that, once we create a new expense for that certain budget, the budget ID is already stored in the DB. Inside specific budget detail, there's now an Add Expense modal "form", just need to figure out how the data gets populated to the details page without having to refresh the page first.

I learned how to write code to use modal for one of our forms.



## 10/14/22

Today, I worked on:

* Creating a currency converter for Expensebook.

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
