import { Component } from '@angular/core';
import { LoggedUserService } from './service/logged-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private loggedUserService:LoggedUserService) {
  }

  ngOnInit() {
    if (!this.loggedUserService.loggedUser.value || this.loggedUserService.loggedUser.value == "") {
      this.loggedUserService.loadUserFromStorage();
    }
  }
}
