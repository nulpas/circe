import { NgModule } from '@angular/core';
import { OnDomActivityDirective } from './on-dom-activity.directive';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  exports: [
    OnDomActivityDirective
  ],
  declarations: [
    OnDomActivityDirective
  ],
  imports: [
    BrowserModule
  ]
})

export class OnDomActivityModule {}
