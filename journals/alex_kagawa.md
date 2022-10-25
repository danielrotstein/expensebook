# October 20, 2022
Today, I worked on:

Fine tuning the last bit of styling we needed to do across our app, and worked on building our .gitlab-ci.yml file for deployment.

I learned how to code a .gitlab-ci.yml file and how the overall process of deploying with Heroku and Gitlab works.

# October 20, 2022
Today, I worked on:

Adding a handful of finishing touches to the design and stling of our app, the toughest of which was creating a dropdown menu in our ListExpenses component, which required passing in an ID to the dropdown menu via an onClick listener, so that the dropdown would only appear for the specific expense that was clicked rather than all expenses in the list.

I learned how to accomplish the above based on a tutorial found online.

# October 20, 2022
Today, I worked on:

Implementing our home screen, and fixing a handful of bugs with the team.

I learned how to use absolute positioning to have a single element span the width and height of the screen while maintaining its proportions regardless of when the width or height of the page changes.

# October 19, 2022
Today, I worked on:

Updating the recommendations table to include a country property, so that we can filter which recommendations we show to which budgets.  Now we have the ability to query recommendations based on the country the user inputs for the budget they create.  Separately, we also now have the ability to filter recommendations by category or by price from the budget details screen.

I learned more CSS and bootstrap tricks to be more effective at applying flex and grid displays.

# October 18, 2022
Today, I worked on:

Finalizing our TravelRecommendations component, and adding the ability to filter the data being displayed on our BudgetDetails page.

I learned how to use the localStorage read-only property based on the work Olivia did last night related to authentication.

# October 17, 2022
Today, I worked on:

Implementing and styling the BudgetDetails component, which included implementing an ExpensesList and a TravelRecommendations component as well.  Over the weekend, I was also able to finalize the styling for the budget POST form.

I learned (and now very much appreciate) just how valuable the Redux store is today.  The budget details screen is the most visually complex page we're building as part of our MVP, so breaking it down into several components was necessary, and not having to pass props from one component to another made the implementation of that screen and its various components much easier with the help of Redux.

# October 14, 2022
Today, I worked on:

Establishing the color pallet, branding, and styling of our application by designing our first few screens using bootstrap and CSS starting with the budget dashboard and the budget POST form.

I learned how to couple CSS transitions with box-shadows to trigger a box-shadow to gradually appear whenever key elements are hovered.  I feel this effect gives the site a sleeker look-and-feel, which is exactly what we're going for.

# October 13, 2022
Today, I worked on:

Implementing the POST form for our Expense data type.  It was the first form we've begun implementing with foreign keys to other data types, which has been a bit challenging.  We've confirmed the form submits when hard coding the IDs for the appropriate foreign keys in the form, but when selecting a budget and a category from a drop-down menu in the expense form, the IDs don't seem to be passing through correctly, so the POST doesn't actually happen.  We're not quite there yet, but are very very close to getting the form to submit successfully.

I learned that you can reassign deconstructed values to different variables with the following syntax:

const { 
        data: categoriesData, 
        error: categoriesError, 
        isLoading: categoriesIsLoading 
    } = useGetCategoriesQuery();

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