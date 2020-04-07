import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieService } from './services/business/movie.service';



import { MessagesComponent } from './messages/messages.component';

import { MessageService } from './services/business/message.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';

import { AppAngmaterialModule } from './appAngmaterialModule';


import { MyFormComponent } from './my-form/my-form.component';

import { DialogDemoComponent } from './dialog-demo/dialog-demo.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';

import { TooltipDemoComponent } from './tooltip-demo/tooltip-demo.component';
import { SnackbarDemoComponent } from './snackbar-demo/snackbar-demo.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import { NameComponent } from './name/name.component';
import { DataTableComponent } from './data-table/data-table.component';
import { TableangMaterialComponent } from './tableang-material/tableang-material.component';

import { AppMaterialModule } from './app-material/app-material.module';
import { ButtonComponent } from './button/button.component';
import { DashboardAngularMaterialComponent } from './dashboard-angular-material/dashboard-angular-material.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './services/infra/auth.service';
import { TasksComponent } from './tasks/tasks.component';

import { AuthenticationService } from './services/infra/authentication.service';
import {TaskService } from './services/business/task.service' ;

import { JwtModule } from '@auth0/angular-jwt';
import { NewTaskComponent } from './new-task/new-task.component';
import { GridComponent } from './grid/grid.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { BadgeComponent } from './badge/badge.component';

// import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
// MatListModule, MatTableModule, MatPaginatorModule,
// MatSortModule } from '@angular/material';
// https://www.youtube.com/watch?v=-zLQG4VX84U&index=8&list=PLWBrqglnjNl3J_53Mx_R3-4EzqOBL3AS5
// https://makina-corpus.com/blog/metier/2017/premiers-pas-avec-rxjs-dans-angular
// https://itunes.apple.com/search
// https://codecraft.tv/courses/angular/http/http-with-observables/



// https://youtu.be/yewIWvVdtA4?list=PLWBrqglnjNl3J_53Mx_R3-4EzqOBL3AS5&t=373

//  demarrage du serveur json par defaut le port est 3000
// json-server --watch db.json

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieDetailComponent,
    MessagesComponent,
    DashboardComponent,
    PageNotFoundComponent,
    MovieSearchComponent,
    MyFormComponent,
    DialogDemoComponent,
    MyDialogComponent,
    SnackbarDemoComponent,
    TooltipDemoComponent,
    MainNavComponent,
    NameComponent,
    DataTableComponent,
    TableangMaterialComponent,
    ButtonComponent,
    DashboardAngularMaterialComponent,
    LoginComponent,
    AdminComponent,
    TasksComponent,
    NewTaskComponent,
    GridComponent,
    ExpansionComponent,
    BadgeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AppAngmaterialModule,
    LayoutModule,
    AppMaterialModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    JwtModule
  ],
  entryComponents: [MyDialogComponent], // il faut l'ajouter sinon la fenetre ne souvre pas.
  providers: [MovieService, MessageService, AuthService, AuthenticationService, TaskService ],
  bootstrap: [AppComponent]
})

export class AppModule { }
