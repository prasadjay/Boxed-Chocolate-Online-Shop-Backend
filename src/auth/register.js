const response = require("./../common/response");
const common = require("./../common/common");
const regex = require('regex-email');
const dbModels = require("./../database/models");
const Sequelize = require('sequelize');


module.exports.Register = (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    let name = req.body.name;
    let passportno = req.body.passportno;
    let country = req.body.country;
    let contactno = req.body.contactno;
    let username = req.body.username;
    let password = req.body.password;

    if (regex.test(email)) {
        dbModels.user.create({
            email: email,
            name: name,
            username: username,
            password: common.GetMD5Hash(password),
            passportNo: passportno,
            country: country,
            contactNo: contactno
        }).then((data) => {
            res.send(response.Success("Successfully registered.", data));
        }).catch((err) => {
                res.status(400);
                res.send(response.Error(err.message, err));
            }
        )
    } else {
        res.status(400);
        res.send(response.Error("Invalid email.", undefined));
    }
}


