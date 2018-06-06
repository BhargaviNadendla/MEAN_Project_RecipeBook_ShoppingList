
var express = require('express');
var router = express.Router();

var Recipe = require('../models/recipe');

router.get('/', (req,res,next) => {
    Recipe.find()
        .exec((err, recipes)=> {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: recipes
            });
        });

});

router.post('/', function (req, res, next) {

        var recipe = new Recipe({
            name: String,
            imagePath: String,
            description: String,
            ingredients: []
        });
        recipe.name = req.body.name;
        recipe.imagePath = req.body.imagePath;
        recipe.description = req.body.description;
        for(var i=0; i<req.body.ingredients.length; i++) {
            recipe.ingredients[i] = {name: req.body.ingredients[i].name, amount: req.body.ingredients[i].amount}
        }



    recipe.save(function(err, result){
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