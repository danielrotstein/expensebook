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

Today, I learned that there's no real polling between microservices instead we'll be usinig foreign keys between tables to communicate with each other. 