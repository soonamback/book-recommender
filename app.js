const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

const userRouter = require('./src/routes/userRoutes');

app.use((req, res, next) => 
{
    console.log('this is a middleware')
    next();
})

app.use((req,res, next) =>
{
    req.requestTime = new Date().toISOString();
    next()
})

app.use('/api/users', userRouter);
module.exports = app;