var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({


    name: {type: String, required: true},
    amount: {type: Number, required: true}
});

module.exports = mongoose.model('ShoppingListIng', schema);