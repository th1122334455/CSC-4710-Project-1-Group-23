Project 1 for CSC 4710
Group 23
Members: Thomas Errico-Seaman, Abubakar Babatunde

-WHAT IS NEEDED TO RUN THE CODE-
In Xampp, run Apache and MySQL, and create a new database titled 'project1db'.

Use this SQL code to create the Users table in the project1db database:

CREATE TABLE Users(
   username VARCHAR(50) primary key,
   password VARCHAR(50),
   firstname VARCHAR(50),
   lastname VARCHAR(50),
   salary FLOAT,
   age INTEGER,
   registerday DATE,
   signintime DATETIME
) 


Enter the Backend folder in the repository and run npm start.

Finally, go to http://localhost/database_javascript/project1/Frontend/signin.html to access the website.
