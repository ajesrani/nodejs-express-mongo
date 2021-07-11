const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');

const app = express();
dotenv.config();

// DB connection
require('./db/connection');

//Middlewares
app.use(bodyparser.json());
app.use(cors());
//app.use(productRoute);
app.use('/api/product', productRoute);
app.use('/api/user', userRoute);

app.listen(5000);
