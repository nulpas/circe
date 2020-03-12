import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from './events.service';
import { BoxModelModule } from '../box-model/box-model-module';

@NgModule({
  imports: [
    CommonModule,
    BoxModelModule.forChild()
  ]
})
export class EventsModule {
  public static forChild(): ModuleWithProviders<EventsModule> {
    return {
      ngModule: EventsModule,
      providers: [EventsService]
    };
  }
}
