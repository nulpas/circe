import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomValidationService } from './custom-validation.service';

@NgModule({
  imports: [CommonModule]
})
export class CustomValidationModule {
  public static forChild(): ModuleWithProviders<CustomValidationModule> {
    return {
      ngModule: CustomValidationModule,
      providers: [CustomValidationService]
    };
  }
}
