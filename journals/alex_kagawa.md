# October 12, 2022
Today, I worked on:

Implementing our Login component, which required us to create a new mutation in Redux.  After the work we did today, we're now able to create a token using our login form.

I learned that CORS errors aren't necessarily caused by CORS-specific issues.  We were getting a CORS error today while hooking up our login component, and it turned out that that error stemmed from a syntax error in one of our mutations rather than an issue with our CORS configuration.

# October 11, 2022
Today, I worked on:

Implementing Redux.  I worked with the team on creating our app's store, and implementing our first query and mutation for our budgets API, which we were able to connect to the BudgetDashboard and BudgetForm components respectively.

I learned that Redux doesn't necessarily need to replace the use of any hooks in React.  You can still use hooks to create and update state, and use the 'local' state created/modified via hooks alongside the 'global' state created/modified via Redux.

# October 10, 2022
Today, I worked on:

Implementing the routers and queries for the recommendations table, and started researching the implementation of the Pexels API.

I learned that you can modify an existing table by simply updating the original migrations file with the change without needing to create a new migrations file and/or re-migrate.

# October 6, 2022
Today, I worked on:

Implementing the list and create endpoints for the Account and Budget tables. We have both endpoints working for both tables with the exception of listing all budgets. We encountered issues with that particular endpoint, all of which we believe stem from the for loop following our SQL command in our query function. This still requires some troubleshooting, but we're making progress as a team.

Today, I grasped a much better understanding of writing routers and queries in FastAPI. It's tough to fully follow the logic behind the various moving pieces in FastAPI during lecture alone, and finally having the opportunity to write the code directly was very helpful in understanding how everything fits together.

# October 5, 2022
Today, I worked on:

Mapping out the relationships between our database tables in Excalidraw. We decided to collapse our microservice architecture into a monolith architecture, so rather than having multiple databases, we now have one database, which includes tables for budgets, expenses, accounts, recommendations, and categories. We planned out which/how each table relates to another using foreign keys, and began creating our tables in our first migrations file based on the mapping we did in Excalidraw.

Today, I found out that each database can use its own framework. For instance, when we were still exploring architecting ExpenseBook as a microservice app, we had explored using Django for our accounts database, and FastAPI for all other databases. Obviously, we ultimately moved away from the microservice architecture, but it was an interesting thought exercise to explore how we might implement multiple backend frameworks when the microservice architecture was still on the table.