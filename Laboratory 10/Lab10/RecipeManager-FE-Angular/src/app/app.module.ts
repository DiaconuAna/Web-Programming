import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth-guard.service';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { BrowseAllComponent } from './browse-all/browse-all.component';
import { FilterRecipesComponent } from './filter-recipes/filter-recipes.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

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
    LoginComponent,
    LogoutComponent,
  ],
  //     RouterModule.forRoot(routes, { useHash: true })
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {path: '', component: LoginComponent},
        {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
        {path: 'add-recipe', component: AddRecipeComponent, canActivate: [AuthGuard]},
        {path: 'delete-recipe', component: DeleteRecipeComponent, canActivate: [AuthGuard]},
        {path: 'update-recipe', component: UpdateRecipeComponent, canActivate: [AuthGuard]},
        {path: 'browse-all', component: BrowseAllComponent, canActivate: [AuthGuard]},
        {path: 'filter-recipes', component: FilterRecipesComponent, canActivate: [AuthGuard]},
        {path: 'logout', component: LogoutComponent},
        {path: '**', component: PageNotFoundComponent}
      ],
      {useHash: true}
    ),
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:7042'],
        disallowedRoutes: []
      }
    }),
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
