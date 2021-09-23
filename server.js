//dependencies
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')


const app = express()

//Body parser Middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//DB config
const db = config.get('mongoURI')

//connect to Mongo
mongoose
.connect(db, {
    useUnifiedTopology: true,
    useCreateIndexes: true,
    useNewUrlParser: true 

})// Adding new Mongo url parser
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

//Use Routes
app.use('/api/items', require('./routes/api/items'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

//serve static assests if in production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'))

    //loads this protocal unless a api interaction occurs with '/api/items'
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// sets port designation as 5000
const port = process.env.PORT || 5000;

//console readout that port is working correctly
app.listen(port, () => console.log(`Server started on port ${port}`));