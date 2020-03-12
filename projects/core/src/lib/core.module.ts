import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolService } from './tool/tool.service';
import { BoxModelService } from './box-model/box-model.service';
import { EventsService } from './events/events.service';
import { CustomValidationService } from './custom-validation/custom-validation.service';

@NgModule({
  imports: [CommonModule]
})
export class CoreModule {
  public static forChild(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        BoxModelService,
        EventsService,
        CustomValidationService,
        ToolService
      ]
    };
  }
}
