const auth = require("./../auth/auth");
const dbModels = require("./../database/models");
const response = require("./../common/response");
const Promise = require('bluebird');
const Sequelize = require('sequelize');

module.exports.AddItem = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        let user = data.data.body;
        let itemArray = [];
        if (!Array.isArray(req.body)) {
            let singleItem = req.body;
            singleItem.user = user.email;
            itemArray.push(singleItem);
        } else {
            for (let singleItem of req.body) {
                singleItem.user = user.email;
                itemArray.push(singleItem);
            }
        }

        //insert to db
        dbModels.item.bulkCreate(itemArray).then((data) => {
            res.send(response.Success("Successfully inserted items.", data));
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

module.exports.UpdateItem = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        let user = data.data.body;
        let itemArray = [];
        if (!Array.isArray(req.body)) {
            let singleItem = req.body;
            singleItem.user = user.email;
            itemArray.push(singleItem);
        } else {
            for (let singleItem of req.body) {
                singleItem.user = user.email;
                itemArray.push(singleItem);
            }
        }

        //insert to db
        dbModels.item.bulkCreate(itemArray, {updateOnDuplicate: true}).then((data) => {
            res.send(response.Success("Successfully updated items.", data));
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

module.exports.GetItemByID = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        let user = data.data.body;

        dbModels.item.findAll({
            where: {
                [Sequelize.Op.and]: [{user: user.email}, {itemId: req.params.itemId}]
            }
        }).then((data) => {
            res.send(response.Success("Fetching items successfull.", data));
        }).catch((err) => {
            res.status(400);
            res.send(response.Error(err.message, err));
        })

    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err.data));
    });
}

module.exports.GetMyActiveItems = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        let user = data.data.body;

        dbModels.item.findAll({
            where: {
                [Sequelize.Op.and]: [{user: user.email}, {active: true}]
            }
        }).then((data) => {
            res.send(response.Success("Fetching active items successfull.", data));
        }).catch((err) => {
            res.status(400);
            res.send(response.Error(err.message, err));
        })

    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err.data));
    });
}

module.exports.GetMyInactiveItems = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        let user = data.data.body;

        dbModels.item.findAll({
            where: {
                [Sequelize.Op.and]: [{user: user.email}, {active: false}]
            }
        }).then((data) => {
            res.send(response.Success("Fetching inactive items successfull.", data));
        }).catch((err) => {
            res.status(400);
            res.send(response.Error(err.message, err));
        })

    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err.data));
    });
}

module.exports.GetMyAllItems = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        let user = data.data.body;

        dbModels.item.findAll({
            where: {
                user: user.email
            }
        }).then((data) => {
            res.send(response.Success("Fetching all items successfull.", data));
        }).catch((err) => {
            res.status(400);
            res.send(response.Error(err.message, err));
        })

    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err.data));
    });
}

module.exports.DeleteItem = (req, res) => {
    auth.ValidateJWT(req).then((data) => {
        let user = data.data.body;

        dbModels.item.destroy({
            where: {
                [Sequelize.Op.and]: [{user: user.email}, {itemId: req.params.itemId}]
            }
        }).then((data) => {
            res.send(response.Success("Deleting items successfull.", data));
        }).catch((err) => {
            res.status(400);
            res.send(response.Error(err.message, err));
        })

    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err.data));
    });
}


//Global methods for website
module.exports.GetAllItems = (req, res) => {
    dbModels.item.findAll({
        where: {
            active: true
        }
    }).then((data) => {
        res.send(response.Success("Fetching all items successfull.", data));
    }).catch((err) => {
        res.status(400);
        res.send(response.Error(err.message, err));
    })
}