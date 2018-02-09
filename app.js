const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const register = require("./src/auth/register");
const login = require("./src/auth/login");
const db = require("./src/database/setup");
const item = require("./src/product/item");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World')
})

//Execute this when server setup. this will create required tables and schemas in DB
//execute with this predefined access_token in config as this is an admin function
//ex :  https://localhost:3000/app/db/setup?access_token=jkh5oih342oilh43
app.get('/app/db/setup', db.setup); //setup database

//Endpoints for sellers to register
app.post('/app/register', register.Register);
app.post('/app/login', login.Login);

//Endpoints for website UI view which needs no auth
//Get all products endpoint
app.get('/app/global/items', item.GetAllItems);

//Endponts for Sellers on Items
app.get('/app/item/:itemId', item.GetItemByID); //Get my item by id
app.get('/app/items/all', item.GetMyAllItems); //Get my all items
app.get('/app/items/active', item.GetMyActiveItems); //Get all my active items
app.get('/app/items/inactive', item.GetMyInactiveItems) //Get all my inactive
app.post('/app/item', item.AddItem); //add items.. payload can be one object or array of objects
app.put('/app/item', item.UpdateItem); //update items.. payload can be one object or array of objects
app.delete('/app/item/:itemId', item.DeleteItem); // delete item by id

app.listen(3000);