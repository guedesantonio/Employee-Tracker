
DROP DATABASE IF EXISTS employeeDB;

-- Create the database employee and specified it for use.
CREATE DATABASE employeeDB;

USE employeeDB;

-- Create the table plans.
CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT
  PRIMARY KEY (id);