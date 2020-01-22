import { NgModule } from '@angular/core';
import { DocumentationComponent } from './documentation.component';
import { CommonModule } from '@angular/common';
import { ColorSchemaModule } from './color-schema/color-schema.module';
import { RouterModule } from '@angular/router';
import { OrderModule } from '@core/external.elements';
import { DataService } from '../_services/data.service';
import { ToolService } from '@core/tool.service';
import { LayoutModule } from '../layout/layout.module';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { TypographyModule } from './typography/typography.module';
import { EventsService } from '@core/events.service';
import { IconsModule } from './icons/icons.module';

@NgModule({
  declarations: [DocumentationComponent],
  imports: [
    CommonModule,
    DocumentationRoutingModule,
    RouterModule,
    OrderModule,
    LayoutModule,
    ColorSchemaModule,
    TypographyModule,
    IconsModule
  ],
  providers: [
    DataService,
    ToolService,
    EventsService
  ]
})
export class DocumentationModule {}
