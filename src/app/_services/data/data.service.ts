import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../_config/config.service';
import { Observable } from 'rxjs';
import { CheckToken, Icon, IconSectionsRequest, Login, MenuGroup } from '../../_types/response.types';
import { LoginElement } from '../../+login/login.types';

@Injectable() export class DataService extends ApiService {
  constructor(public http: HttpClient, public config: ConfigService) {
    super(http, config);
  }

  public checkToken(): Observable<CheckToken> {
    console.log('CHECK GUARD');
    return this.apiGet('check', this.baseMainEndPoint);
  }

  public login(requestBody: LoginElement): Observable<Login> {
    return this.apiPost('login', requestBody, this.baseMainEndPoint);
  }

  public getMenu(): Observable<Array<MenuGroup>> {
    return this.apiGet('menu.json', this.baseSecondaryEndPoint);
  }

  public getIconSections(): Observable<IconSectionsRequest> {
    return this.apiGet('icons-sections.json', this.baseSecondaryEndPoint);
  }

  public getIcons(): Observable<Array<Icon>> {
    return this.apiGet('icons.json', this.baseSecondaryEndPoint);
  }
}
