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

connection.connect(function (error) {
    if (error) throw error;
    connection.query("SELECT item_id, product_name, price FROM products", function (error, results) {
        if (error) throw error;
        for (let i = 0; i < results.length; i++) {
            console.log(`
          Item ID: ${results[i].item_id}
          Product Name: ${results[i].product_name}
          Price: ${results[i].price}
          ----------------------------------------`);
        };
        promptUser();
    });
});

function promptUser() {
    inquirer
        .prompt([
            {
                type: "number",
                name: "id",
                message: "Type the Item ID # of the product you would like to purchase: ",
                default: "number"
            },
            {
                type: "number",
                name: "quantity",
                message: "Type the quantity (number value) of the product you want: ",
                default: "number"
            }
        ])
        .then(userInput => {
            connection.query(`SELECT stock_quantity, price FROM products WHERE item_id = ${userInput.id}`, function (error, sqlResults) {
                if (error) throw error;
                // User-Input validation
                if (sqlResults === undefined || sqlResults.length == 0) {
                    console.log("Please rerun the program but this time select a valid ID");
                    disconnect();
                // If we don't have sufficient inventory
                } else if (userInput.quantity > sqlResults[0].stock_quantity) {
                    console.log(`I'm sorry, there are not that many items available. We only have ${sqlResults[0].stock_quantity} left.`);
                    disconnect();
                } else {
                    console.log(`Congrats on your purchase! Your total is $${userInput.quantity * sqlResults[0].price}`);
                    connection.query(`UPDATE products SET stock_quantity = 
                    ${parseInt(sqlResults[0].stock_quantity) - parseInt(userInput.quantity)}
                    WHERE item_id = ${userInput.id}`, function (error, sqlUpdate) {
                        if (error) throw error;
                        console.log(`Remaining quantity is ${sqlResults[0].stock_quantity - parseInt(userInput.quantity)}`);
                        disconnect();
                    })
                }
            });
        });
};
function disconnect() {
    connection.end(function (err) {
        if (err) {
            console.log(err)
        };
    });
}

