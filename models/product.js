const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
 });


 module.exports = mongoose.model('Product', productSchema);