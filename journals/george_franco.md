## 10/04/22

Today we worked to finish setting up our docker-compose.yaml and dockerfile.dev. We were able to succesfully configure our server and databases in pgadmin. Additionally, we set up FastAPI so that we can begin backend development tomorrow.

Prior to this we also built a diagram in excalidraw outlying the backend of our project. We had previously done this for the front end, but doing so for the backend helped us understand how to organize our models and where ForeignKeys were appropriate. 

## 10/05/22 

Today we broke off into pair programming to divide up the expense and budget queries and routers. After beginning to create our get and post requests we realized we would instead need to start with accounts and categories. This is because these fields would also serve as foreign key's in expenses and budgets. 

This process took about 5-6 hours of debugging the python and SQL code. For a long time we had an issue with our fetch statement that was not properly looking through all of our data. This caused an out of range error with the tuple the data was stored in. 


## 10/06/22
Today we spent most of our time collaborating to build the routers and queries for accounts, budgets, expenses, and categories. We got the needed CRUD functions for each of these working effectively with our Postgres database. 

I learned a lot aout SQL and how to write INSERT and LEFT JOIN statements. 

## 10/10/22
Today Daniel, Olivia, and I focused on adding authentication to our accounts table we developed previously. The authentication allowed us to create a specific token when users log in. This log in token was then made a requriement for any user who wishes to access certain application functionalities such as creating or viewing a budget. After suceeding we have completed our applications back end excluding one or two third-party APIs that we plan to implement. 


## 10/11/22
Today we began to implement Redux into our project. This included creating a store.js file as well as API's for budgets and accounts. This was an important first step in beginning to work on the front end of our project. We also began to work on some of our intial react forms. We began with our budget dashboard (budget list) and the form to submit new budgets.

Since this was the first day we had used Redux I learned a lot about how to format our code using useState(). I also learned about how to best format a handleSubmit button so that it preventsDefault. 

## 10/12/22
Today we continued working on the early stages of our front end. Our team collaborated together in order to get the log-in form up and running. This required a long debugging process as the POST was sending the data formatted as JSON rather than Python code as it was expecting. On the back end with Redux we had to add a POST statement to our accounting API that generates a token upon login. 

I further developed on what we learned yesterday with Redux. Working on Accounts allowed us to work on a different problem while applying the same principles as we had to our Budgets API the day before. 

## 10/13/22
Olivia and I have begun to focus on the authentication process for the application. At this point I built the signup and logout forms. Through testing we were able to confirm that sign up was posting the data to our Postgres database. At this time we do not have a way to track whether a user is signed in or out so we cannot test the logout page, it is however redirecting users when clicked like it should.

## 10/14/22

## 10/17/22
Today I spent much of my time collaborating with Olivia to finish authentication. I was able to dig into the data variable and find our token when we login. Using this we are able to store it and use it to filter certain pages based on if the queried token can be found. 

I learned about locale storage today. 

## 10/18/22
Today my main focus was on being able to query the current user by their unique email address. We already had similar logic working from Olivia's work to filter the Budgets Dashboard by user. However, the budget POST we were working on used different routers and API methods. So while the logic was the same we needed to be creative in how we applied it. By using locale storage and our accountsAPI, we were able to query budgets by accounts using the email that is stored upon log in. Once we had the budgets we dug into that list of lists in order to assign the related account ID to the budgets created in the budgetform. 

I felt I learned more about React and React Hooks by going through this process today. 

## 10/19/22
Today I spent the majority of my time fleshing out some additional features on both the front end and back end. I mainly focused on setting up the ability for users to both edit and delete their budgets and expenses from their records. What was consistently the hardest part of this was querying up the correct data so that we could dig in and filter the data by various values. 

My work today involved writing the API methods on both our expenses and budgets APIs. After this was done I began working on the react forms, often first using a query to get a value such as account or budget ID, from there I would use the appropriate mutation to update or delete the value. In my work with the expenses update form I found the most difficult part was formatting things correctly so that the form would appear as a popup. 

## 10/20/22
Today I continued upon my previous days work and began to focus on the update expense functionality. Passing budget ID intrinsically, as we didn't want that to be changed, proved to be a challenge. By diving into my react notes I recalled learning about useEffect. It worked perfectly for what I needed to do. After solving this blocker I was able to get the forms to submit properly. 