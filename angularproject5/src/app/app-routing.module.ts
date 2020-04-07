import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataTableComponent } from './data-table/data-table.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { Movie } from '../models/movie';

import { MyFormComponent } from './my-form/my-form.component';

import { DialogDemoComponent } from './dialog-demo/dialog-demo.component';
import { SnackbarDemoComponent } from './snackbar-demo/snackbar-demo.component';
import { TooltipDemoComponent } from './tooltip-demo/tooltip-demo.component';


import { ButtonComponent } from './button/button.component';
import { DashboardAngularMaterialComponent } from './dashboard-angular-material/dashboard-angular-material.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './guard/auth.guard';
import { TasksComponent } from './tasks/tasks.component'
import { GridComponent } from './grid/grid.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { BadgeComponent } from './badge/badge.component';
import { NewTaskComponent } from './new-task/new-task.component';

// les composants DataTableComponent et DashboardAngularMaterialComponent et MainNavComponent
// ont été creer au moyen des commandes suivantes :
// ng generate @angular/material:material-nav --name <component-name>
// ng generate @angular/material:material-dashboard --name <component-name>
// ng generate @angular/material:material-table --name <component-name>

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },

  { path: 'detail/:id', component: MovieDetailComponent, canActivate: [AuthGuard] },
  { path: 'myform', component: MyFormComponent, canActivate: [AuthGuard] },
  { path: 'dialog', component: DialogDemoComponent, canActivate: [AuthGuard] },
  { path: 'snackbar', component: SnackbarDemoComponent, canActivate: [AuthGuard] },
  { path: 'tooltip', component: TooltipDemoComponent, canActivate: [AuthGuard] },
  { path: 'datatable', component: DataTableComponent, canActivate: [AuthGuard] },
  { path: 'button', component: ButtonComponent, canActivate: [AuthGuard] },
  { path: 'dashboardangularmaterial', component: DashboardAngularMaterialComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent , canActivate: [AuthGuard] },
  { path: 'grid', component: GridComponent , canActivate: [AuthGuard] },
  { path: 'expansion', component: ExpansionComponent , canActivate: [AuthGuard] },
  { path: 'badge', component: BadgeComponent , canActivate: [AuthGuard] },
  { path: 'new-task', component: NewTaskComponent , canActivate: [AuthGuard] },

 // { path: '', redirectTo: 'login', pathMatch: 'full' }

  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] },
];

// dashboardangularmaterial

@NgModule({
  imports: [
    // CommonModule
    RouterModule.forRoot(
      routes, { enableTracing: true }) // <-- debugging purposes only)
  ],
  // declarations: []
  exports: [RouterModule]
})
export class AppRoutingModule { }
