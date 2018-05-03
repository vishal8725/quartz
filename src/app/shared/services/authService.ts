import { Injectable } from '@angular/core';
import { Router, Data } from '@angular/router';
import { DataService } from './dataService'
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user'

@Injectable()
export class AuthService {
  constructor(private dataService: DataService,
    private myRoute: Router) { }

  login(username: string, passord: string, callback) {
    let user: Boolean = false;
    this.dataService.getUsers().subscribe(lst => {
      user = !!lst.filter(usr => usr.username === username
        && usr.password === passord).length;
      if (!!user) {
        this.sendToken(username)
        this.myRoute.navigate(["dashboard"]);
        if (callback) {
          callback(true);
        }
      } else {
        this.logout();
        if (callback) {
          callback(false);
        }
      }
    });
  }
  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }
  getToken() {
    return localStorage.getItem("LoggedInUser")
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem("LoggedInUser");
    this.myRoute.navigate(["login"]);
  }
}