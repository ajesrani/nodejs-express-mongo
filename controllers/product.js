const Product = require('../models/product');

const addProduct = async (req,res) => {
    //const obj = new Product({title: 'Bed',description: 'Home'})
    //const obj = new Product(req.body)
    const obj = new Product({...req.body,user: req.user._id})
    /*const obj = new Product({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        user: req.user._id
    });*/

    try {
        const product = await obj.save();
        res.json(product);
    } catch(err) {
        res.json({message: err});
    }

    /*product.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({message: err});
    })*/
}

const getProducts = async (req,res) => {
    try {
        const product = await Product.find()
        //.find({priority: {$gt: 4}})
        //.find({$or: [{priority: 5},{description: 'Letters'}]})
        .select('title description')
        .sort({title: 1})
        //.limit(5);
        res.json(product);
    } catch(err) {
        res.json({message: err});
    }
}

const getProduct = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        //const product = await Product.findOne({title: req.query.title});
        //await product.populate('user').execPopulate();
        res.json(product);
    } catch(err) {
        //res.send(err.message);
        res.json({message: err});
    }
}

const deleteProduct = async (req,res) => {
    try {
        //const product = await Product.findByIdAndDelete(req.params.id);
        const product = await Product.remove({_id: req.params.id});
        res.json(product);
    } catch(err) {
        res.json({message: err});
    }
}

const updateProduct = async (req,res) => {
    try {
        /*const product = await Product.findByIdAndUpdate(
            req.params.id, req.body, {new: true}
        );*/
        const product = await Product.updateOne(
            {_id: req.params.id},
            {$set: {title: req.body.title}}
        );
        res.json(product);
    } catch(err) {
        res.json({message: err});
    }
}

module.exports.addProduct = addProduct;
module.exports.getProducts = getProducts;
module.exports.getProduct = getProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProduct = updateProduct;
