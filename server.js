const express = require('express')
const mongoose = require('mongoose')
const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user')
const path = require('path')
const config = require('./config')
const dotenv = require('dotenv')

const app = express()
dotenv.config({ path: './.env' })

const { development_db: { host, port, name } } = config

mongoose.connect(`mongodb://${host}:${port}/${name}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('connected successfully to the database'))
    .catch((error) => console.log(error, 'failed to connect to the database'))

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json())

// set response headers for CORS (Cross Origin Ressource Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

console.log("test de jen")

//app.user(bodyParser.json())
app.use('/api/thing', stuffRoutes)
app.use('/api/auth', userRoutes)


module.exports = app