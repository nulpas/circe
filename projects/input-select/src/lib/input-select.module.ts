import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSelectComponent } from './input-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BoxModelService, EventsService } from '@lunaeme/circe-core';
import { DropdownModule } from '@lunaeme/circe-dropdown';
import { KeyboardEventsEmitterModule } from '@lunaeme/circe-keyboard-events-emitter';

@NgModule({
  declarations: [
    InputSelectComponent
  ],
  exports: [
    InputSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    KeyboardEventsEmitterModule
  ],
  providers: [
    EventsService,
    BoxModelService
  ]
})
export class InputSelectModule {}
