const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const register = require("./src/auth/register");
const login = require("./src/auth/login");
const db = require("./src/database/setup");
const item = require("./src/product/item");
const stock = require("./src/product/stock");
const order = require("./src/product/order");


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
//Order product
app.post('/app/global/order', order.PlaceOrder);

//Endponts for Sellers on Items
app.get('/app/item/:itemId', item.GetItemByID); //Get my item by id
app.get('/app/items/all', item.GetMyAllItems); //Get my all items
app.get('/app/items/active', item.GetMyActiveItems); //Get all my active items
app.get('/app/items/inactive', item.GetMyInactiveItems) //Get all my inactive
app.post('/app/item', item.AddItem); //add items.. payload can be one object or array of objects
app.put('/app/item', item.UpdateItem); //update items.. payload can be one object or array of objects
app.delete('/app/item/:itemId', item.DeleteItem); // delete item by id

//Endponts for Sellers on Stocks
app.get('/app/stock/:stockId', stock.GetStockByID); //Get my Stock by id
app.get('/app/stocks/all', stock.GetMyAllStocks); //Get my all Stocks
app.get('/app/stocks/active', stock.GetMyActiveStocks); //Get all my active Stocks
app.get('/app/stocks/inactive', stock.GetMyInactiveStocks) //Get all my inactive
app.get('/app/stock/expirein/:stockId', stock.GetStockByID); //Get my Stock by id
app.post('/app/stock', stock.AddStock); //add Stocks.. payload can be one object or array of objects
app.put('/app/stock', stock.UpdateStock); //update Stocks.. payload can be one object or array of objects
app.delete('/app/stock/:stockId', stock.DeleteStock); // delete Stock by id
//Get sellers expire stocks by time
app.get('/app/stock/checkexpire/day/:no', stock.GetStocksExpireInDays);
app.get('/app/stock/checkexpire/week/:no', stock.GetStocksExpireInWeeks);
app.get('/app/stock/checkexpire/month/:no', stock.GetStocksExpireInMonths);



app.listen(3000);