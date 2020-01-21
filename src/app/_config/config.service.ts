import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable() export class ConfigService {
  get config(): any {
    return this._config;
  }
  set config(data: any) {
    this._config = data;
  }

  private _config: any;

  constructor(private _http: HttpClient) {}

  public load(url: string): Promise<any> {
    return this._http.get(url)
      .toPromise()
      .then((data: any) => this.config = data);
  }
}
