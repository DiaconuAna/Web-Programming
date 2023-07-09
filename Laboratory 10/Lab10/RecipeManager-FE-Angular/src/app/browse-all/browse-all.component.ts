import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {BrowseService} from "./browse.service";
import {Recipe} from "../recipe";
import {Router} from "@angular/router";
import {UserService} from "../login/user.service";

@Component({
  selector: 'app-browse-all',
  templateUrl: './browse-all.component.html',
  styleUrls: ['./browse-all.component.css']
})

export class BrowseAllComponent implements OnInit {

  recipes!: Recipe[];
  userId!: number;

  constructor(private _userService: UserService, private _browseService: BrowseService, private titleService: Title, private router: Router) {
    this.titleService.setTitle("Browse all recipes");
  }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("User"));
    console.log(this.userId);
    //this.checkIfIdValid();
    this.loadRecipes()
    //console.log("R = " ,this.recipes)
  }


  loadRecipes(): void{
    this._browseService.getRecipes().subscribe(
      data => this.recipes = data
    );
  }

}
