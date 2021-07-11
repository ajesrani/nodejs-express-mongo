const jwt = require('jsonwebtoken');
const User = require('../models/user');

//function auth (req,res,next) {
const auth = async(req,res,next) => {
    const token = req.header('Authorization');
    //var token = req.body['x-access-token'] || req.query['x-access-token'] || req.header['x-access-token'];
    if(!token) return res.status(401).send('Access Denied');

    try{
        const decode = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(decode);
        const user = await User.findOne({_id: decode._id, tokens: token});
        if(!user)
            throw new Error();
        req.user = user;
        req.token = token;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

const isAdmin = async(req,res,next) => {
    try{
        if (req.user && req.user.isAdmin)
            return next();
    }catch(err){
        res.status(400).send('Not Admin');
    }
}

module.exports = auth;
module.exports = isAdmin;