
const userModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken')

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                message: "Not authorized, no token"
            });
        }
        const token = authHeader.split(" ")[1]; 
        if (!token) {
            return res.status(401).json({
                message: "Not authorized, no token"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded.id).select("-password");
        next();

    } catch (error) {
        res.status(401).json({
            message: "Token invalid"
        });
    }
}

module.exports = { protect };