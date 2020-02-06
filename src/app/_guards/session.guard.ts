import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from '../_services/login/login.service';
import { DataService } from '../_services/data/data.service';
import { map } from 'rxjs/operators';
import { CheckToken } from '../_types/response.types';

@Injectable() export class SessionGuard implements CanActivate {
  constructor(private _login: LoginService, private _data: DataService, private _router: Router) {}

  private _goLogin(pass: boolean): boolean {
    if (!pass) {
      this._login.goRouter.next('/login');
    }
    return pass;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const _tokenIsSet: boolean = !!this._login.token;
    const _sessionToken: string = sessionStorage.getItem('token');
    if (!_tokenIsSet) {
      if (!!!_sessionToken) {
        return of(this._goLogin(false));
      }
      this._login.token = _sessionToken;
    }
    return this._data.checkToken().pipe(
      map((r: CheckToken) => {
        if (typeof r.status !== 'boolean' || !r.status) {
          sessionStorage.removeItem('token');
          this._login.goAfterLogin = state.url;
        }
        return this._goLogin(r.status);
      })
    );
  }
}
