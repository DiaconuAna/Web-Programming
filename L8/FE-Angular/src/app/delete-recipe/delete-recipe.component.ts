import { Component, OnInit } from '@angular/core';
import {DeleteService} from "./delete.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-delete-recipe',
  templateUrl: './delete-recipe.component.html',
  styleUrls: ['./delete-recipe.component.css']
})
export class DeleteRecipeComponent implements OnInit {

  recipeID!: number; // "Non-null assertion operator"
  deleteConfirmation!: string;
  recipes: any = [];

  constructor(private _deleteService: DeleteService, private titleService: Title) {
    this.titleService.setTitle("Delete recipe");
  }

  ngOnInit(): void {
    this.fetchRecipes()
  }

  onDelete(): void{
    if(confirm("Are you sure you want to delete this recipe?")) {
      console.log("Recipe ID: ", this.recipeID);
      this._deleteService.deleteRequest(this.recipeID).subscribe(
        //val => console.log(val)
        data => this.deleteConfirmation = 'Recipe deleted successfully',
        error => this.deleteConfirmation = 'Failure'
      )
    }
  }

  fetchRecipes():void{
    this._deleteService.fetchRecipes().subscribe(
      res => this.recipes = res
    );
  }

  refreshPage(): void{
    setTimeout(function() {
      window.location.reload();
    }, 2000);
  }

}
