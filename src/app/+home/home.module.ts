import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { BoxModelService } from '@core/box-model.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule],
  providers: [BoxModelService]
})
export class HomeModule {}
