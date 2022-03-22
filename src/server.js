require('dotenv').config();
const dotenv = require('dotenv');

const mongoose = require('mongoose');
const app = require('../app');
const bodyParser = require('body-parser');

const port = process.env.PORT;
const databaseUrl = `${ process.env.DB_URL}/${process.env.DB_NAME } `;
const DB = mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => console.log('DB Connection successful'));
console.log(databaseUrl);
app.listen(port, () =>{
    console.log(`App running on PORT ${port}`);
})