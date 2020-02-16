SELECT * FROM employeeTracker_db.employee;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", "1", "2");
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", "2", null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Rodriguez", "4", null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Tupik", "3", "3");
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Malia", "Brown", "5", "8");
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Lourd", "7", "7");
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Allen", "6", null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Christ", "White", "8", null);


SELECT * FROM employeeTracker_db.department;

INSERT INTO department (department_name)
VALUES ("Sales");
INSERT INTO department (department_name)
VALUES ("Engineering");
INSERT INTO department (department_name)
VALUES ("Finance");
INSERT INTO department (department_name)
VALUES ("Legal");


SELECT * FROM employeeTracker_db.role;

INSERT INTO role (title, salary, department_id)
VALUES ("Sales", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 110000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 70000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 180000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 160000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Financial Controller", 250000, 3);

