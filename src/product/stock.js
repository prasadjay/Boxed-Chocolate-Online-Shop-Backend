const auth = require("./../auth/auth");
const dbModels = require("./../database/models");
const response = require("./../common/response");
const Promise = require('bluebird');
const Sequelize = require('sequelize');
const moment = require('moment');

module.exports.AddStock = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        let user = data.data.body;
        let StockArray = [];
        if (!Array.isArray(req.body)) {
            let singleStock = req.body;
            singleStock.user = user.email;
            StockArray.push(singleStock);
        } else {
            for (let singleStock of req.body) {
                singleStock.user = user.email;
                StockArray.push(singleStock);
            }
        }

        //insert to db
        dbModels.stock.bulkCreate(StockArray).then((data) => {
            res.send(response.Success("Successfully inserted Stocks.", data));
        }).catch((err) => {
                res.status(400);
                res.send(response.Error(err.message, err));
            }
        )
    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err.data));
    });
}

module.exports.UpdateStock = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        let user = data.data.body;
        let StockArray = [];
        if (!Array.isArray(req.body)) {
            let singleStock = req.body;
            singleStock.user = user.email;
            StockArray.push(singleStock);
        } else {
            for (let singleStock of req.body) {
                singleStock.user = user.email;
                StockArray.push(singleStock);
            }
        }

        //insert to db
        dbModels.stock.bulkCreate(StockArray, {updateOnDuplicate: true}).then((data) => {
            res.send(response.Success("Successfully updated Stocks.", data));
        }).catch((err) => {
                res.status(400);
                res.send(response.Error(err.message, err));
            }
        )
    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err.data));
    });
}

module.exports.GetStockByID = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        let user = data.data.body;

        dbModels.stock.findAll({
            where: {
                [Sequelize.Op.and]: [{user: user.email}, {stockId: req.params.stockId}]
            }
        }).then((data) => {
            res.send(response.Success("Fetching Stocks successfull.", data));
        }).catch((err) => {
            res.status(400);
            res.send(response.Error(err.message, err));
        })

    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err.data));
    });
}

module.exports.GetMyActiveStocks = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        let user = data.data.body;

        dbModels.stock.findAll({
            where: {
                [Sequelize.Op.and]: [{user: user.email}, {active: true}]
            }
        }).then((data) => {
            res.send(response.Success("Fetching active Stocks successfull.", data));
        }).catch((err) => {
            res.status(400);
            res.send(response.Error(err.message, err));
        })

    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err.data));
    });
}

module.exports.GetMyInactiveStocks = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        let user = data.data.body;

        dbModels.stock.findAll({
            where: {
                [Sequelize.Op.and]: [{user: user.email}, {active: false}]
            }
        }).then((data) => {
            res.send(response.Success("Fetching inactive Stocks successfull.", data));
        }).catch((err) => {
            res.status(400);
            res.send(response.Error(err.message, err));
        })

    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err.data));
    });
}

module.exports.GetMyAllStocks = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        let user = data.data.body;

        dbModels.stock.findAll({
            where: {
                user: user.email
            }
        }).then((data) => {
            res.send(response.Success("Fetching all Stocks successfull.", data));
        }).catch((err) => {
            res.status(400);
            res.send(response.Error(err.message, err));
        })

    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err.data));
    });
}

module.exports.DeleteStock = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        let user = data.data.body;

        dbModels.stock.destroy({
            where: {
                [Sequelize.Op.and]: [{user: user.email}, {stockId: req.params.stockId}]
            }
        }).then((data) => {
            res.send(response.Success("Deleting Stocks successfull.", data));
        }).catch((err) => {
            res.status(400);
            res.send(response.Error(err.message, err));
        })

    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err.data));
    });
}

module.exports.GetStocksExpireInWeeks = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        let user = data.data.body;
        let no = req.params.no;
        let nowDate = Date.now();
        let newDate = moment(nowDate).add(no, 'week');

        dbModels.stock.findAll({
            where: {
                [Sequelize.Op.and]:[{
                    expireAt: {
                        [Sequelize.Op.lt]: newDate
                    }
                }, {user: user.email}]
            }
        }).then((data) => {
            res.send(response.Success("Fetching expirey Stocks in number of weeks successfull.", data));
        }).catch((err) => {
            res.status(400);
            res.send(response.Error(err.message, err));
        })

    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err.data));
    });
}

module.exports.GetStocksExpireInMonths = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        let user = data.data.body;
        let no = req.params.no;
        let nowDate = Date.now();
        let newDate = moment(nowDate).add(no, 'month');

        dbModels.stock.findAll({
            where: {
                [Sequelize.Op.and]:[{
                    expireAt: {
                        [Sequelize.Op.lt]: newDate
                    }
                }, {user: user.email}]
            }
        }).then((data) => {
            res.send(response.Success("Fetching expirey Stocks in number of months successfull.", data));
        }).catch((err) => {
            res.status(400);
            res.send(response.Error(err.message, err));
        })

    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err.data));
    });
}

module.exports.GetStocksExpireInDays = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        let user = data.data.body;
        let no = req.params.no;
        let nowDate = Date.now();
        let newDate = moment(nowDate).add(no, 'day');

        dbModels.stock.findAll({
            where: {
                [Sequelize.Op.and]:[{
                    expireAt: {
                        [Sequelize.Op.lt]: newDate
                    }
                }, {user: user.email}]
            }
        }).then((data) => {
            res.send(response.Success("Fetching expirey Stocks in number of days successfull.", data));
        }).catch((err) => {
            res.status(400);
            res.send(response.Error(err.message, err));
        })

    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err.data));
    });
}