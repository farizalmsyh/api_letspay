const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const {jwtSecretKey} = require('../config');

module.exports = (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).send({error: "You must be logged in !"});
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token, jwtSecretKey, async (err, payload) => {
        if (err) {
            return res.status(401).send({error: "You must logged in !"});
        }
        const {userId} = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    });
}