import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Recipe} from "../recipe";
import {Author} from "../author";
import {Type} from "../type";

@Injectable({
  providedIn: 'root'
})
export class AddRecipeService {

  _url = 'https://localhost:7042/api/Recipes/add';

  constructor(private _http: HttpClient) { }

  addRecipe(recipe: Recipe): Observable<any>{
    console.log(recipe);
    var res = this._http.post<any>(this._url, recipe);
    console.log(res);
    return res;
  }

  fetchAuthors(): Observable<Author[]>{
    return this._http.get<Author[]>("https://localhost:7042/api/Recipes/authors");
  }

  fetchTypes(): Observable<Type[]>{
    return this._http.get<Type[]>("https://localhost:7042/api/Recipes/types");
  }
}


