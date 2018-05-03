import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user'
import { Well } from '../models/well'
import { Company } from '../models/company';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  /**
   * get users data
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`/assets/data/users.json`)
  }

  /**
   * get wells
   */
  getWells(): Observable<Well[]> {
    return this.http.get<Well[]>(`/assets/data/wells.json`)
  }

  /**
   * get companies
   */
  getCompaniess(): Observable<Company[]> {
    return this.http.get<Company[]>(`/assets/data/companies.json`)
  }
}
