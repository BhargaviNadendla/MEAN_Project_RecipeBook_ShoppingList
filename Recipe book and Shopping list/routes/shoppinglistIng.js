
var express = require('express');
var router = express.Router();

var ShoppingListIng = require('../models/shoppingListIng');


router.get('/', (req,res,next) => {
    ShoppingListIng.find()
        .exec((err, ingredients)=> {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: ingredients
            });
        });

});



router.post('/', function (req, res, next) {

    var shoppingListIng = new ShoppingListIng({

        name: String,
        amount: Number
    });
    shoppingListIng.name = req.body.name;
    shoppingListIng.amount = req.body.amount;
    console.log("Hello");

    /*ShoppingListIng.find().exec(function (err, results) {
        var count = results.length;
        console.log(count);

    });*/


    shoppingListIng.save(function(err, result){
        if(err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved message',
            obj: result
        });

    });
});





module.exports = router;