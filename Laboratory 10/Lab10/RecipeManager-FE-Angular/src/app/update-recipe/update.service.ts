import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipe";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  _url = 'https://localhost:7042/api/Recipes/update';

  constructor(private _http: HttpClient) { }

  updateRecipe(recipe: Recipe): Observable<any>{
    return this._http.post(this._url, recipe);
  }

  fetchRecipes(): Observable<Recipe[]>{
    return this._http.get<Recipe[]>('https://localhost:7042/api/Recipes');
  }
}
