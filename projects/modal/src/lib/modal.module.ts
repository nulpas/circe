import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { ClickOutsideModule } from '@lunaeme/circe-click-outside';
import { BoxModelService, EventsService } from '@lunaeme/circe-core';

@NgModule({
  exports: [
    ModalComponent
  ],
  declarations: [
    ModalComponent
  ],
  imports: [
    BrowserModule,
    ClickOutsideModule
  ],
  providers: [
    BoxModelService,
    EventsService
  ]
})
export class ModalModule {}
