import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../user";
import {Observable, of, pipe} from "rxjs";
import {UserId} from "../userId";
import {catchError} from "rxjs/operators";
import {error} from "@angular/compiler/src/util";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private backendUrl = 'https://localhost:7042/api/User/login';

  constructor(private _http: HttpClient, private router: Router) { }

  login(username:string,password:string){
    const data = {
      username:username,
      password:password
    }
    return this._http.post<User>(this.backendUrl ,data)
    //.pipe(catchError(
    //(()=>{console.log("fuck"); alert("Login failed"); return of(("Login failed") as any);
    //    ;}
      //this.handleError<User>('login'))
  //)));

  }

  getUserIds(): Observable<UserId[]>{
    return this._http.get<UserId[]>('https://localhost:7042/api/User');
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    // @ts-ignore
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      alert(error.toString())
      this.router.navigate(['']);
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
