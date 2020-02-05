import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { BoxModelService } from '@core/box-model.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [BoxModelService]
})
export class HomeModule {}
