import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { BoxModelService } from '@core/box-model.service';
import { LayoutModule } from '../layout/layout.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    LayoutModule
  ],
  providers: [BoxModelService]
})
export class HomeModule {}
