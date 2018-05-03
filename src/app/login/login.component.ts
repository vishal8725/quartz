import { Component } from '@angular/core';
import { DataService } from '../shared/services/dataService'

import { Observable } from 'rxjs/Observable';


import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/authService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;
  showError: Boolean;
  //form;
  constructor(private myRoute: Router,
    private auth: AuthService) {
    this.showError = false;
  }

  login() {
    this.auth.login(this.username, this.password, (success) => {
      if (!success) {
        this.showError = true;
      }
    });
  }
}
