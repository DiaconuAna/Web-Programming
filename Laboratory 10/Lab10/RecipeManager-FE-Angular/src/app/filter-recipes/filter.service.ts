import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import {Type} from "../type";
import {Recipe} from "../recipe";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  _url =  'https://localhost:7042/api/Recipes/filterType';

  constructor(private _http: HttpClient) {}


  fetchTypes(): Observable<Type[]>{
    return this._http.get<Type[]>("https://localhost:7042/api/Recipes/types");
  }

    getRecipes(typeId: string): Observable<Recipe[]>{
      const type={
        typeId: typeId}
    return this._http.post<Recipe[]>(this._url, type);
  }


}
