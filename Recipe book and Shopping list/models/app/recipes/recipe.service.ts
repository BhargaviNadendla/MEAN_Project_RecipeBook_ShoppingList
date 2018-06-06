import { ShoppingListService } from '../shopping-list/shopping-list.service';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService, private http: HttpClient) {}

  getRecipes() {

      return this.http.get('http://localhost:3000/recipes/new')
          .map((response: Response) => {
              const recipes = response.obj;
              let transformedRecipes: Recipe[] = [];
              for(let recipe of recipes) {
                  transformedRecipes.push(new Recipe(recipe.name, recipe.description, recipe.imagePath,  recipe.ingredients));
              }
              this.recipes = transformedRecipes;
              console.log(this.recipes);
              return transformedRecipes;
          })
          .catch((error: Response) => Observable.throw(error));
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {

    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
      const body = JSON.stringify(recipe);
      console.log(body);
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post('http://localhost:3000/recipes/new', body, {headers: headers})
          .catch((error: Response) => Observable.throw(error));// in HTTPClient, no need to parse error and responde since tehyare json by default


  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
