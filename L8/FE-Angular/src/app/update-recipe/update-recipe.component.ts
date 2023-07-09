import { Component, OnInit } from '@angular/core';
import {UpdateService} from "./update.service";
import {Title} from "@angular/platform-browser";
import {Recipev2} from "../recipev2";

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css']
})
export class UpdateRecipeComponent implements OnInit {

  recipeModel = new Recipev2(1,"");
  updateConfirmation!: string;
  recipes: any = [];

  constructor(private _updateService: UpdateService, private titleService: Title) {
    this.titleService.setTitle("Update recipe");
  }

  ngOnInit(): void {
    this.fetchRecipes();
  }

  onUpdate(): void{
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
