import { NgModule } from '@angular/core';
import { DocumentationComponent } from './documentation.component';
import { CommonModule } from '@angular/common';
import { ColorSchemaModule } from './color-schema/color-schema.module';
import { RouterModule } from '@angular/router';
import { OrderModule } from '@core/external.elements';
import { ToolService } from '@core/tool.service';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { TypographyModule } from './typography/typography.module';
import { IconsModule } from './icons/icons.module';
import { InputModule } from './input/input.module';
import { RadioModule } from './radio/radio.module';
import { CheckboxModule } from './checkbox/checkbox.module';
import { HeaderModule } from '../header/header.module';
import { PrinciplesModule } from './principles/principles.module';
import { DataModule } from '../_services/data/data.module';
import { LoginModule as LoginServicesModule } from '../_services/login/login.module';

@NgModule({
  declarations: [DocumentationComponent],
  imports: [
    CommonModule,
    DocumentationRoutingModule,
    RouterModule,
    HeaderModule,
    OrderModule,
    ColorSchemaModule,
    TypographyModule,
    IconsModule,
    InputModule,
    RadioModule,
    CheckboxModule,
    PrinciplesModule,
    DataModule.forChild(),
    LoginServicesModule.forChild()
  ],
  providers: [ToolService]
})
export class DocumentationModule {}
