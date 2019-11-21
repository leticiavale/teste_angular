import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUserService } from '../service/logged-user.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

  constructor(private router:Router,
    private loggedUserService:LoggedUserService) {   
  } 

  ngOnInit() {
    
  }

  logout() {
    this.loggedUserService.logout();
    this.router.navigate(["/login"]);
  }

}
