const Sequelize = require('sequelize');
const dbCon = require("./../database/connection").sequelize;


const user = dbCon.define('user', {
    email: { type: Sequelize.STRING, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false },
    username: { type: Sequelize.STRING, allowNull: false, unique:true },
    password: { type: Sequelize.STRING, allowNull: false },
    userType: { type: Sequelize.STRING, defaultValue: "seller" },
    passportNo: { type: Sequelize.STRING, unique: true, allowNull:false },
    country: { type: Sequelize.STRING, unique: false, allowNull:true },
    contactNo: { type: Sequelize.STRING, unique: false, allowNull:true }
})

const item = dbCon.define('item', {
    itemId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement:true},
    name: { type: Sequelize.STRING, allowNull: false },
    brand: { type: Sequelize.STRING, allowNull: false},
    country: { type: Sequelize.STRING},
    flavor: { type: Sequelize.STRING},
    cocoaContent: { type: Sequelize.STRING},
    alcoholContent: { type: Sequelize.STRING},
    weight: { type: Sequelize.FLOAT},
    unitPrice: { type: Sequelize.DECIMAL(10, 2), allowNull:false },
    imageUrl: { type: Sequelize.STRING},
    user: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: user,
            key: 'email',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    active: {type:Sequelize.BOOLEAN, defaultValue:true}
})

const stock = dbCon.define('stock', {
    stockId: { type: Sequelize.INTEGER, primaryKey:true, autoIncrement: true },
    itemId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: item,
            key: 'itemId',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    user: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: user,
            key: 'email',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    noOfUnits: { type: Sequelize.INTEGER, allowNull: false },
    expireAt: { type: Sequelize.DATE},
    shipBestBefore: { type: Sequelize.ENUM('any','week', 'month')}, // when will max shippable timeframe expire.. if any ignores and only wont ship after expiring. week will stop shipping a week before expiry date.
    active: {type:Sequelize.BOOLEAN, defaultValue:true}
})

const order = dbCon.define('order', {
    orderId: { type: Sequelize.INTEGER, primaryKey:true, autoIncrement: true },
    itemId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: item,
            key: 'itemId',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    stockId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: stock,
            key: 'stockId',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    noOfUnits: { type: Sequelize.INTEGER, allowNull: false },
    customerName: { type: Sequelize.STRING, allowNull: false },
    customerAddress: { type: Sequelize.STRING, allowNull: false },
    customerPhone: { type: Sequelize.STRING, allowNull: false },
    customerEmail: { type: Sequelize.STRING, allowNull: false },
    subTotal: { type: Sequelize.DECIMAL(10, 2), allowNull: false }
})

module.exports.user = user;
module.exports.item = item;
module.exports.stock = stock;
module.exports.order = order;