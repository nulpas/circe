import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';

@NgModule({
  imports: [CommonModule]
})
export class DataModule {
  public static forChild() {
    return {
      ngModule: DataModule,
      providers: [DataService]
    }
  }
}
