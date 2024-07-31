3 Total projects:
-----------------
1. ShoppingListCoreBackend - C# Core - Connection to SqlServer via EF
2. ShoppingListReactFront - React project
3. NodeServer - NodeJS connection to Elasticsearch
 

Instructions:
=============

ShoppingListCoreBackend Project:

1. run sqlserver or docker and change the connectionstring inside the appsettings.json of the project

2 compile the "ShoppingListCoreBackend" project then execute the following 2 commands via "Package Manager Console"
- Add-Migration InitialMigration
- Update-Database

3. run the project


ShoppingListReactFront project:

- run "npm install" then "npm start" from the root project folder.



Startup ElasticSearch Docker:

you can find instructions here
https://www.elastic.co/guide/en/elasticsearch/reference/current/run-elasticsearch-locally.html


NodeServer:

- run "npm install" then "npm start" from the root project folder.


Troubleshooting:
Change the user/Password in the in server.js file to regarding to the user/password of you elasticsearch installtion

*************************
Architecture Information:
*************************
GCP - Architecture

React App (Frontend) - will be hosted by Cloud Storage

.NET Core WebApi (Backend): will be hosted by GKE or Compute Engine

DB will be hosted by Cloud SQL

Node server (Backend): will be hosted by GKE or Compute Engine

ElasticSearch can be hosted by Elastic Cloud or self-managed with Google GKE/GCE

![Architacture-diagrm](https://github.com/user-attachments/assets/dfffcdb5-6bce-42e7-bc6b-81aaccb945bf)





