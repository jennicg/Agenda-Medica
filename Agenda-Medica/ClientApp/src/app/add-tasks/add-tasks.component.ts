import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html'
})

export class AddTasksComponent implements OnInit {
  http: HttpClient;
  URL: string;
  tasksForm: FormGroup;
  title: string = "Criando";
  id: number;
  errorMessage: any;
  public clients: Client[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _fb: FormBuilder, private _avRoute: ActivatedRoute, private _router: Router) {

    this.http = http;
    this.URL = baseUrl;

    if (this._avRoute.snapshot.params["id"]) {
      this.id = this._avRoute.snapshot.params["id"];
    }

    this.tasksForm = this._fb.group({
      id: 0,
      client: ['', [Validators.required]],
      dateStart: ['', [Validators.required]],
      dateEnd: ['', [Validators.required]],
      observation: ''
    })

  }

  ngOnInit(): void {
    this.http.get<Client[]>(this.URL + 'api/client')
      .subscribe(result => { this.clients = result; }, error => console.error(error));

    if (this.id > 0) {
      this.title = "Editando";
      this.http.get<Tasks[]>(this.URL + 'api/tasks/' + this.id)
        .subscribe(result => this.tasksForm.setValue(result), error => console.error(error));
    }
  }

  save() {

    if (!this.tasksForm.valid) {
      return;
    }

    let task = this.tasksForm.value;

    let client = {
      id: this.tasksForm.value['client'],
      name: "",
      lastName: "",
      dateOfBirth: new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()
    }

    task.client = client;
    
    if (this.title == "Criando") {
      this.http.post(this.URL + "api/tasks", task)
        .subscribe(
          result => this._router.navigate(['/fetch-tasks']),
          error => console.error(error));
    }
    else if (this.title == "Editando") {
      this.http.put<Tasks>(this.URL + "api/tasks", task)
        .subscribe(
          result => this._router.navigate(['/fetch-tasks']),
          error => console.error(error));
    }
  }

  cancel() {
    this._router.navigate(['/fetch-tasks']);
  }

  get client() { return this.tasksForm.get('client'); }
  get dateStart() { return this.tasksForm.get('dateStart'); }
  get dateEnd() { return this.tasksForm.get('dateEnd'); }
  get observation() { return this.tasksForm.get('observation');}
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

