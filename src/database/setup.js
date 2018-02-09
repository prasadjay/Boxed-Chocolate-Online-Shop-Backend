const response = require("./../common/response");
const dbModels = require("./../database/models");

module.exports.setup = (req, res) => {
    dbModels.user.sync({alter:true}).then((data)=>{
        dbModels.item.sync({alter:true}).then((data)=>{
            dbModels.stock.sync({alter:true}).then((data)=>{
                res.send(response.Success("Successfully setup database", undefined));
            }).catch((error)=>{
                res.status(400);res.send(response.Error("Error setting up database", error));
            });
        }).catch((error)=>{
            res.status(400);res.send(response.Error("Error setting up database", error));
        });
    }).catch((error)=>{
        res.status(400);res.send(response.Error("Error setting up database", error));
    });
}


