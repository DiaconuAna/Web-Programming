import { Component, OnInit } from '@angular/core';
import {UpdateService} from "./update.service";
import {Title} from "@angular/platform-browser";
import {Recipev2} from "../recipev2";
import {Recipe} from "../recipe";
import {UserService} from "../login/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css']
})
export class UpdateRecipeComponent implements OnInit {

  recipeModel!: Recipe;
  updateConfirmation!: string;
  recipes!: Recipe[];
  recipeId!: string;
  descr!: string;
  userId!: number;


  constructor(private _userService: UserService, private _updateService: UpdateService, private titleService: Title, private router: Router) {
    this.titleService.setTitle("Update recipe");
  }

  ngOnInit(): void {
    //this.userId = Number(localStorage.getItem("User"));
    //console.log(this.userId);
    //this.checkIfIdValid();
    this.fetchRecipes();
  }



  onUpdate(): void{
    var splitter = this.recipeId.split(".", 2);
    //console.log(splitter[0]);
    //this.recipeModel.id = parseInt(splitter[0]);
    this.recipeModel = new Recipe(+splitter[0], "", this.descr, "", "", "");
    console.log(this.recipeModel)
    this._updateService.updateRecipe(this.recipeModel).subscribe(
      data => this.updateConfirmation = "Recipe updated successfully",
      error => this.updateConfirmation = "Failure"
    )
  }

  fetchRecipes():void{
    this._updateService.fetchRecipes().subscribe(
      res => this.recipes = res
    );
  }

  refreshPage(): void{
    setTimeout(function() {
      window.location.reload();
    }, 2000);
  }

}
