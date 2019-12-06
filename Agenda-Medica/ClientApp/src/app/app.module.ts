import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchClientComponent } from './lst-consulta/lst-consulta.component';
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
      { path: 'lst-consulta', component: FetchClientComponent },
   
      { path: 'new-appointment', component: AddClientComponent },
    
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
