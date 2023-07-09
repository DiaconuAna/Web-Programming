import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {User} from "../user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean = false;

  constructor(private userService: UserService,private router: Router) { }

  user!: User;

  ngOnInit(): void {
  }

  login(username:string,password:string){
    this.userService.login(username,password).subscribe(
      u => {//this.user = u;
        //localStorage.setItem("User",String(u.id));
        const token = (<any>u).token;
        console.log(token)
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
      },
      () => {
        alert("Login failed");
        this.refreshPage();
        this.router.navigate([''])
      },
      () => this.router.navigate(['/home'])

    );
  }

  refreshPage(): void{
    setTimeout(function() {
      window.location.reload();
    }, 1000);
  }
}
