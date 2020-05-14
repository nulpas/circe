import {ModuleWithProviders, NgModule} from '@angular/core';
import { NotificationsComponent } from './notifications.component';
import { CommonModule } from '@angular/common';
import { BoxModelModule, EventsModule } from '@lunaeme/circe-core';
import { NotificationsService } from './notifications.service';

@NgModule({
  exports: [NotificationsComponent],
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    EventsModule.forChild(),
    BoxModelModule.forChild()
  ],
  providers: [NotificationsService]
})
export class NotificationsModule {
  public static forChild(): ModuleWithProviders<NotificationsModule> {
    return {
      ngModule: NotificationsModule,
      providers: [NotificationsService]
    };
  }
}
