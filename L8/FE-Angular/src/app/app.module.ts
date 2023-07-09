import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";



import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { BrowseAllComponent } from './browse-all/browse-all.component';
import { FilterRecipesComponent } from './filter-recipes/filter-recipes.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddRecipeComponent,
    PageNotFoundComponent,
    DeleteRecipeComponent,
    UpdateRecipeComponent,
    BrowseAllComponent,
    FilterRecipesComponent,
  ],
  //     RouterModule.forRoot(routes, { useHash: true })
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [{path: '', component: HomeComponent},
        {path: 'add-recipe', component: AddRecipeComponent},
        {path: 'delete-recipe', component: DeleteRecipeComponent},
        {path: 'update-recipe', component: UpdateRecipeComponent},
        {path: 'browse-all', component: BrowseAllComponent},
        {path: 'filter-recipes', component: FilterRecipesComponent},
        {path: '**', component: PageNotFoundComponent}
      ],
      {useHash: true}
    ),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
