import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { NotificationsModule as NotificationsCirceModule } from '@notifications/notifications.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsModule } from '@core/events/events.module';
import { FormBehaviorModule } from '@form-behavior/form-behavior.module';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    NotificationsCirceModule,
    ReactiveFormsModule,
    FormBehaviorModule,
    EventsModule.forChild()
  ]
})
export class NotificationsModule {}
