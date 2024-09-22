const jwt = require("jsonwebtoken");

//improve error handling ---18/09 9pm
const verifyToken = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.human = decoded;
        next();
    } catch (error) {
        res.status(401).json({error: "INVALID AUTHORIZATION! *token*"})
    }
}

module.exports = verifyToken