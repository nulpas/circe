import { NgModule } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
import { BrowserModule } from '@angular/platform-browser';
import { BoxModelService, EventsService, ToolService } from '@lunaeme/circe-core';
import { DropdownEventsDirective } from './dropdown-events.directive';
import { ClickOutsideModule } from '@lunaeme/circe-click-outside';

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
    BrowserModule,
    ClickOutsideModule
  ],
  providers: [
    ToolService,
    EventsService,
    BoxModelService
  ]
})
export class DropdownModule {}
