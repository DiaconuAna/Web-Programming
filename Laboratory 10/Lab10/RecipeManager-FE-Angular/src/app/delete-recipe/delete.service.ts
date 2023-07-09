import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipe";

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  _url = 'https://localhost:7042/api/Recipes/delete';

  constructor(private _http: HttpClient) { }

  deleteRequest(recipeId: string): Observable<any>{
    console.log(recipeId)
    var splitter = recipeId.split(".",2);
    console.log("Split" ,splitter[0])
    const dto={
      id: splitter[0]}
    return this._http.post(this._url, dto);
  }

  fetchRecipes(): Observable<Recipe[]>{
    return this._http.get<Recipe[]>('https://localhost:7042/api/Recipes');
    //return this._http.get('L8take2/backend/recipeDropdown.php');
  }
}
