const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');
//Handle get product requests
router.get('/', (req, res, next) => {
    res.status(200).json({
        message:"Handling GET requests to /products"
    });
});

//Handle post product requests
router.post("/", (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err=>console.log(err));
    res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: product
    });
});
//Hanldle specific product
router.get('/:productId', (req, res, next) => {
   const id = req.params.productId;
   Product.findById(id)
       .exec()
       .then(doc=>{
           console.log("From database", doc);
           res.status(200).json(doc);
       })
       .catch(err => {
           console.log(err);
           res.status(500).json({error:err});
       });
});

//Handle patch request
router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message:'Youve updated your product'
    });
});
router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message:'Youve deleted your product'
    });
});

module.exports = router;