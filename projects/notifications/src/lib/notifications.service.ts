import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationsConfig } from './notifications.types';

@Injectable() export class NotificationsService {
  public trigger$: Subject<NotificationsConfig> = new Subject();

  constructor() {}
}
