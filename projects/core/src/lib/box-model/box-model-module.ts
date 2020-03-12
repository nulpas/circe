import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxModelService } from './box-model.service';

@NgModule({
  imports: [CommonModule]
})
export class BoxModelModule {
  public static forChild(): ModuleWithProviders<BoxModelModule> {
    return {
      ngModule: BoxModelModule,
      providers: [BoxModelService]
    };
  }
}
