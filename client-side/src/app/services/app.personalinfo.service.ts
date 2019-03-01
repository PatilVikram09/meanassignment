import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';

import { PersonalInfo } from './../models/app.personalinfo.model';

@Injectable()
export class PersonalInfoService {

  url: string;

  constructor(private http: Http) {
      this.url = 'http://localhost:4070';
  }

  getPersonalInfo(token: string): Observable<Response>{
    let resp: Observable<Response>;
    let header: Headers = new Headers({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
    });

    let options: RequestOptions = new RequestOptions();
    options.headers = header;

    resp = this.http.get(`${this.url}/api/personalinfo`, options);

    return resp;
}

  addPersonalInfo(personalInfo: PersonalInfo, token: string): Observable<Response>{
      let resp: Observable<Response>;
      let header: Headers = new Headers({
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + token
      });

      let options: RequestOptions = new RequestOptions();
      options.headers = header;

      resp = this.http.post(`${this.url}/api/personalinfo`, JSON.stringify(personalInfo), options);

      return resp;
  }
}
