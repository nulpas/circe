import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { BoxModelService, EventsService } from '@lunaeme/circe-core';
import { ClickOutsideModule } from '@lunaeme/circe-click-outside';

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
