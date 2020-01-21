import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
  imports: [
    BrowserModule,
    RouterModule
  ]
})
export class HeaderModule {}
