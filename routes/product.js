//import express from 'express';        ( "type": "module" in package.json)
const express = require('express');
const router = express.Router();
const { auth,isAdmin } = require('../middleware/auth');

const { addProduct,getProducts,getProduct,deleteProduct,updateProduct } = require('../controllers/product');

router.post('/',auth, isAdmin, addProduct);

router.get('/', getProducts);

router.get('/:id', getProduct);

router.delete('/:id', deleteProduct);

router.patch('/:id', updateProduct);

//export default router;
module.exports = router;