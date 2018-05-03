import { Component } from '@angular/core';
import { AuthService } from '../shared/services/authService'

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss']
})
export class LeftNavComponent {

  constructor(private auth: AuthService) {

  }
  logout() {
    this.auth.logout();
  }
}