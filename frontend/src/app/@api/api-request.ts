import assign from 'lodash.assign';
import { Observable } from 'rxjs';
import { forOwn } from 'lodash';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

function buildUrl(urlTempl: string, params: string[]) {
  // Example usage:
  // buildUrl('/users/{}', [userId])
  // buildUrl('/lists/{}/members/{}', [listName, userId])

  let chunks = urlTempl.split('{}');

  let url = '';
  chunks.forEach((c, i) => {
    url += c;
    if (i < params.length) {
      url += encodeURIComponent(params[i]);
    }
  });
  return url;

}

export class ApiRequest {
  requestMethod: Method;
  requestUrl: string;
  requestPayload: any;
  requestParams: any = {};
  requestAuth: boolean = false;
  requestUnwrap: boolean = false;

  constructor(private observableFact: (r: ApiRequest) => Observable<any>) {}

  get(): ApiRequest {
    this.requestMethod = 'GET';
    return this;
  }

  post(payload: any): ApiRequest {
    this.requestMethod = 'POST';
    return this.payload(payload);
  }

  upload(files: any, data: any = null): ApiRequest {
    this.requestMethod = 'POST';
    const form = new FormData();
    forOwn(files, (file, name) => form.append(name, file));
    if (data !== null) {
      form.append('data', JSON.stringify(data));
    }
    return this.payload(form);
  }

  put(): ApiRequest {
    this.requestMethod = 'PUT';
    return this;
  }

  delete(): ApiRequest {
    this.requestMethod = 'DELETE';
    return this;
  }

  url(urlTempl: string, ...params: string[]): ApiRequest {
    this.requestUrl = buildUrl(urlTempl, params);
    return this;
  }

  params(params: any): ApiRequest {
    assign(this.requestParams, params);
    return this;
  }

  payload(payload: any): ApiRequest {
    this.requestPayload = payload;
    return this;
  }

  auth(): ApiRequest {
    this.requestAuth = true;
    return this;
  }

  unwrap(): ApiRequest {
    this.requestUnwrap = true;
    return this;
  }

  page(page: number): ApiRequest {
    return this.params({ page });
  }

  page_size(page_size: number): ApiRequest {
    return this.params({page_size: page_size});
  }

  sort(field: string, desc: boolean = false): ApiRequest {
    if (desc) {
      field = '-' + field;
    }
    return this.params({order_by: field});
  }

  filter(params: any, ignoreNulls: boolean = true): ApiRequest {
    params = assign({}, params);
    if (ignoreNulls) {
      for (const name in params) {
        if (params[name] === null || params[name] === undefined) {
          delete params[name];
        }
      }
    }
    return this.params({filter: JSON.stringify(params)});
  }

  promise(): Promise<any> {
    return this.observableFact(this).toPromise();
  }

  observable(): Observable<any> {
    return this.observableFact(this);
  }

}
