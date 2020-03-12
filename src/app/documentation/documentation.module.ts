import { NgModule } from '@angular/core';
import { DocumentationComponent } from './documentation.component';
import { CommonModule } from '@angular/common';
import { ColorSchemaModule } from './color-schema/color-schema.module';
import { RouterModule } from '@angular/router';
import { ToolService } from '@core/tool/tool.service';
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
import { TextareaModule } from './textarea/textarea.module';
import { UserInterfaceModule } from './user-interface/user-interface.module';
import { SelectModule } from './select/select.module';
import { ButtonModule } from './button/button.module';
import { SwitchModule } from './switch/switch.module';
import { TagModule } from './tag/tag.module';
import { SpinnerModule } from './spinner/spinner.module';
import { OverviewModule } from './overview/overview.module';
import { ThemesDemoModule } from './themes-demo/themes-demo.module';
import { SpaceBlueThemeOverviewModule } from './space-blue-theme-overview/space-blue-theme-overview.module';
import { OrderConditionModule } from '@core/order-condition/order-condition.module';
import { DropdownModule } from './dropdown/dropdown.module';

@NgModule({
  declarations: [DocumentationComponent],
  imports: [
    CommonModule,
    DocumentationRoutingModule,
    RouterModule,
    HeaderModule,
    ColorSchemaModule,
    TypographyModule,
    IconsModule,
    InputModule,
    RadioModule,
    CheckboxModule,
    PrinciplesModule,
    TextareaModule,
    UserInterfaceModule,
    SelectModule,
    ButtonModule,
    SwitchModule,
    TagModule,
    SpinnerModule,
    OverviewModule,
    OrderConditionModule,
    ThemesDemoModule,
    SpaceBlueThemeOverviewModule,
    DropdownModule,
    DataModule.forChild(),
    LoginServicesModule.forChild()
  ],
  providers: [ToolService]
})
export class DocumentationModule {}
