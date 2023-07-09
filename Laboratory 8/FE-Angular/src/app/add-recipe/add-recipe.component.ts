import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe';
import {Author} from '../author';
import {Type} from '../type';
import {AddRecipeService} from "./add-recipe.service";
import {Title} from "@angular/platform-browser";
import {Router} from '@angular/router';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipeModel = new Recipe(1,"",1,"");
  addConfirmation: string | undefined;
  authors: any = [];
  types: any = [];

  constructor(private addService: AddRecipeService, private titleService:Title, private router: Router) {
    this.titleService.setTitle("Add recipe");
  }

  ngOnInit(): void {
    this.fetchAuthors();
    this.fetchTypes();
    console.log("Authors: " + this.authors);
  }

  onAdd(): void{
    this.addService.addRecipe(this.recipeModel).subscribe(
       data => this.addConfirmation = "Recipe added successfully",
       error => this.addConfirmation = "Failure"
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
        this.router.navigate([""]);
      }, 2000
  )
  }

}
