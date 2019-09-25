import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import assign from 'lodash.assign';

import { ApiRequest } from './api-request';
import { MeService } from '../@services/me.service';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private http: HttpClient, private me: MeService) { }

  observableFact(apiRequest: ApiRequest): Observable<any> {
    let options: any = {params: {}};
    if (apiRequest.requestAuth) {
      options.headers = new HttpHeaders({'Authorization': 'JWT ' + this.me.token});
    }
    assign(options.params, apiRequest.requestParams);
    let httpRequest;
    if (apiRequest.requestMethod === 'GET') {
      httpRequest = this.http.get(apiRequest.requestUrl, options);
    }
    else if (apiRequest.requestMethod === 'POST') {
      httpRequest = this.http.post(apiRequest.requestUrl, apiRequest.requestPayload, options);
    }
    else if (apiRequest.requestMethod === 'PUT') {
      httpRequest = this.http.put(apiRequest.requestUrl, apiRequest.requestPayload, options);
    }
    else if (apiRequest.requestMethod === 'DELETE') {
      httpRequest = this.http.delete(apiRequest.requestUrl, options);
    }
    if (apiRequest.requestUnwrap) {
      httpRequest = httpRequest.pipe(
          map((data:any) => {
            return data.data;
          })
      );
    }
    return httpRequest;
  }

  get(): ApiRequest {
    return new ApiRequest(p => this.observableFact(p)).get();
  }

  post(payload: any): ApiRequest {
    return new ApiRequest(p => this.observableFact(p)).post(payload);
  }

  upload(files: any, data: any = null): ApiRequest {
    return new ApiRequest(p => this.observableFact(p)).upload(files, data);
  }

  put(): ApiRequest {
    return new ApiRequest(p => this.observableFact(p)).put();
  }

  delete(): ApiRequest {
    return new ApiRequest(p => this.observableFact(p)).delete();
  }

}
