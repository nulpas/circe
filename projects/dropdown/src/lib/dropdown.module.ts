import { NgModule } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
import { BrowserModule } from '@angular/platform-browser';
import { EventsService, ToolService } from '@lunaeme/circe-core';
import { ClickOutsideModule } from '@lunaeme/circe-click-outside';

@NgModule({
  exports: [
    DropdownComponent
  ],
  declarations: [
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    ClickOutsideModule
  ],
  providers: [
    ToolService,
    EventsService
  ]
})

export class DropdownModule {}
