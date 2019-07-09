import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSelectComponent } from './input-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BoxModelService, EventsService } from '@lunaeme/circe-core';
import { DropdownModule } from '@lunaeme/circe-dropdown';
import { ClickOutsideModule } from '@lunaeme/circe-click-outside';

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
    ClickOutsideModule
  ],
  providers: [
    EventsService,
    BoxModelService
  ]
})
export class InputSelectModule {}
