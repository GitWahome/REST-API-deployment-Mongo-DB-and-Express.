const mongoose = require('mongoose');
/*
This will give structure to the different requests.
We make use of mongoose models to do so/
We will for instance define how a product should look like in tbis model.
*/

//When defining the schema object, we state the identifying key and type.
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoose.model('Product', productSchema);