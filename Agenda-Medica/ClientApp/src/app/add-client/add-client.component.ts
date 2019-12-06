import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html'
})

export class AddClientComponent implements OnInit {
  http: HttpClient;
  URL: string;
  clientForm: FormGroup;
  title: string = "Criando";
  id: number;
  errorMessage: any;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _fb: FormBuilder, private _avRoute: ActivatedRoute, private _router: Router) {

    this.http = http;
    this.URL = baseUrl;

    if (this._avRoute.snapshot.params["id"]) {
      this.id = this._avRoute.snapshot.params["id"];
    }

    this.clientForm = this._fb.group({
      id: 0,
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    })

  }

  ngOnInit(): void {

    if (this.id > 0) {
      this.title = "Editando";
      this.http.get<Client[]>(this.URL + 'api/client/' + this.id)
        .subscribe(result => this.clientForm.setValue(result), error => console.error(error));
    }
  }

  save() {

    if (!this.clientForm.valid) {
      return;
    }

    if (this.title == "Criando") {
      this.http.post(this.URL + "api/client", this.clientForm.value)
        .subscribe(
          result => this._router.navigate(['/lst-consulta']),
          error => console.error(error));
    }
    else if (this.title == "Editando") {
      this.http.put<Client>(this.URL + "api/client", this.clientForm.value)
        .subscribe(
          result => this._router.navigate(['/lst-consulta']),
          error => console.error(error));
    }
  }

  cancel() {
    this._router.navigate(['/lst-consulta']);
  }

  get name() { return this.clientForm.get('name'); }
  get lastName() { return this.clientForm.get('lastName'); }
  get dateOfBirth() { return this.clientForm.get('dateOfBirth'); }
}

interface Client {
  id: number;
  name: string;
  lastName: string;
  dateOfBirth: string;
}
