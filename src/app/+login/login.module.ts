import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FormBehaviorModule } from '@form-behavior/form-behavior.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '@core/events.service';
import { ToolService } from '@core/tool.service';
import { DataModule } from '../_services/data/data.module';
import { LoginModule as LoginServicesModule } from '../_services/login/login.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormBehaviorModule,
    ReactiveFormsModule,
    DataModule.forChild(),
    LoginServicesModule.forChild()
  ],
  providers: [
    EventsService,
    ToolService
  ]
})
export class LoginModule {}
