import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './+home/home.module';
import { ConfigService } from './_config/config.service';
import { INITIALIZER } from './_config/initializer.config';
import { HttpClientModule } from '@angular/common/http';
import { ColorSchemaModule } from './+color-schema/color-schema.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    ColorSchemaModule
  ],
  providers: [
    ConfigService,
    INITIALIZER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
