require("dotenv").config();
let inquirer = require("inquirer");
let mysql = require("mysql");
let keys = require("./keys.js");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: keys.password,
    database: "bamazon_db"
});

connection.connect(function (error) {
    if (error) throw error;
    promptUser();
});

function promptUser() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "menu",
                message: "Select an item from the menu: ",
                choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]
            }
        ])
        .then(({menu}) => {
            switch (menu) {
                case "View products for sale":
                    productsForSale();
                    break;
                case "View low inventory":
                    lowInventory();
                    break;
                case "Add to inventory":
                    reUp();
                    break;
                case "Add new product":
                    addNew();
                    break;
            }
        })
};

function productsForSale() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (error, results) {
        if (error) throw error;
        displayResults(results);
    })
}

function displayResults(results) {
    for (let i = 0; i < results.length; i++) {
        console.log(`
          Item ID: ${results[i].item_id}
          Product Name: ${results[i].product_name}
          Price: ${results[i].price}
          Stock Quantity: ${results[i].stock_quantity}
          ----------------------------------------`);
    }
    disconnect();
}

function lowInventory() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", function (error, results) {
        if (error) throw error;
        displayResults(results);
    })
}

function reUp() {
    inquirer
        .prompt([
            {
                type: "number",
                name: "id",
                message: "Type item ID of product you would like to buy more of: ",
                default: "number"
            },
            {
                type: "number",
                name: "quantity",
                message: "Enter the quantity of the item you'd like to buy: ",
                default: "number"
            }
        ])
        .then((userInputObj) => {
            connection.query(`UPDATE products SET stock_quantity = stock_quantity + ${userInputObj.quantity}
            WHERE item_id = ${userInputObj.id}`, function(err) {
                if (err) throw err;
                connection.query(`SELECT item_id, product_name, stock_quantity FROM products WHERE item_id = ${userInputObj.id}`, function(err, resultsArrOfObj) {
                    if (err) throw err;
                    console.log(`You just added ${userInputObj.quantity} ${resultsArrOfObj[0].product_name}(s) to your inventory.`);
                    console.log(`You now have ${resultsArrOfObj[0].stock_quantity + userInputObj.quantity} ${resultsArrOfObj[0].product_name}(s).`);
                })
                disconnect();
            });
        });
};

function addNew() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "productName",
            message: "Type the name of the product you would like to add:",
            default: "String"
        },
        {
            type: "list",
            name: "department",
            message: "Choose the department name corresponding to the product: ",
            choices: ["sporting_goods", "clothing", "eye_care", "hunting"]
        },
        {
            type: "number",
            name: "price",
            message: "How much would you like to sell it for?",
            default: "number"
        },
        {
            type: "number",
            name: "quantity",
            message: "How many would you like to buy?",
            default: "number"
        }
    ])
    .then((userInputObj) => {
        connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity)
        VALUES ('${userInputObj.productName}', '${userInputObj.department}', '${userInputObj.price}', '${userInputObj.quantity}')`, 
        function(err) {
            if (err) throw err;
            console.log(`Congrats on your new inventory! Let's hope you sell a lot of ${userInputObj.productName}s!`);
            disconnect();
        });
    });
};

function disconnect() {
    connection.end(function (err) {
        if (err) {
            console.log(err);
        };
    });
}