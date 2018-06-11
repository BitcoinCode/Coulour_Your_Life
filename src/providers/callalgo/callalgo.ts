import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Algorithmia } from 'Algorithmia';

/*
  Generated class for the CallalgoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CallalgoProvider {

  constructor(public http: HttpClient) {
    //http.get('https://algorithmia.com/v1/clients/js/algorithmia-0.2.0.js');
    
    console.log('Hello CallalgoProvider Provider');
  }

}
