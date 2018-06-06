"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Recipe = /** @class */ (function () {
    function Recipe(name, desc, imagePath, ingredients) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
    return Recipe;
}());
exports.Recipe = Recipe;
