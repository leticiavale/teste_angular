import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user:User = new User();

  constructor(private router:Router,
              private authenticationService:AuthenticationService) { 
  }

  ngOnInit() {
    this.user.username = "admin";
    this.user.password = "password";
  }

  logar() {
    if (!this.user.username || this.user.username=="") {
      alert("Informe o usuário");
      return;
    }
    if (!this.user.password || this.user.password=="") {
      alert("Informe a senha");
      return;
    }

    this.authenticationService.login(this.user).subscribe(
      data=>{        
        if (data != null && data.status == 200) {
          this.router.navigate(["/"]);
        } else {
          alert("Ocorreu um erro");
        }
      },
      error=>{ 
        alert("Usuário e/ou senha inválido");
      }
    );
  }
}
