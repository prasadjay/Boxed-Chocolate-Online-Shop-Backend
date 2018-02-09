const Sequelize = require('sequelize');
const response = require("./../common/response");
const dbModels = require("./../database/models");
const config = require("config");

module.exports.setup = (req, res) => {

    if (req.query.access_token == config.auth.access_token) {

        const sequelize = new Sequelize(config.db.type, config.db.username, config.db.password, {
            host: config.db.host,
            dialect: config.db.type,

            pool: {
                max: config.db.maxConectionsNo,
                min: config.db.minConnectionsNo,
                acquire: config.db.maxSetupTime,
                idle: config.db.maxIdleTime
            },
        });

        sequelize.query(`CREATE DATABASE IF NOT EXISTS ${config.db.database};`).then((data) => {
                dbModels.user.sync({alter: true}).then((data) => {
                    dbModels.item.sync({alter: true}).then((data) => {
                        dbModels.stock.sync({alter: true}).then((data) => {
                            dbModels.order.sync({alter: true}).then((data) => {
                                res.send(response.Success("Successfully setup database", undefined));
                            }).catch((error) => {
                                res.status(400);
                                res.send(response.Error("Error setting up database", error));
                            });
                        }).catch((error) => {
                            res.status(400);
                            res.send(response.Error("Error setting up database", error));
                        });
                    }).catch((error) => {
                        res.status(400);
                        res.send(response.Error("Error setting up database", error));
                    });
                }).catch((error) => {
                    res.status(400);
                    res.send(response.Error("Error setting up database", error));
                });
            }
        ).catch((error) => {
            res.status(400);
            res.send(response.Error("Error setting up database", error));
        });
    } else {
        res.status(400);
        res.send(response.Error("No access token found. Please append admin access token ex : http://localhost:3000/app/db/setup?access_token=12345", undefined));
    }
}


