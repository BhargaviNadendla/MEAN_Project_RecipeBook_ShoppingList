"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header.component");
var recipes_component_1 = require("./recipes/recipes.component");
var recipe_list_component_1 = require("./recipes/recipe-list/recipe-list.component");
var recipe_detail_component_1 = require("./recipes/recipe-detail/recipe-detail.component");
var recipe_item_component_1 = require("./recipes/recipe-list/recipe-item/recipe-item.component");
var shopping_list_component_1 = require("./shopping-list/shopping-list.component");
var shopping_edit_component_1 = require("./shopping-list/shopping-edit/shopping-edit.component");
var dropdown_directive_1 = require("./shared/dropdown.directive");
var shopping_list_service_1 = require("./shopping-list/shopping-list.service");
var app_routing_module_1 = require("./app-routing.module");
var recipe_start_component_1 = require("./recipes/recipe-start/recipe-start.component");
var recipe_edit_component_1 = require("./recipes/recipe-edit/recipe-edit.component");
var recipe_service_1 = require("./recipes/recipe.service");
var http_2 = require("@angular/common/http");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                recipes_component_1.RecipesComponent,
                recipe_list_component_1.RecipeListComponent,
                recipe_detail_component_1.RecipeDetailComponent,
                recipe_item_component_1.RecipeItemComponent,
                shopping_list_component_1.ShoppingListComponent,
                shopping_edit_component_1.ShoppingEditComponent,
                dropdown_directive_1.DropdownDirective,
                recipe_start_component_1.RecipeStartComponent,
                recipe_edit_component_1.RecipeEditComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                http_2.HttpClientModule,
                app_routing_module_1.AppRoutingModule
            ],
            providers: [shopping_list_service_1.ShoppingListService, recipe_service_1.RecipeService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
