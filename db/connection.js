const mongoose = require('mongoose');

//Connect to DB
mongoose.connect(
    process.env.DATABASE_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, 
    () => console.log('Connected to Database...')
).catch(error => console.log(error.reason));