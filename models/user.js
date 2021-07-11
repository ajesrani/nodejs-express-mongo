const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Product = require('./product');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Email Provided is incorrect')
        }
    },
    password: {
        type: String,
        required: true
    },
    tokens:[{
        type: String,
        required: true
    }]
 });

 userSchema.virtual('products', {
     ref: 'Product',
     localField: '_id',
     foreignField: 'user'
 })

/*userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
 })*/

 /*userSchema.pre('deleteOne', async function(next) {
    const user = this
    const deleted = await Product.deleteMany({user: user._id})
    next();
 })*/

 /*userSchema.statics.findByCredentials = async (email,password) => {

 }*/

/*userSchema.methods.generateAuthToken = async() => {

 }*/

 /*userSchema.methods.toJSON = function() {
    const user = this.toObject()
    delete user.password
    delete user.tokens
    return user;
 }*/

 module.exports = mongoose.model('User', userSchema);