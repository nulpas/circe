import { NgModule } from '@angular/core';
import { DocumentationComponent } from './documentation.component';
import { CommonModule } from '@angular/common';
import { ColorSchemaModule } from './color-schema/color-schema.module';
import { RouterModule } from '@angular/router';
import { OrderModule } from '@core/external.elements';
import { DataService } from '../_services/data.service';
import { ToolService } from '@core/tool.service';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { TypographyModule } from './typography/typography.module';
import { IconsModule } from './icons/icons.module';
import { InputModule } from './input/input.module';

@NgModule({
  declarations: [DocumentationComponent],
  imports: [
    CommonModule,
    DocumentationRoutingModule,
    RouterModule,
    OrderModule,
    ColorSchemaModule,
    TypographyModule,
    IconsModule,
    InputModule
  ],
  providers: [
    DataService,
    ToolService
  ]
})
export class DocumentationModule {}
