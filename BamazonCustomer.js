var mysql = require("mysql"),
	inquirer = require("inquirer");

//Create connection to the database. Enter your own password below.
	var connection = mysql.createConnection({
		host: "localhost",
		port: "3306",
		user: "root",
		password: "",
		database: "Bamazon"
	});

	connection.connect();

//Get all the products from the database
	connection.query("SELECT * FROM products", function (err, data){
		if (err) {
			throw err;
		}
		console.log(data);
	});

//Questions to be used with inquirer
var questions = [
	{
		type: "input",
		name: "id",
		message: "Type 1-10 for the ID of the Product."
	},
	{
		type: "input",
		name: "quantity",
		message: "What is the quantity of that product would you like to buy?"
	}	
];

var collection;


//Show the products in the console as long as there are no errors.
var showProduct = function (){
	connection.query("SELECT * FROM products", function (err, data){
		if (err) {
			throw err;
		}

		// console.log(data);

		collection = data;
		data.map(function (val){
			console.log("Item ID: " + val.item_id + " Product name: " + val.product_name + " Price: $" + val.price);
			console.log(val);
		});
	});
};

//Call to showProduct
showProduct();

// console.log(collection);

//Whenever called, this will update the database to reflect the remaining quantity after they input
//the quantity to buy
var updateInventory = function (quantity, id){
	connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?;", [quantity, id], function (err, data){
		if (err){
			throw err;
			// console.log(data);
		}
	});
};

//Inquirer to prompt the user with questions so we can get their inputs
setTimeout(function () {
	inquirer.prompt(questions)
	//First promise
		.then(function (data) {

			var msg = {};
			
			collection.map(function (val){

				// msg.check = typeof(data.id);
				// msg.verify = typeof(val.item_id);

//If the id entered matches the id in the database, then
//make sure there is enough quantity of that item left,
//if the quantity is too high, then set the message to 
//say insuffient quantity, if there's enough available, 
//then multiply the price by the quantity entered and
//then subtract the quantity entered from the quantity
//in the database, then update the inventory in the 
//database by calling updateInventory
				if (Number(data.id) === val.item_id) {

					if (data.quantity > val.stock_quantity) {
						msg.result = "an insufficient quantity";
					}

					else {
						// msg.name = "Yes process went smoothly";
						msg.price = val.price * Number(data.quantity);
						msg.remaining = val.stock_quantity - Number(data.quantity);

						updateInventory(msg.remaining, data.id);

					}
				}
			});

			return msg;

			// console.log(data);
		})
		.then(function (data) {//second promise

//If the price exists, then print the first two messages 
//if not, then let them know there is an insufficient amount
//and they have not been charged
			if (data.price) {
				console.log("You just spent $" + data.price + ".");
				console.log("Remaining: " + data.remaining + ".");
			}

			else {
				console.log("We have " + data.result + " available.");
				console.log("You have not been charged.");
			}
			// console.log(data);
		})

		.catch(function (err) {
			console.log(err);
		});
}, 2000);

