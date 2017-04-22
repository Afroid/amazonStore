# CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 3),
    stock_quantity INTEGER,
    
    PRIMARY KEY(item_id)
);

#DROP TABLE products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Samsung Galaxy S8", "Electronics", 720.99, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Samsung Galaxy Note7", "Electronics", 600.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Samsung TV JS6500", "Electronics", 2000.00, 40);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Sony TV", "Electronics", 1500.00, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("LG TV", "Electronics", 1501.00, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("HDMI Cable", "Accessories", 4.99, 40);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Wall Mount", "Accessories", 35.99, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("3D Glasses", "Accessories", 29.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Screen Wipes", "Accessories", 1.99, 40);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Batteries", "Accessories", 5.99, 20);

#SELECT * FROM products;
