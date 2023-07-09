import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  _url =  'L8take2//backend//filterRecipes.php';

  constructor(private _http: HttpClient) {}


  fetchTypes(): Observable<any>{
    return this._http.get("L8take2/backend/typeDropdown.php");
  }

  getRecipes(typeId: number): Observable<Array<string[]>>{
    return this._http.post<Array<string[]>>(this._url, typeId);
  }


}
