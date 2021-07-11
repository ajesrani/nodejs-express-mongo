const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../middleware/auth');

router.post('/register', async (req,res) => {
    const emailExist = await User.findOne(
        {email: req.body.email}
    );
    if(emailExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashPswd = await bcrypt.hash(req.body.password, salt);

    const obj = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPswd
    });
    try{
        const user = await obj.save();
        //res.send(user);
        res.send({_id: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req,res) => {
    //const user = await User.findByCredentials(req.body.email,req.body.password);
    const user = await User.findOne(
        {email: req.body.email}
    );
    if(!user) return res.status(400).send('Invalid Email');
 
    const validPswd = await bcrypt.compare(req.body.password, user.password);
    if(!validPswd) return res.status(400).send('Invalid Password');
    //res.send(user);

    //const token = await user.generateAuthToken();
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: '48h'});
    user.tokens = user.tokens.concat(token);
    await user.save();
    res.send({user,token});

    //res.header('auth-token', token).send(token);

});

router.get('/private', auth, async (req,res) => {
    const user = req.user;
    //await user.populate('products').execPopulate();
    //console.log(user.products);
    res.send(user);
});

router.post('/logout', auth, async (req,res) => {
    const user = req.user;
    user.tokens = user.tokens.filter(token => token != req.token);
    //user.tokens = [];
    await user.save();
    res.send(user);
});

router.delete('/delete', auth, async (req,res) => {
    const user = await User.deleteOne({_id: req.user._id});
    res.send(user);
});

module.exports = router; 