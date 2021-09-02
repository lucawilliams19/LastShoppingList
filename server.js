//dependencies
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

//built components
const items = require('./routes/api/items')

const app = express()

//Body parser Middleware
app.use(bodyParser.json())

//DB config
const db = require('./config/keys').mongoURI;

//connect to Mongo
mongoose
.connect(db)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

//Use Routes
app.use('/api/items', items);

//serve static assests if in production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(espress.static('client/build'))

    //loads this protocal unless a api interaction occurs with '/api/items'
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// sets port designation as 5000
const port = process.env.PORT || 5000;

//console readout that port is working correctly
app.listen(port, () => console.log(`Server started on port ${port}`));