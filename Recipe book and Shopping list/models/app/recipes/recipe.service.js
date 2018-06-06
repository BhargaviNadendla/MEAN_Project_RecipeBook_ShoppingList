"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var shopping_list_service_1 = require("../shopping-list/shopping-list.service");
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var recipe_model_1 = require("./recipe.model");
var http_1 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/Rx");
var RecipeService = /** @class */ (function () {
    function RecipeService(slService, http) {
        this.slService = slService;
        this.http = http;
        this.recipesChanged = new Subject_1.Subject();
        this.recipes = [];
    }
    RecipeService.prototype.getRecipes = function () {
        var _this = this;
        return this.http.get('http://localhost:3000/recipes/new')
            .map(function (response) {
            var recipes = response.obj;
            var transformedRecipes = [];
            for (var _i = 0, recipes_1 = recipes; _i < recipes_1.length; _i++) {
                var recipe = recipes_1[_i];
                transformedRecipes.push(new recipe_model_1.Recipe(recipe.name, recipe.description, recipe.imagePath, recipe.ingredients));
            }
            _this.recipes = transformedRecipes;
            console.log(_this.recipes);
            return transformedRecipes;
        })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    RecipeService.prototype.getRecipe = function (index) {
        return this.recipes[index];
    };
    RecipeService.prototype.addIngredientsToShoppingList = function (ingredients) {
        this.slService.addIngredients(ingredients);
    };
    RecipeService.prototype.addRecipe = function (recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
        var body = JSON.stringify(recipe);
        console.log(body);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post('http://localhost:3000/recipes/new', body, { headers: headers })
            .catch(function (error) { return Observable_1.Observable.throw(error); }); // in HTTPClient, no need to parse error and responde since tehyare json by default
    };
    RecipeService.prototype.updateRecipe = function (index, newRecipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    };
    RecipeService.prototype.deleteRecipe = function (index) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    };
    RecipeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [shopping_list_service_1.ShoppingListService, http_1.HttpClient])
    ], RecipeService);
    return RecipeService;
}());
exports.RecipeService = RecipeService;
