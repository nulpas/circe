import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../header/header.module';
import { DataService } from '../_services/data.service';
import { ToolService } from '@core/tool.service';
import { RouterModule } from '@angular/router';
import { OrderModule } from '@core/external.elements';

@NgModule({
  exports: [LayoutComponent],
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    OrderModule
  ],
  providers: [
    DataService,
    ToolService
  ]
})
export class LayoutModule {}
