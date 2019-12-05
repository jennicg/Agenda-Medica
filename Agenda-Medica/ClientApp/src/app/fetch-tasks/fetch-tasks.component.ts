import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-tasks',
  templateUrl: './fetch-tasks.component.html'
})
export class FetchTasksComponent {
  public tasks: Tasks[];
  public http: HttpClient;
  public URL: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.URL = baseUrl;
    this.http = http;
    this.consultar();   
  }

  consultar() {
    this.http.get<Tasks[]>(this.URL + 'api/tasks')
      .subscribe(result => { this.tasks = result; }, error => console.error(error));
  }

  delete(id) {
    var question = confirm("Você tem certeza que deseja excluir este registro?");
    if (question) {
      this.http.delete(this.URL + "api/tasks/" + id)
        .subscribe(result => console.error(result), error => console.error(error));
      location.reload();
    }
  }
}

interface Tasks {
  id: number;
  client: Client;
  dateStart: Date;
  dateEnd: Date;
  observation: string;
}

interface Client {
  id: number;
  name: string;
  lastName: string;
  dateOfBirth: string;
}
