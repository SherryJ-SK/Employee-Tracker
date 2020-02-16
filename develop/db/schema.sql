DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL ,
  last_name VARCHAR(30) NOT NULL ,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  department_name varchar(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10, 4),
  department_id INT,
  PRIMARY KEY(id)
);