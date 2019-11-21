import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoggedUserService } from '../service/logged-user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  token:String;

  constructor(private loggedUserService:LoggedUserService,
    private router:Router) {

      this.loggedUserService.loggedUser.subscribe(
        data=>{
          this.token = data;

          if (this.token == null || this.token == "") {
            this.router.navigate(["/login"]);
          }
        }
      );
  }

  canActivate() {
    if (this.token != null) {
      return true;
    }
    
    this.router.navigate(["/login"]);
  }
}