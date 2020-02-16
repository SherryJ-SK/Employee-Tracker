var express = require("express");
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var app = express();

var PORT = process.env.PORT || 8080;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Escape@2020",
  database: "employeeTracker_db"
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  runSearch();
  getEmpList();
  generateManager();
  employeeRole();
});

const allEmployee = [];
const empList = [];
const allManager = [];
const employRole = [];

//generate employee list
function getEmpList() {
  connection.query("SELECT id, first_name, last_name FROM employeeTracker_db.employee ", function (err, res) {
    if (err) throw err;
    for (var c = 0; c < res.length; c++) {
      empList.push({ value: res[c].id, name: res[c].first_name + " " + res[c].last_name })
    }
    // console.table(empList);
  });
};

// generate all manager push into array
function generateManager() {
  var query = "SELECT DISTINCT manager.id, manager.first_name, manager.last_name "
  query += "FROM employee AS staff ";
  query += "LEFT JOIN role ON staff.role_id = role.id ";
  query += "LEFT JOIN department ON role.department_id = department.id ";
  query += "LEFT JOIN employee AS manager ON staff.manager_id = manager.id ";
  query += "GROUP BY id"
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (var a = 0; a < res.length; a++) {
      if (res[a].id != null) {
        allManager.push({ value: res[a].id, name: res[a].first_name + " " + res[a].last_name })
      }
    }
    // console.table(allManager);
  })
};

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Exit"
      ]
    })
    .then(answer => {
      // console.log(answer.action);
      switch (answer.action) {
        case "View All Employees":
          allEmployees();
          break;

        case "View All Employees By department":
          employeesByDepartment();
          break;

        case "View All Employees By Manager":
          employeesByManager();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Update Employee Manager":
          updateEmployeeManager();
          break;

        case "Exit":
          console.log("Thank you for using.")
          connection.end();
          break;
      }
    })
};

// view all employees
function allEmployees() {
  var query = "SELECT staff.first_name, staff.last_name, title, salary, department_name, "
  query += "CONCAT(manager.first_name, ' ', manager.last_name) AS 'manager' FROM employee AS staff ";
  query += "LEFT JOIN role ON staff.role_id = role.id ";
  query += "LEFT JOIN department ON role.department_id = department.id ";
  query += "LEFT JOIN employee AS manager ON staff.manager_id = manager.id";
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      allEmployee.push(res[i]);
    }
    console.table(allEmployee);
  })
};

// view all employees by department
function employeesByDepartment() {
  inquirer.prompt({
    name: "searchDept",
    type: "list",
    message: "Which department you would like to view?",
    choices: ["Sales", "Engineer", "Finance", "Legal"]
  }).then((data) => {
    var query = "SELECT first_name, last_name, department_name FROM employee ";
    query += "LEFT JOIN role ON employee.role_id = role.id ";
    query += "LEFT JOIN department ON role.department_id = department.id ";
    query += "WHERE department_name = ? ";
    connection.query(query, [data.searchDept], function (err, res) {
      if (err) throw err
      console.table(res)
    })
  })
};

function employeesByManager() {
  inquirer.prompt({
    name: "searchManager",
    type: "list",
    message: "Select the manager:",
    choices: allManager
  }).then((data) => {
    var query = "SELECT staff.first_name, staff.last_name, title, "
    query += "CONCAT(manager.first_name, ' ', manager.last_name) AS 'manager' FROM employee AS staff ";
    query += "LEFT JOIN role ON staff.role_id = role.id ";
    query += "LEFT JOIN department ON role.department_id = department.id ";
    query += "LEFT JOIN employee AS manager ON staff.manager_id = manager.id ";
    query += "WHERE staff.manager_id = ?"
    connection.query(query, [data.searchManager], function (err, res) {
      if (err) throw err
      console.table(res)
    })
  })
};

// generate role list
function employeeRole() {
  connection.query("SELECT id, title FROM employeeTracker_db.role", function (err, res) {
    if (err) throw err;
    for (var b = 0; b < res.length; b++) {
      employRole.push({ value: res[b].id, name: res[b].title });
    }
    // console.table(employRole);
  })
};

function addEmployee() {
  //ask for new employee information
  inquirer.prompt([
    {
      name: "empFirstName",
      type: "input",
      message: "New employee first name:"
    },
    {
      name: "empLastName",
      type: "input",
      message: "New employee Last name:"
    },
    {
      name: "empRole",
      type: "list",
      message: "New employee's role:",
      choices: employRole
    },
    {
      name: "empManager",
      type: "list",
      message: "New employee's Manager:",
      choices: allManager
    }
  ]).then((data) => {
    // console.log(data);
    var query = "INSERT INTO employeeTracker_db.employee SET ? ";
    //add into db
    connection.query(query, {
      first_name: data.empFirstName,
      last_name: data.empLastName,
      role_id: data.empRole,
      manager_id: data.empManager
    }, function (err, res) {
      if (err) throw err;
      console.log(`Employee number ${res.insertId} has been added`);
    })
  })
};

function removeEmployee() {
  //prompt question to choose to remove wich employee
  inquirer.prompt([
    {
      name: "empRemove",
      type: "list",
      message: "Which employee you would like to remove:",
      choices: empList
    }
  ]).then((data) => {
    // console.log(data.empRemove);
    //remove from db
    var query = "DELETE FROM employeeTracker_db.employee WHERE id = ?";
    connection.query(query, [data.empRemove], function (err, res) {
      if (err) throw err;
      console.log(`${res.affectedRows} employee has been removed`);
    })
  })
};

function updateEmployeeRole() {
  //ask update which employee and role update
  inquirer.prompt([
    {
      name: "empUpdate",
      type: "list",
      message: "Which employee you would like to update:",
      choices: empList
    },
    {
      name: "roleUpdate",
      type: "list",
      message: "Role update to:",
      choices: employRole
    }
  ]).then((data) => {
    // console.log(data.empUpdate);
    var query = "UPDATE employeeTracker_db.employee SET role_id = ? WHERE id = ? ";
    connection.query(query, [data.roleUpdate, data.empUpdate], function (err, res) {
      if (err) throw err;
      console.log(`Role has been updated for ${res.affectedRows} employee`);
    })
  })
};

function updateEmployeeManager() {
  //ask employee and update which manager 
  inquirer.prompt([
    {
      name: "empUpdate",
      type: "list",
      message: "Which employee you would like to update:",
      choices: empList
    },
    {
      name: "managerUpdate",
      type: "list",
      message: "Which manager:",
      choices: allManager
    }
  ]).then((data) => {
    var query = "UPDATE employeeTracker_db.employee SET manager_id = ? WHERE id = ? ";
    connection.query(query, [data.managerUpdate, data.empUpdate], function (err, res) {
      if (err) throw err;
      console.log(`Manager has been updated for ${res.affectedRows} employee`);
    })
  });
};