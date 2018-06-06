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
var ingredient_model_1 = require("../shared/ingredient.model");
var Subject_1 = require("rxjs/Subject");
var Observable_1 = require("rxjs/Observable");
var http_1 = require("@angular/common/http");
require("rxjs/Rx");
var core_1 = require("@angular/core");
var ShoppingListService = /** @class */ (function () {
    function ShoppingListService(http) {
        this.http = http;
        this.ingredientsChanged = new Subject_1.Subject();
        this.startedEditing = new Subject_1.Subject();
        this.ingredients = [];
    }
    ShoppingListService.prototype.getIngredients = function () {
        var _this = this;
        return this.http.get('http://localhost:3000/shopping-list')
            .map(function (response) {
            var ings = response.obj;
            var transformedIngs = [];
            for (var _i = 0, ings_1 = ings; _i < ings_1.length; _i++) {
                var ing = ings_1[_i];
                transformedIngs.push(new ingredient_model_1.Ingredient(ing.name, ing.amount));
            }
            _this.ingredients = transformedIngs;
            console.log(transformedIngs);
            return transformedIngs;
        })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    ShoppingListService.prototype.getIngredient = function (index) {
        return this.ingredients[index];
    };
    ShoppingListService.prototype.addIngredient = function (ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
        var body = JSON.stringify(ingredient);
        console.log(body);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post('http://localhost:3000/shopping-list', body, { headers: headers })
            .catch(function (error) { return Observable_1.Observable.throw(error); }); // in HTTPClient, no need to parse error and responde since tehyare json by default
    };
    ShoppingListService.prototype.addIngredients = function (ingredients) {
        var _this = this;
        // for (let ingredient of ingredients) {
        //   this.addIngredient(ingredient);
        // }
        (_a = this.ingredients).push.apply(_a, ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
        Observable_1.Observable.from(ingredients)
            .concatMap(function (entry) { return _this.http.post('http://localhost:3000/shopping-list', entry); })
            .subscribe(function (response) { return console.log(response); }, //do something with responses
        function (//do something with responses
        error) { return console.error(error); }, // so something on error
        function () { return console.info("All requests done"); } // do something when all requests are done
        );
        var _a;
    };
    ShoppingListService.prototype.updateIngredient = function (index, newIngredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    };
    ShoppingListService.prototype.deleteIngredient = function (index) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    };
    ShoppingListService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ShoppingListService);
    return ShoppingListService;
}());
exports.ShoppingListService = ShoppingListService;
