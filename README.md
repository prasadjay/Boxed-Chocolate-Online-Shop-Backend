# Boxed-Chocolate-Online-Shop-Backend
Backend modules for Boxed Chocolate Online Shop

This app uses OAuth specifications to login and API authentication.
To change JWT token sign key change "signingKey" property inside "/config/default.js" file.
To change how much time a session should be valid change "maxSessionTime" property inside "/config/default.js" file.

All the API call structures and sample payloads are provided in the Postman collection file located at:
/postman_collection/CakeShop-PrasadJayashanka.postman_collection.json


To run the app properly Database should be structured. To do that call following with admin access token found in "access_token" property inside "/config/default.js" file.
http://<host>:3000/app/db/setup?access_token=<admin_access_token>


Can use with either MySQL, Postgres databases. Specify your database configrations inside "/config/default.js" file. Or if you want to load everything from ENV vars then put ENV var names on "/config/custom-environment-variables.js" file.


Following APIs are meant for UI so no authentication for that since "there was no requirement mentioned for customer signin"
/app/global/items'
/app/global/order'
/app/global/order/:orderId
/app/global/order


All other APIs other than register and login requires a OAuth2 verified JWT token.
Token should be provided as a value to header token "Authorization" 

Flow:
1) Register
2) Login - In here with a successful login you will receive a JWT token in the response message's "data" field.
3) Use that token as the value for header token "Authorization" when calling other APIs such as create item.