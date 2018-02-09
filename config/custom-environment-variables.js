module.exports = {
    "db":
        {
            "type" : "ENV_DB_TYPE",
            "host": "ENV_DB_HOST",
            "username": "ENV_DB_USERNAME",
            "password": "ENV_DB_PASSWORD",
            "database": "ENV_DB_DATABASE",
            "maxConectionsNo": "ENV_DB_MAXCONS",
            "minConnectionsNo": "ENV_DB_MINCONS",
            "maxSetupTime": "ENV_DB_MAXSETUPTIME",
            "maxIdleTime": "ENV_DB_MAXIDLETIME"
        },
    "auth":{
        "signingKey": "ENV_AUTH_SIGNKEY",
        "maxSessionTime": "ENV_AUTH_MAXSESSIONTIME" //in hours.. this will invalidate your session key in defined hours
    }
};
