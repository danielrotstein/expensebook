<br />
<div align="center">

  <h1 align="center">ExpenseBook</h1>

</div>


## 🧠 Team members:

- Alex Kagawa
- Daniel Rotstein
- George Franco
- Joey Salvo
- Olivia Sun


## 💻 About The Project

<p align="center">
    ExpenseBook makes it easy to create and manage a budget, track and convert expenses, and stay on top of your finances while you trot around the world.
</p>
<p align="center">
    Free currency converter usage - no account sign up required!
</p>


### 📌 Budgets

Once a user successfully creates an account or logged in, the user selects "Create New Budget" for a new trip, gives it a title, adds a budget total, sets the dates, and currencies based on their home country and the country they plan to visit. Once a budget is created, the budget will be displayed on the budget dashboard including title, dates and budget total. 
The user can click a budget to get to the budget details page, where the user can add expenses and categorize them. The details page keeps track of all expense totals and remaining budget balance in their home country currency. The user is able to update and delete a budget inside the budget details page.

The recommendations section on the budget details page, displays recommendations based on the users destination country. A click on the "Learn More" button opens up a new tab with info about it. The user is able to filter recommendations by price and category.


### 📌 Expenses

Expenses are one of the main tables of data that our application includes. Users can add expenses to their budgets from a budget details page in order to better track their spending while on a trip. The add expense form includes fields such as title, description, date, category, and cost in order to create a descriptive entry for each of a user's entered expenses. Using up to date exchange rates passed in from our third party Currency Converter API, a user's expenses will always be calculated in the currency of both their home and destination countries.
With the ability to create, update, and delete expenses, as well as filter the data by category or date, users are fully in control of their expense tracking from the budget details page.


### 📌 Currency Converter

Free currency converter ready to calculate any amount from and to a specific currency.


### 🎨 Styling

For styling we used Bootstrap and also CSS to customize the design.
To manipulate dates & times we used Moment.js.


### 🛠 Built With

This page was build with the use of following frameworks/libraries and tools:

- [React][react-url]
- [FastApi][fastapi-url]
- [PostgreSQL][postgresql-url]
- [Bootstrap][bootstrap-url]
- [Moment.js][moment.js-url]
- [Currency Converter API][currency-converter-url]
- [Docker][docker-url]



## 🚀 Installation and Setup

To fully enjoy ExpenseBook on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run docker volume create pg-admin
4. Run docker volume create postgres-data
5. Windows: Run docker compose build
6. Run docker compose up
<!-- 6. Run docker exec -it smelli-belli-inventory-api-1 bash
7. Run python manage.py loaddata products.json
8. Exit the container's CLI, and enjoy Smelli Belli to its fullest! -->



## 🪪 Contact

Alex Kagawa - alex.a.kagawa@gmail.com

Daniel Rotstein - daniel.rotstein17@gmail.com

George Franco - gh.franco.98@gmail.com

Joey Salvo - joey.salvo.dev@gmail.com

Olivia Sun - apinet2003@gmail.com

<h5> Project Link: https://gitlab.com/george-franco/expensebook </h5>



[react-url]: https://reactjs.org/
[fastapi-url]: https://fastapi.tiangolo.com/
[postgresql-url]: https://www.postgresql.org/
[bootstrap-url]: https://getbootstrap.com
[moment.js-url]: https://momentjs.com/
[currency-converter-url]: https://exchangerate.host/
[docker-url]: https://docker.com/


