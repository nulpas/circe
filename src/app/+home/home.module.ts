import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { BoxModelService } from '@core/box-model.service';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    BrowserModule,
    LayoutModule
  ],
  providers: [BoxModelService]
})
export class HomeModule {}
