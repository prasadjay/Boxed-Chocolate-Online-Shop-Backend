const regex = require('regex-email');
const dbModels = require("./../database/models");
const common = require("./../common/common");
const response = require("./../common/response");
const Sequelize = require('sequelize');
const auth = require("./auth");


module.exports.Login = (req,res) => {
    let user = req.body.user;
    let password = req.body.password;

    if (regex.test(user)){//email has been entered.
        dbModels.user.findAll({where: {
            [Sequelize.Op.and]: [{email: user}, {password: common.GetMD5Hash(password)}]
        }}).then((data)=>{
            if (data.length>0) {
                res.send(response.Success("Login Successful.", auth.CreateJWT(data[0])));
            }else{
                res.status(400); res.send(response.Error("Incorrect username or password.", undefined));
            }
        }).catch((err)=>{
            res.status(400);
            res.send(response.Error(err.message, err));
        })
    }else{//username has been entered.
        dbModels.user.findAll({where: {
            [Sequelize.Op.and]: [{username: user}, {password: common.GetMD5Hash(password)}]
        }}).then((data)=>{
            res.send(response.Success("Login Successful.", data));
        }).catch((err)=>{
            res.status(400);
            res.send(response.Error(err.message, err));
        })
    }


}