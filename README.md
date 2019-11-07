# Node.js-MySQL

## What this app demonstrates:
    This app demonstrates that I know enough about mySQL, and how to
    integrate it into VSCode to be able to create a command-line app 
    that allows the user of the app to make purchases. I've also 
    included a manager file that allows for a manager to 
        * View current inventory
        * View only the inventory that is low (less than 5 itmes 
        remaining)
        * Replenish existing products in the inventory, and
        * Add a completely new product to the inventory

## How the code is set up:
    I first created a mySQL database, and then connected it to my VSCode 
    file. 

    In my customer file, I have used the Inquirer NPM package to start
    my app, which asks questions to the user. I then wrote code that 
    queries and updates my database based on the user's questions.

    In my manager file, I also used Inquirer, but the main flow of the 
    file comes from a javascript switch statement. In this file, I also 
    updated and queried my database.

## How to use the app:
    Open your command-line and navigate to the directory containing this 
    project. You'll need to enter "node [project_name]". The project name 
    will be "bamazonCustomer.js" for the customer view, or "bamazonManager.js" 
    for the manager view.

    Then all you have to do is follow the prompts and it will display all the 
    information you'll need to update your data. Just make sure to press "enter" 
    after each prompt

## List of technologies used:
    * Javascript
    * Node.js
    * mySQL
    * NPM Packages:
        * Inquirer
        * dotenv

## Video of me demonstrating the app:
    