const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");


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

connection.query = util.promisify(connection.query);

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
          viewAllEmployeesByManager();
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

// VIEW FUNCTIONS
const viewAllEmployees = () => {
  connection.query(`
      SELECT 
        employee.id, 
        CONCAT (employee.first_name,' ', employee.last_name) AS 'Employee Name', 
        role.title AS 'Role Title', 
        name AS Department, 
        role.salary AS Salary, 
        CONCAT (managers.first_name,' ', managers.last_name) AS 'Manager Name'
      FROM employee 
      INNER JOIN role ON (employee.role_id = role.id) 
      INNER JOIN department ON (department.id = role.department_id)
      LEFT JOIN employee AS managers ON (employee.manager_id = managers.id)
    `, function (err, res) {
    if (err) throw err;
    console.log("");
    console.table(res);
    init();
  }
  );
};

function getAllDepartments() {
  return connection.query(`SELECT name FROM department`)
};

const viewAllEmployeesByDepartment = () => {

  getAllDepartments().then((departments) => {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which department would you like to see?",
          name: "department",
          choices: departments
        }
      ])
      .then(answer => {
        const query = `
      SELECT 
        employee.id, 
        CONCAT (employee.first_name,' ', employee.last_name) AS 'Employee Name', 
        role.title AS 'Role Title', 
        name AS Department, 
        role.salary AS Salary, 
        CONCAT (managers.first_name,' ', managers.last_name) AS 'Manager Name'
      FROM employee 
      INNER JOIN role ON (employee.role_id = role.id) 
      INNER JOIN department ON (department.id = role.department_id)
      LEFT JOIN employee AS managers ON (employee.manager_id = managers.id)
      WHERE department.name = ?;`;
        connection.query(query, answer.department, function (err, res) {
          if (err) throw err;
          console.log("");
          console.table(res);
          init();
        });
      });
  });
};

async function getAllManagers() {
  let query = await connection.query(`
  SELECT distinct manager_id 
  FROM employee 
  WHERE manager_id IS NOT NULL`);
  let newQuery = query.map(obj => {
    let rObj = { name: obj.manager_id }
    console.log(rObj);
    return rObj
  })
  return newQuery;
};

const viewAllEmployeesByManager = () => {

  getAllManagers().then((managers) => {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which manager team would you like to see?",
          name: "manager",
          choices: managers
        }
      ])
      .then(answer => {
        console.log(answer.manager)
          const query = `
        SELECT 
          employee.id, 
          CONCAT (employee.first_name,' ', employee.last_name) AS 'Employee Name', 
          role.title AS 'Role Title', 
          name AS Department, 
          role.salary AS Salary, 
          CONCAT (managers.first_name,' ', managers.last_name) AS 'Manager Name'
        FROM employee 
        INNER JOIN role ON (employee.role_id = role.id) 
        INNER JOIN department ON (department.id = role.department_id)
        LEFT JOIN employee AS managers ON (employee.manager_id = managers.id)
        WHERE managers.id = ?;`;
          connection.query(query, answer.manager, function (err, res) {
            if (err) throw err;
            console.log("");
            console.table(res);
            init();
          });
      });
  });
};



//   // connection.query("SELECT id, first_name, last_name, manager_id FROM company_db.employee", function (err, res) {
//   //   if (err) throw err;




//   // inquirer
//   //   .prompt([
//   //     {
//   //       type: "list",
//   //       message: "Which department would you like to see?",
//   //       name: "department",
//   //       choices: ["Sales", "Engineering", "Legal", "Finance"]
//   //     }
//   //   ])
//   //   .then(answer => {
//   //     const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, name AS department, role.salary, manager_id AS manager FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (department.id = role.department_id) WHERE department.name = ?;`;
//   //     connection.query(query, answer.department, function (err, res) {
//   //       if (err) throw err;
//   //       console.log("");
//   //       console.table(res);
//   //       init();
//   //     });
//   //   });
// }


// TOBYS CODE
// async function viewAllEmployeesByManager() {
//   let query = await connection.query(`SELECT distinct manager_id FROM employee WHERE manager_id IS NOT NULL`)
//   let newQuery = query.map(obj => {
//     let rObj = {name: obj.manager_id}
//     console.log(rObj);
//     return rObj
//   })
//   return newQuery;
// };



init();
