import { Component, OnInit } from '@angular/core';
import {DeleteService} from "./delete.service";
import {Title} from "@angular/platform-browser";
import {Recipe} from "../recipe";
import {UserService} from "../login/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-recipe',
  templateUrl: './delete-recipe.component.html',
  styleUrls: ['./delete-recipe.component.css']
})
export class DeleteRecipeComponent implements OnInit {

  recipeID!: string; // "Non-null assertion operator"
  deleteConfirmation!: string;
  recipes!: Recipe[];
  userId!: number;


  constructor(private _userService: UserService, private _deleteService: DeleteService, private titleService: Title, private router: Router) {
    this.titleService.setTitle("Delete recipe");
  }

  ngOnInit(): void {
    //this.userId = Number(localStorage.getItem("User"));
    //this.checkIfIdValid();
    this.fetchRecipes()
  }

  onDelete(): void{
    if(confirm("Are you sure you want to delete this recipe?")) {
      console.log("Recipe ID: ", this.recipeID);

       this._deleteService.deleteRequest(this.recipeID).subscribe(
      //   //val => console.log(val)
         data => this.deleteConfirmation = 'Recipe deleted successfully',
         error => this.deleteConfirmation = 'Failure'
       )
    }
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
