require("dotenv").config();
let inquirer = require("inquirer");
let mysql = require("mysql");
let keys = require("./keys.js");

// const connection = mysql.createConnection({keys});

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: keys.password,
    database: "bamazon_db"
});


connection.connect(function(error) {
    if (error) throw error;
    connection.query("SELECT * FROM products", function (error, result) {
      if (error) throw error;
      console.log(result);
    });
  });
