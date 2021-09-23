const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
      },
      dateCreated: {
        type: Date,
        required: true,
        default: Date.now
      },
      dateCompleted:{
        type: Date,
        required: false,
      }
});


module.exports = Item = mongoose.model('item', ItemSchema);