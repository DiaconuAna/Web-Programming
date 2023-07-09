import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Recipe} from "../recipe";
import {Author} from "../author";

@Injectable({
  providedIn: 'root'
})
export class AddRecipeService {

  _url = 'L8take2//backend//addOperation.php';

  constructor(private _http: HttpClient) { }

  addRecipe(recipe: Recipe): Observable<any>{
    console.log(recipe);
    var res = this._http.post<any>(this._url, recipe);
    console.log(res);
    return res;
  }

  fetchAuthors(): Observable<any>{
    return this._http.get("L8take2/backend/authorDropdown.php");
  }

  fetchTypes(): Observable<any>{
    return this._http.get("L8take2/backend/typeDropdown.php");
  }
}


