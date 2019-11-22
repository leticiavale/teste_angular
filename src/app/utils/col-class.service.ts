import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColClassService {

  constructor() { }


  col1():string {
    return "col-3 col-md-2 col-lg-1 col-xl-1";
  }


  col2():string {
    return "col-4 col-md-3 col-lg-2 col-xl-2";
  }


  col3():string {
    return "col-6 col-md-4 col-lg-3 col-xl-3";
  }


  col4():string {
    return "col-6 col-md-5 col-lg-4 col-xl-4";
  }


  col5():string {
    return "col-6 col-md-6 col-lg-5 col-xl-5";
  }


  col6():string {
    return "col-6";
  }


  col7():string {
    return "col-6 col-md-6 col-lg-7 col-xl-7";
  }


  col8():string {
    console.log("aa");
    return "col-6 col-md-7 col-lg-8 col-xl-8";
  }


  col9():string {
    return "col-6 col-md-8 col-lg-9 col-xl-9";
  }


  col10():string {
    return "col-8 col-md-9 col-lg-10 col-xl-10";
  }


  col11():string {
    return "col-9 col-md-10 col-lg-11 col-xl-11";
  }


  col12():string {
    return "col-12";
  }
}
