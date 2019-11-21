import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  handle(error:any) {
    let message = error;

    if (error != null && error.error) {
      message = error.error;

      if (error.error.message) {
        message = error.error.message;
      }
    }

    //toast message
    alert(message);
  }
}
