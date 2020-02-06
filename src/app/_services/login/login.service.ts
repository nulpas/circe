import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../data/data.service';

@Injectable() export class LoginService {
  public get token(): string {
    return this._token;
  }
  public set token(token: string) {
    this._token = token;
    sessionStorage.setItem('token', token);
    this._data.httpOptions.headers = this._data.httpOptions.headers.set('Authorization', `Bearer ${token}`);
    this._data.httpOptionsSimple = { ...this._data.httpOptionsSimple, headers: { Authorization: `Bearer ${token}` } };
  }

  public goAfterLogin: string;
  public goRouter: Subject<string | undefined> = new Subject();

  private _token: string;

  constructor(private _data: DataService, private _router: Router) {
    this.goAfterLogin = '/';

    this.goRouter.subscribe((r: string | undefined) => {
      const _where: string = (!!r) ? r : this.goAfterLogin;
      _router.navigateByUrl(_where).then();
    });
  }
}
