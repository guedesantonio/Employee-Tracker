const mysql = require("mysql");
const inquirer = require("inquirer");


const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "gege101101",
  database: "employeeDB"
});

connection.connect(err => {
  if (err) throw err;
});

console.log(`
+-------------------------------------------------------------+
| +---+   |X    X|  +---   |     +---+  X     X +---+  +---+  |
| |       | X  X |  |   |  |     |   |   X   X  |      |      |
| +-+     |   |  |  +---   |     |   |     X    +-+    +-+    |
| |       |      |  |      |     |   |     +    |      |      |
| +---+   +      +  +      +---+ +---+     +    +---+  +---+  |
|                                                             |
| +---+  +---        X      +----+  +   X   +---+   +---      |
|   |    |   |      X X     |       |  X    |       |   |     |
|   |    +---      X   X    |       |X      +-+     +---      |
|   |    | X      +-----+   |       |  X    |       | X       |
|   +    +   X   X       X  +----+  +   X   +---+   +   X     |
|                                                             |
+-------------------------------------------------------------+
`)

// // initial user prompt

const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "selection",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees By Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View all Roles",
          "Add Role",
          "Remove Role",
          "Add Department",
          "Remove Department",
          "View Total Department Budget",
          "Quit"
        ]
      }
    ])
    .then(answer => {
      switch (answer.selection) {
        case "View All Employees":
          viewAllEmployees();
          break;

        case "View All Employees By Department":
          viewAllEmployeesByDepartment();
          break;

        case "View All Employees By Manager":
          showAllEmployeesByManager();
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

        case "View All Roles":
          viewAllRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "Remove Role":
          removeRole();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Remove Department":
          addDepartment();
          break;

        case "View Total Department Budget":
          totalDepartmentBudget();
          break;

        case "Quit":
          connection.end();
          break;
      }
    })
}

// HOW TO VIEW MANAGER AS NAME INSTEAD OF ID?
// VIEW FUNCTIONS
const viewAllEmployees = () => {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, name AS department, role.salary, manager_id AS manager FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (department.id = role.department_id)", function (err, res) {
    if (err) throw err;
    console.log("");
    console.table(res);
    init();
  });
};

// WHAT IF I CREATE A NEW DEPARTMENT?
const viewAllEmployeesByDepartment = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which department would you like to see?",
        name: "department",
        choices: ["Sales", "Engineering", "Legal", "Finance"]
      }
    ])
    .then(answer => {
      const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, name AS department, role.salary, manager_id AS manager FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (department.id = role.department_id) WHERE department.name = ?;`;
      connection.query(query, answer.department, function (err, res) {
        if (err) throw err;
        console.log("");
        console.table(res);
        init();
      });
    });
}
init();
