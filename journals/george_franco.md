## 10/04/22

Today we worked to finish setting up our docker-compose.yaml and dockerfile.dev. We were able to succesfully configure our server and databases in pgadmin. Additionally, we set up FastAPI so that we can begin backend development tomorrow.

Prior to this we also built a diagram in excalidraw outlying the backend of our project. We had previously done this for the front end, but doing so for the backend helped us understand how to organize our models and where ForeignKeys were appropriate. 

## 10/05/22 

Today we broke off into pair programming to divide up the expense and budget queries and routers. After beginning to create our get and post requests we realized we would instead need to start with accounts and categories. This is because these fields would also serve as foreign key's in expenses and budgets. 

This process took about 5-6 hours of debugging the python and SQL code. For a long time we had an issue with our fetch statement that was not properly looking through all of our data. This caused an out of range error with the tuple the data was stored in. 


## 10/06/22
Today we spent most of our time collaborating to build the routers and queries for accounts, budgets, expenses, and categories. We got the needed CRUD functions for each of these working effectively with our Postgres database. 

## 10/10/22
Today Daniel, Olivia, and I focused on adding authentication to our accounts table we developed previously. The authentication allowed us to create a specific token when users log in. This log in token was then made a requriement for any user who wishes to access certain application functionalities such as creating or viewing a budget. After suceeding we have completed our applications back end excluding one or two third-party APIs that we plan to implement. 
