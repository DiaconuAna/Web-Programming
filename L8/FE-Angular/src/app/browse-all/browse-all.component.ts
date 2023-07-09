import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {BrowseService} from "./browse.service";

@Component({
  selector: 'app-browse-all',
  templateUrl: './browse-all.component.html',
  styleUrls: ['./browse-all.component.css']
})

export class BrowseAllComponent implements OnInit {

  recipes: Array<string[]> = [];

  constructor(private _browseService: BrowseService, private titleService: Title) {
    this.titleService.setTitle("Browse all recipes");
  }

  ngOnInit(): void {
    this.loadRecipes()
  }

  loadRecipes(): void{
    this._browseService.getRecipes().subscribe(
      data => this.recipes = data,
    );
    console.log(this.recipes)
  }

}
