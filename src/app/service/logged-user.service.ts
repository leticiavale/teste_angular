import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  private _loggedUser$ = new BehaviorSubject<String>(null);

  constructor() {
    this._loggedUser$.next("");
  }

  public setLoggedUserFromToken(token:string) {
    this._loggedUser$.next(token);
    sessionStorage.setItem("logged-user-token",token);
  }

  get loggedUser():BehaviorSubject<String> {
    return this._loggedUser$;
  }

  logout() {
    sessionStorage.setItem("logged-user-token","");
    this._loggedUser$.next("");
  }

  loadUserFromStorage() {
    if (sessionStorage.getItem('logged-user-token')) {
      this._loggedUser$.next(sessionStorage.getItem('logged-user-token'));
    }
  }

}
