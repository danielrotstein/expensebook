## 10/20/22
Today:

I worked on updating the logic on the expense list and by adding they currency symbols onto the foreign currency. Also added the symbols to the budget dashboard and the expense form.

I learned a bit more about using props and hooks was able to delete 10 lines of code by using the correct props. I also learned that props passed to a component can be named anything that you want and is just called in the component by props.{name of prop}.

## 10/19/22
Today:

I finished up creating the expense form using an external API to convert the currency and save to the database. For this, I added excangeRatesApi.js file into redux to pull the current currency rates and added them to the redux store.In doing so, we are now able to use the currency rates globally in all parts of our app by importing the hook.

I learned that you can use an externall api address in the baseUrl field on the queries and got deeper learning on how redux imports work.

## 10/18/22
Today:

I continued to work on the currency conversions for the app. I was able to use the state and props to populate the correct url for the base currency and I was also able to implement a hook to get all currency exchange rates.

I learned that you cannot send props up to a parent module and that they can only be passed down.

## 10/17/22
Today:

I worked on calling the API to get conversion rates and implimented them onto the expense form. I was able to get the conversions to work but now need to get the base currency from the API to convert to a users home currency.

I learned that when calling the api you can change the base currency with the currency code.

## 10/14/22
Today:

Daniel and I pair programmed and worked on the currency converter. We made an update to the BudgetForm.js to have a dropdown with countries and the countries value will be the currency code for that country. This will be needed for when we are doing a currency conversion when adding an expense.

I learned that in JSX when importing a variable from a different file, the variable MUST be exported before being imported to another file.

## 10/13/22
Today:

I Started working on with Daniel on the Currency converter. We brainstormed the best way to get currency conversions and how they will be applied into our app. This is still a work in progress and we will be pursuing more options to create the converter tomorrow.

I learned that you can import som XML files to google sheets then you can import those sheets into SQL

## 10/12/22
Today:

I started working on building the main homepage for expensebook. For this, we decided to use material UI framework for our app. We were able to import the library and update the dependancies so that we could use some of the templates.

I learned how to npm install material UI and force the install because our version of react is new and Material UI has yet to be updated to support the version that we are using.

## 10/11/22
Today:

We did group programming while Alex wrote the code for the creating a budget form and listing the budgets.

I learned that when using an anon function to call a function, you must pass the params thru so that the function will run properly.

## 10/10/22
Today:

I created and wired up routes in the ghi for our app and created folders to organize the components.

I also learned how to do a forced git push using "git push -f origin main". This was needed because there was some commits that were pushd to main on accident.

## 10/6/22
Today:

We worked as a group to complete the remaining CRUD views for the app and tested to ensure functionality.

I learned that doing group programming can help you identify mistakes and mispellings to reduce the amount of errors in code.

## 10/5/22
Today:

Daniel, Olivia and I did group programming and worked on getting endpoints for the expenses API. While Daniel wrote the code, Olivia and I were helping out to get the code up and running.

Today, I learned how to look further into docker to debug and also how to migrate from the docker container using python -m migrations up.

## 10/4/22
Today, I worked on:

*Alex, George, Daniel, Olivia, and I worked on making a diagram of how
 our data tables will be modeled out and sorted out the bounded context
 of our app. I created a excalidraw for a visual and the team contributed
 on making the connections of the foreign keys and tables in our database.
 Today we also worked on creating the tables for our data.

Today, I learned that there is a money data type in postgreSQL. That will probably come in handy later on!
