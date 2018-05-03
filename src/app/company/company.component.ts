import { Component } from '@angular/core';
import { DataService } from '../shared/services/dataService'
import { Company } from '../shared/models/company'
import * as _ from 'lodash'
import { Contact } from '../shared/models/contact';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  constructor(private dataService: DataService) {

  }

  companies: Company[]
  selectedCompany: Company;
  hoveredCompany:Company;

  ngOnInit() {
    this.dataService.getCompaniess().subscribe(cmps => {

      this.companies = cmps;
      if (cmps.length > 0) {
        this.selectedCompany = this.companies[0];
      }
    });
  }

  selectCompany(cmp:Company) { 
    this.selectedCompany = cmp;
  }

  removeContact(cnt:Contact){
    this.selectedCompany.contacts = _.without(this.selectedCompany.contacts,cnt);
  }

  removeCompany(cmp:Company){
    this.companies = _.without(this.companies,cmp);
    if (this.companies.length > 0) {
      this.selectedCompany = this.companies[0];
    }else{
      this.selectedCompany = null;
    }
  }
}