const nJwt = require('njwt');
const config = require("config");
const response = require("./../common/response");

module.exports.CreateJWT = (data) => {
    var claims = {
        iss: "http://boxedchocolateonline.com/",
        sub: data.email,
        scope: data.type,
        name: data.name,
        country: data.country,
        contactno: data.contactNo,
        username: data.username,
        email: data.email,
        passportno: data.passportNo
    }
    let jwt = nJwt.create(claims, config.auth.signingKey);
    jwt.setExpiration(new Date().getTime() + (config.auth.maxSessionTime*60*60*1000));
    return jwt.compact();
}

module.exports.ValidateJWT = (req) => {
    return new Promise(function (resolve, reject) {
        if (req.headers.hasOwnProperty("authorization")) {
            nJwt.verify(req.headers.authorization, config.auth.signingKey, (err, verifiedJwt) => {
                if (err) {
                    reject(response.Error("Invalid access token.", err));
                } else {
                    resolve(response.Success("Successfully validated access token.", verifiedJwt));
                }
            });
        } else {
            reject(response.Error("No token found. Please supply JWT token in Authorization header. ex: Authorization : <JWT>", undefined));
        }
    })
}