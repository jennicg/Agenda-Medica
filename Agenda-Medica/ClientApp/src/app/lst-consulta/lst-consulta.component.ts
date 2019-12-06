import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lst-consulta',
  templateUrl: './lst-consulta.component.html'
})
export class FetchClientComponent {
  public clients: Client[];
  public http: HttpClient;
  public URL: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.URL = baseUrl;
    this.http = http;
    this.consultar();    
  }

  consultar() {
    this.http.get<Client[]>(this.URL + 'api/client')
      .subscribe(result => { this.clients = result; }, error => console.error(error));
  }

  delete(id) {
    var question = confirm("Você tem certeza que deseja excluir este registro?");
    if (question) {   
      this.http.delete(this.URL + "api/client/" + id)
        .subscribe(result => console.error(result), error => console.error(error));
      location.reload();
    }  
  }
}

interface Client {
  id: number;
  name: string;
  lastName: string;
  dateOfBirth: string;
}
