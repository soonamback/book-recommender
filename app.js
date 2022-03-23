const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
const userRouter = require('./src/routes/userRoutes');
const bookRouter = require('./src/routes/bookRoutes');

// app.use((req, res, next) => 
// {
//     console.log('this is a middleware')
//     next();
// })

// app.use((req,res, next) =>
// {
//     req.requestTime = new Date().toISOString();
//     next()
// })



app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);
module.exports = app;