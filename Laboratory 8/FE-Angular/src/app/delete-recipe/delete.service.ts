import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  _url = 'L8take2//backend//deleteOperation.php';

  constructor(private _http: HttpClient) { }

  deleteRequest(recipeId: number): Observable<any>{
    return this._http.post(this._url, recipeId);
  }

  fetchRecipes(): Observable<any>{
    return this._http.get('L8take2/backend/recipeDropdown.php');
    //return this._http.get('L8take2/backend/recipeDropdown.php');
  }
}
