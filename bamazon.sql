CREATE DATABASE bamazon_db;

DROP DATABASE bamazon_db;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100),
department_name VARCHAR(100),
-- Decimal takes in two arguments, the first is maximum total number of digits
-- second argument is number of digits after decimal place
price DECIMAL(6,2),
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES 
('skateboard', 'sporting_goods', 150.99, 20),
 ('basketball', 'sporting_goods', 30.29, 30),
 ('snowboard', 'sporting_goods', 257.88, 15),
 ('gym_shorts', 'clothing', 11.99, 30),
 ('gym_shirt', 'clothing', 12.99, 25),
 ('sweatpants', 'clothing', 15.99, 18),
 ('sunglasses', 'eye_care', 40.99, 12),
 ('eye_drops', 'eye_care', 5.99, 14),
 ('shotgun', 'hunting', 400.84, 5),
 ('bow_and_arrow', 'hunting', 308.34, 9);
 
 -- how to view your table without running the select command (because I don't want to add to my viewport)
 
 SELECT * FROM products;
 
 INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES 
('football', 'sporting_goods', 150.99, 4);
