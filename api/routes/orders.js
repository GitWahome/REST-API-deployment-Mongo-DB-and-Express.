const express = require('express');
const router = express.Router();

//Handle get orders requests
router.get('/', (req, res, next) => {
    res.status(200).json({
        message:"Orders were fetched"
    });
});

//Handle post orders requests
router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message:"Order was created",
        order:order
    });
});

//Handle post orders requests
router.get('/:orderId', (req, res, next) => {
    res.status(201).json({
        message:"Order details",
        orderId: req.params.orderId
    });
});
//Handle post orders requests
router.delete('/:orderId', (req, res, next) => {
    res.status(201).json({
        message:"Order deleted",
        orderId: req.params.orderId
    });
});


module.exports = router;