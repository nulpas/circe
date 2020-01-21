import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../_config/config.service';
import { Observable } from 'rxjs';
import { MenuGroup } from '../_types/response.types';

@Injectable() export class DataService extends ApiService {
  constructor(public http: HttpClient, public config: ConfigService) {
    super(http, config);
  }

  public getMenu(): Observable<Array<MenuGroup>> {
    return this.apiGet('menu.json', this.baseSecondaryEndPoint);
  }
}
