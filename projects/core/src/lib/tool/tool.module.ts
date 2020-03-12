import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolService } from './tool.service';

@NgModule({
  imports: [CommonModule]
})
export class ToolModule {
  public static forChild(): ModuleWithProviders<ToolModule> {
    return {
      ngModule: ToolModule,
      providers: [ToolService]
    };
  }
}
