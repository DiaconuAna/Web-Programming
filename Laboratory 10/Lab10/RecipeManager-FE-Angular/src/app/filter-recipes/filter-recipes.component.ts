import { Component, OnInit } from '@angular/core';
import {FilterService} from "./filter.service";
import {Title} from "@angular/platform-browser";
import {Type} from "../type";
import {Recipe} from "../recipe";
import {Router} from "@angular/router";
import {UserService} from "../login/user.service";

@Component({
  selector: 'app-filter-recipes',
  templateUrl: './filter-recipes.component.html',
  styleUrls: ['./filter-recipes.component.css']
})
export class FilterRecipesComponent implements OnInit {

  types!: Type[];
  recipes!: Recipe[];
  typeId!: string;
  userId!: number;


  constructor(private _userService: UserService, private _filterService: FilterService, private titleService: Title, private router: Router) {
    this.titleService.setTitle("Filter recipes");
  }

  ngOnInit(): void {
    //this.userId = Number(localStorage.getItem("User"));
    //console.log(this.userId);
    //this.checkIfIdValid();
    this.fetchTypes();
  }

  checkIfIdValid(): void{
    this._userService.getUserIds().subscribe(
      data =>{
        console.log("UserId: " + this.userId + data.find(x => x.userId == this.userId))
        if(!data.find(x => x.userId == this.userId))
          this.router.navigate(['**'])
      }
    )
  }

  filter(): void{
    console.log("TYPE ID: ", this.typeId);
     this._filterService.getRecipes(this.typeId).subscribe(
       data => {
         console.log(data);
         this.recipes = data
       }
     );
  }

  fetchTypes(): void{
    this._filterService.fetchTypes().subscribe(result => {this.types = result});
  }

}
