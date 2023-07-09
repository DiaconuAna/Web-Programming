import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BrowseService {

  _url =  'L8take2//backend//browseRecipes.php';

  constructor(private  _http: HttpClient) { }

  // getRecipes(): Observable<any>{
  //   return this._http.get<any>(this._url);
  // }

  getRecipes(): Observable<Array<string[]>>{
    return this._http.get<Array<string[]>>(this._url);

  }

}
