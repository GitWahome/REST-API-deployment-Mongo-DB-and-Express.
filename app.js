const express = require('express');
const mongoose = require('mongoose');
const app = express();

/*See morgan logger documentation here:
 https://www.npmjs.com/package/morgan*/
const morgan = require('morgan');
/*See body parser request body parse documentation here:
* https://www.npmjs.com/package/body-parser*/
const bodyParser = require('body-parser');


//Set headers that will be used to facilitate client requests
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    /* This is telling the server to allow the client to run all the listed methods.
     * The browser always initiates communication with an options check method.
     * It will only proceed if the method posted is allowed by the server
     * */

    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    };
    next();
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
/* These are middleware functions that direct the data/requests
* to the right handler,
* See more info on middleware in express documentation
* https://expressjs.com/en/guide/writing-middleware.html
*/

//Now to connect to the database.
const mongoUrl = "mongodb+srv://brianwahome254:"+process.env.MONGO_ATLAS_PW+"@cluster0-emrbs.mongodb.net/test?retryWrites=true"
mongoose.connect(mongoUrl,{useNewUrlParser:true});

//Routes that should direct requests based on filters.
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
//Parse the request body.


//Any requests that make it past the two functions can be assumed to be errors.
//We need no filter in this regard.
//This is our Not Found error catcher.
app.use((req, res, next) => {
    const error = new Error('Not Found');
    //console.log(res.body);
    error.status = 404;
    next(error);
});

//This one will be the General error handler and renderer.
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;
