const Sequelize = require('sequelize');
const config = require("config");

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: config.db.type,

    pool: {
        max: config.db.maxConectionsNo,
        min: config.db.minConnectionsNo,
        acquire: config.db.maxSetupTime,
        idle: config.db.maxIdleTime
    },
});

module.exports.sequelize = sequelize;