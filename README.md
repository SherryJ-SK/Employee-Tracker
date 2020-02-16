# Employee Tracker

## Description
This app allow user to track employee information from local data base through MySQL.

### Database
Three tables has been built in the schema.sql, which contain basic information for each employee, such as employee name, role id and manager id. The role id is linked with the role table and department table. Manager id can help to track the manager information.

### How to use
Before running this application in the terminal, please install the json package:
```
npm install
```
Create the database in MySQL. Copy all information from schema.sql, paste and run in MySQL workbench. Then load the employee information to the database, seeds.sql can be used as a template.

Last step is to run the application in the terminal
```
node server.js
```

### Functions
This application allows user to:
- View all employees information
- View employees by department
- View employees by manager
- Add employee
- Remove employee
- Update employee role
- Update employee manager

### Acknowledgments
- Node.js
- MySQL
- npm inquirer
- npm table




