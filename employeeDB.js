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
| +---+   XX    X|  +---+  |     +---+  X    X  +---+  +---+  |
| |       |XX  XX|  |   |  |     |   |   X  X   |      |      |
| +-+     |  XX  |  +---+  |     |   |    XX    +-+    +-+    |
| |       |      |  |      |     |   |    ++    |      |      |
| +---+   +      +  +      +---+ +---+    ++    +---+  +---+  |
|                                                             |
| +---+  +---+       X      +----+  +   X   +---+   +---+     |
|   |    |   |      X X     |       |  X    |       |   |     |
|   |    +---+     X   X    |       |XX     +-+     +---+     |
|   |    | X      X+----+   |       |  X    |       | X       |
|   +    +   X   X       X  +----+  +   X   +---+   +   X     |
|                                                             |
+-------------------------------------------------------------+
`)

// // prompt here
// const postAuction = () => {
//   inquirer
//     .prompt([
//       {
//         name: "item",
//         type: "input",
//         message: "What is the item you would like to submit?"
//       },
//       {
//         name: "category",
//         type: "input",
//         message: "What category would you like to place your auction in?"
//       },
//       {
//         name: "startingBid",
//         type: "input",
//         message: "What would like to be the starting bid to be?"
//       }
//     ])
//     .then(answer => {
//       createProduct(answer);

//     })
// }


// const createProduct = (answer) => {
//   console.log("Inserting a new product...\n");
//   var query = connection.query(
//     "INSERT INTO products SET ?",
//     {
//       item_name: answer.item,
//       category: answer.category,
//       starting_bid: answer.starting_bid || 0,
//       highest_bid: answer.starting_bid || 0
//     },
//     function (err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " product inserted!\n")
//       // updateProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// postAuction();
// // const updateProduct = () => {
// //   console.log("Updating all Rocky Road quantities...\n");
// //   var query = connection.query(
// //     "UPDATE products SET ? WHERE ?",
// //     [
// //       {
// //         quantity: 100
// //       },
// //       {
// //         flavor: "Rocky Road"
// //       }
// //     ],
// //     function (err, res) {
// //       if (err) throw err;
// //       console.log(res.affectedRows + " products updated!\n");
// //       // Call deleteProduct AFTER the UPDATE completes
// //       deleteProduct();
// //     }
// //   );

// //   // logs the actual query being run
// //   console.log(query.sql);
// // }

// // const deleteProduct = () => {
// //   console.log("Deleting all strawberry icecream...\n");
// //   connection.query(
// //     "DELETE FROM products WHERE ?",
// //     {
// //       flavor: "strawberry"
// //     },
// //     function (err, res) {
// //       if (err) throw err;
// //       console.log(res.affectedRows + " products deleted!\n");
// //       // Call readProducts AFTER the DELETE completes
// //       readProducts();
// //     }
// //   );
// // }

// // const readProducts = () => {
// //   console.log("Selecting all products...\n");
// //   connection.query("SELECT * FROM products", function (err, res) {
// //     if (err) throw err;
// //     // Log all results of the SELECT statement
// //     console.log(res);
// //     connection.end();
// //   });
// // }
