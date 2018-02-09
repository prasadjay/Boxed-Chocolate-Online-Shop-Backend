const auth = require("./../auth/auth");
const dbModels = require("./../database/models");
const response = require("./../common/response");
const Promise = require('bluebird');
const Sequelize = require('sequelize');
const moment = require('moment');


module.exports.PlaceOrder = (req, res) => {
    let orderItem = {
        itemId : req.body.itemId,
        noOfUnits: req.body.noOfUnits,
        customerName: req.body.customerName,
        customerAddress: req.body.customerAddress,
        customerPhone: req.body.customerPhone,
        customerEmail: req.body.customerEmail
    }

    var item;

    //Get item
    dbModels.item.findAll({
        where: {
            itemId: orderItem.itemId
        }
    }).then((data) => {
        if (data.length >0){
            item = data[0];
            let now = Date.now();
            //get all stocks for that item.
            dbModels.stock.findAll({
                order: [
                    ['expireAt', 'ASC']
                ],
                where: {
                    [Sequelize.Op.and]:[{
                        expireAt: {
                            [Sequelize.Op.gt]: now
                        }
                    }, {itemId: orderItem.itemId}, {active: true}]
                },
            }).then((data) => {
                if (data.length>0) {
                    //traverse through items and
                    let stockItem = {};
                    for (let singleStock of data) {
                        if (singleStock.shipBestBefore == "any"){
                            stockItem = singleStock;
                            break;
                        }else{
                            let nowDate;
                            if (singleStock.shipBestBefore == "week") {
                                let newDate = moment(singleStock.expireAt).subtract(1, 'week');
                                if (moment(nowDate).isBefore(newDate)){
                                    stockItem = singleStock;
                                    break;
                                }
                            }else if (singleStock.shipBestBefore == "month") {
                                let newDate = moment(singleStock.expireAt).subtract(1, 'month');
                                if (moment(nowDate).isBefore(newDate)){
                                    stockItem = singleStock;
                                    break;
                                }
                            }else{
                                stockItem = singleStock;
                                break;
                            }
                        }
                    }

                    if (Object.keys(stockItem).length === 0 ){
                        res.status(400);
                        res.send(response.Error("No shipping ready stock was found for provided itemId"));
                    }else{
                        orderItem.stockId = stockItem.stockId;
                        orderItem.subTotal = item.unitPrice * orderItem.noOfUnits;

                        dbModels.order.create(orderItem).then((data) => {
                            res.send(response.Success("Successfully placed an order.", orderItem));
                        }).catch((err) => {
                                res.status(400);
                                res.send(response.Error(err.message, err));
                            }
                        )
                    }
                }else{
                    res.status(400);
                    res.send(response.Error("No stock was found for provided itemId"));
                }
            }).catch((err) => {
                res.status(400);
                res.send(response.Error(err.message, err));
            })
        }else{
            res.status(400);
            res.send(response.Error("No item was found by provided itemId"));
        }
    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err));
    })
}

module.exports.GetAllOrders = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        dbModels.order.findAll({}).then((data) => {
            res.send(response.Success("Fetching all orders successfull.", data));
        }).catch((err) => {
            res.status(400);
            res.send(response.Error(err.message, err));
        })

    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err.data));
    });
}

module.exports.GetOrderById = (req, res) => {
    auth.ValidateJWT(req).then((data) => {

        dbModels.order.findAll({
            where: {
                orderId: req.params.orderId
            }
        }).then((data) => {
            res.send(response.Success("Fetching order by ID successfull.", data));
        }).catch((err) => {
            res.status(400);
            res.send(response.Error(err.message, err));
        })

    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err.data));
    });
}