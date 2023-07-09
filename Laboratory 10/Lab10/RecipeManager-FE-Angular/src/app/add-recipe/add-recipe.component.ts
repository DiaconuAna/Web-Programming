import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe';
import {Author} from '../author';
import {Type} from '../type';
import {AddRecipeService} from "./add-recipe.service";
import {Title} from "@angular/platform-browser";
import {Router} from '@angular/router';
import {UserService} from "../login/user.service";


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipeModel = new Recipe(1,"","","","", "");
  addConfirmation: string | undefined;
  authors!: Author[];
  types!: Type[];
  authorName!: String;
  userId!: number;

  constructor(private _userService: UserService, private addService: AddRecipeService, private titleService:Title, private router: Router) {
    this.titleService.setTitle("Add recipe");
  }

  ngOnInit(): void {
    this.fetchAuthors();
    this.fetchTypes();
    //console.log("Authors: " + this.authors);
    //this.userId = Number(localStorage.getItem("User"));
    //this.checkIfIdValid();
  }

  onAdd(): void{
    console.log("Recipe Model: " + this.recipeModel + this.authorName)
    var splitted = this.authorName.split(" ",2);
    var firstName = splitted[0];
    var lastName = splitted[1];
    console.log(firstName, lastName);
    this.recipeModel.lastName = lastName;
    this.recipeModel.firstName = firstName;
    this.addService.addRecipe(this.recipeModel).subscribe(
      data => this.addConfirmation = "Recipe added successfully",
       error => this.addConfirmation = "Failure"
    )
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

  fetchAuthors(): void{
    this.addService.fetchAuthors().subscribe(result => {this.authors = result; console.log(result)});
  }

  fetchTypes(): void{
    this.addService.fetchTypes().subscribe(result => this.types = result);
  }

  button2(): void{
    setTimeout(
      ()=> {
        this.router.navigate(["/home"]);
      }, 2000
  )
  }

}
