import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './+home/home.module';
import { ConfigService } from './_config/config.service';
import { INITIALIZER } from './_config/initializer.config';
import { HttpClientModule } from '@angular/common/http';
import { DocumentationModule } from './documentation/documentation.module';
import { LoginModule } from './+login/login.module';
import { DataModule } from './_services/data/data.module';
import { LoginModule as LoginServicesModule } from './_services/login/login.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    DocumentationModule,
    LoginModule,
    DataModule.forChild(),
    LoginServicesModule.forChild()
  ],
  providers: [
    ConfigService,
    INITIALIZER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
