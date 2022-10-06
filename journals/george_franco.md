## 10/04/22

Today we worked to finish setting up our docker-compose.yaml and dockerfile.dev. We were able to succesfully configure our server and databases in pgadmin. Additionally, we set up FastAPI so that we can begin backend development tomorrow.

Prior to this we also built a diagram in excalidraw outlying the backend of our project. We had previously done this for the front end, but doing so for the backend helped us understand how to organize our models and where ForeignKeys were appropriate. 

## 10/05/22 

Today we broke off into pair programming to divide up the expense and budget queries and routers. After beginning to create our get and post requests we realized we would instead need to start with accounts and categories. This is because these fields would also serve as foreign key's in expenses and budgets. 

This process took about 5-6 hours of debugging the python and SQL code. For a long time we had an issue with our fetch statement that was not properly looking through all of our data. This caused an out of range error with the tuple the data was stored in. 