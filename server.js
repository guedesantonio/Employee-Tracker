// Dependencies
const express = require("express");
const mysql = require("mysql");

// Create express app instance.
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8081;

// MySQL DB Connection Information (remember to change this with our specific credentials)
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "gege101101",
  database: "employeeDB"
});

// Initiate MySQL Connection.
connection.connect(err => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Routes
app.get("/", (req, res) => {

  // If the main route is hit, then we initiate a SQL query to grab all records.
  // All of the resulting records are stored in the variable "result."
  connection.query("SELECT * FROM actors", function (err, result) {
    if (err) throw err;
    // We then begin building out HTML elements for the page.
    let html = "<h1> Seinfeld Actors </h1>";

    // Here we begin an unordered list.
    html += "<ul>";

    // We then use the retrieved records from the database to populate our HTML file.
    for (let i = 0; i < result.length; i++) {
      html += "<li><p> name: " + result[i].name + "</p>";
      html += "<p>coolness_points: " + result[i].coolness_points + " </p>";
      html += "<p>attitude: " + result[i].attitude + " </p></li>";
    }

    // We close our unordered list.
    html += "</ul>";

    // Finally we send the user the HTML file we dynamically created.
    res.send(html);
  });
});

app.get("/cast", (req, res) => {

  // If the main route is hit, then we initiate a SQL query to grab all records.
  // All of the resulting records are stored in the variable "result."
  connection.query("SELECT  name, id FROM actors", function (err, result) {
    if (err) throw err;
    // We then begin building out HTML elements for the page.
    let html = "<h1> Seinfeld Cast </h1>";

    // Here we begin an unordered list.
    html += "<ul>";

    // We then use the retrieved records from the database to populate our HTML file.
    for (let i = 0; i < result.length; i++) {
      html += "<li><p> name: " + result[i].name + "</p></li>";
    }

    // We close our unordered list.
    html += "</ul>";

    // Finally we send the user the HTML file we dynamically created.
    res.send(html);
  });
});

app.get("/coolness-chart", (req, res) => {

  // If the main route is hit, then we initiate a SQL query to grab all records.
  // All of the resulting records are stored in the variable "result."
  connection.query("SELECT  name , coolness_points FROM actors ORDER by coolness_points desc;", function (err, result) {
    if (err) throw err;
    // We then begin building out HTML elements for the page.
    let html = "<h1> Seinfeld Coolness Points </h1>";

    // Here we begin an unordered list.
    html += "<ul>";

    // We then use the retrieved records from the database to populate our HTML file.
    for (let i = 0; i < result.length; i++) {
      html += "<li><p> name: " + result[i].name + "</p>";
      html += "<p>coolness_points: " + result[i].coolness_points + " </p></li>"
    }

    // We close our unordered list.
    html += "</ul>";

    // Finally we send the user the HTML file we dynamically created.
    res.send(html);
  });
});

app.get("/attitude-chart/:att", (req, res) => {

  // If the main route is hit, then we initiate a SQL query to grab all records.
  // All of the resulting records are stored in the variable "result."
  connection.query("SELECT  name , coolness_points FROM actors ORDER by coolness_points desc;", function (err, result) {
    if (err) throw err;
    // We then begin building out HTML elements for the page.
    let html = "<h1> Seinfeld Coolness Points </h1>";

    // Here we begin an unordered list.
    html += "<ul>";

    // We then use the retrieved records from the database to populate our HTML file.
    for (let i = 0; i < result.length; i++) {
      html += "<li><p> name: " + result[i].name + "</p>";
      html += "<p>coolness_points: " + result[i].coolness_points + " </p></li>"
    }

    // We close our unordered list.
    html += "</ul>";

    // Finally we send the user the HTML file we dynamically created.
    res.send(html);
  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
