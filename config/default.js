module.exports = {
    "db":
        {
            "type" : "mysql",
            "host": "localhost",
            "username": "root",
            "password": "1234",
            "database": "chocolateshop",
            "maxConectionsNo": 30,
            "minConnectionsNo": 0,
            "maxSetupTime": 30000,
            "maxIdleTime": 10000
        },
    "auth":{
            "signingKey": "iu2gtr24398tgohifugvf34ufv3utf",
            "maxSessionTime": 12, //in hours.. this will invalidate your session key in defined hours
            "access_token": "admin123" //access token to call setupdb method
    }
};
