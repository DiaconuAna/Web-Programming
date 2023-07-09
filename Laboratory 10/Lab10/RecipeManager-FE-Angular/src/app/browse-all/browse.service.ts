import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recipe} from "../recipe";
import {UserId} from "../userId";

@Injectable({
  providedIn: 'root'
})
export class BrowseService {

  _url =  'https://localhost:7042/api/Recipes';

  constructor(private  _http: HttpClient) { }

  // getRecipes(): Observable<any>{
  //   return this._http.get<any>(this._url);
  // }

  getRecipes(): Observable<Recipe[]>{
    return this._http.get<Recipe[]>(this._url);

  }



}
