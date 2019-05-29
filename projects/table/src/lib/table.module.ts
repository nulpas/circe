import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { BrowserModule } from '@angular/platform-browser';
import { OrderModule } from 'ngx-order-pipe';
import { EventsService, ToolService } from '@lunaeme/circe-core';
import { SpinnerModule } from '@lunaeme/circe-spinner';

@NgModule({
  exports: [
    TableComponent
  ],
  declarations: [
    TableComponent
  ],
  imports: [
    BrowserModule,
    OrderModule,
    SpinnerModule
  ],
  providers: [
    ToolService,
    EventsService
  ]
})

export class TableModule {}
