import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderModule } from '../header/header.module';
import { DataService } from '../_services/data.service';
import { ToolService } from '@core/tool.service';
import { RouterModule } from '@angular/router';
import { EventsService } from '@core/events.service';

@NgModule({
  exports: [LayoutComponent],
  declarations: [LayoutComponent],
  imports: [
    BrowserModule,
    RouterModule,
    HeaderModule
  ],
  providers: [
    DataService,
    ToolService,
    EventsService
  ]
})
export class LayoutModule {}
