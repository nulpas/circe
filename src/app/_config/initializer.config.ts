import { APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './config.service';

export function getConfigJson(config: ConfigService): any {
  return () => config.load('./assets/config.json');
}

export const INITIALIZER: any = {
  provide: APP_INITIALIZER,
  useFactory: getConfigJson,
  deps: [ ConfigService ],
  multi: true
};
