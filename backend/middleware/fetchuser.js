// module for jwt 
var jwt = require('jsonwebtoken');
require("dotenv").config();

const fetchUser = (req, res, next) => {
    // Get user data using jwt token
    const token = req.header('auth-token');

    if (!token) {
        res.status(401).send("Unauthorized:No token provided");
    }

    try {
        const data = jwt.verify(token, SECRET_KEY);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send("Unauthorized:No token provided");
    }

}

module.exports = fetchUser;