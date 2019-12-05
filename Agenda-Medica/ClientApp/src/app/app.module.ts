import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchClientComponent } from './fetch-client/fetch-client.component';
import { FetchTasksComponent } from './fetch-tasks/fetch-tasks.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AddTasksComponent } from './add-tasks/add-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchClientComponent,
    FetchTasksComponent,
    AddClientComponent,
    AddTasksComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,    
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'fetch-client', component: FetchClientComponent },
      { path: 'fetch-tasks', component: FetchTasksComponent },
      { path: 'register-client', component: AddClientComponent },
      { path: 'client/edit/:id', component: AddClientComponent },
      { path: 'register-tasks', component: AddTasksComponent },
      { path: 'tasks/edit/:id', component: AddTasksComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
