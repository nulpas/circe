import { NgModule } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
import { DropdownEventsDirective } from './dropdown-events.directive';
// import { ClickOutsideModule } from '@lunaeme/circe-click-outside';
import { BoxModelService, EventsService, ToolService } from '@lunaeme/circe-core';
import { CommonModule } from '@angular/common';

import {ClickOutsideModule} from '../../../click-outside/src/lib/click-outside.module';

@NgModule({
  exports: [
    DropdownComponent,
    DropdownEventsDirective
  ],
  declarations: [
    DropdownComponent,
    DropdownEventsDirective
  ],
  imports: [
    CommonModule,
    ClickOutsideModule
  ],
  providers: [
    ToolService,
    EventsService,
    BoxModelService
  ]
})
export class DropdownModule {}
