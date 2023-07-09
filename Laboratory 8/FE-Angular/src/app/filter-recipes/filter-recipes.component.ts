import { Component, OnInit } from '@angular/core';
import {FilterService} from "./filter.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-filter-recipes',
  templateUrl: './filter-recipes.component.html',
  styleUrls: ['./filter-recipes.component.css']
})
export class FilterRecipesComponent implements OnInit {

  types: any = [];
  recipes: Array<string[]> = [];
  typeId!: number;

  constructor(private _filterService: FilterService, private titleService: Title) {
    this.titleService.setTitle("Filter recipes");
  }

  ngOnInit(): void {
    this.fetchTypes();
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
    this._filterService.fetchTypes().subscribe(result => this.types = result);
  }

}
