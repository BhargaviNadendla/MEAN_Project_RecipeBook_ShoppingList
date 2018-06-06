import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/Rx';
import {Injectable} from "@angular/core";
import {Recipe} from "../recipes/recipe.model";

@Injectable()
export class ShoppingListService {
  constructor(private http: HttpClient) {}
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [];

  getIngredients() {

      return this.http.get('http://localhost:3000/shopping-list')
          .map((response: Response) => {
              const ings = response.obj;
              let transformedIngs: Ingredient[] = [];
              for(let ing of ings) {
                  transformedIngs.push(new Ingredient(ing.name, ing.amount));
              }
              this.ingredients = transformedIngs;
              console.log(transformedIngs);
              return transformedIngs;
          })
          .catch((error: Response) => Observable.throw(error));

  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
      const body = JSON.stringify(ingredient);
      console.log(body);
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post('http://localhost:3000/shopping-list', body, {headers: headers})
          .catch((error: Response) => Observable.throw(error));// in HTTPClient, no need to parse error and responde since tehyare json by default

  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());


      Observable.from(ingredients)
          .concatMap(entry => this.http.post('http://localhost:3000/shopping-list', entry))
          .subscribe(
              response => console.log(response), //do something with responses
              error => console.error(error), // so something on error
              () => console.info("All requests done") // do something when all requests are done
          );
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
