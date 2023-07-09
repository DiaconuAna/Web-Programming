import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Recipev2} from "../recipev2";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  _url = 'L8take2//backend//updateOperation.php';

  constructor(private _http: HttpClient) { }

  updateRecipe(recipe: Recipev2): Observable<any>{
    return this._http.post<any>(this._url, recipe);
  }

  fetchRecipes(): Observable<any>{
    return this._http.get('L8take2/backend/recipeDropdown.php');
  }
}
