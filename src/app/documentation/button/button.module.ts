import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { FormBehaviorModule } from '@form-behavior/form-behavior.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '@core/events/events.service';
import { SpinnerModule as SpinnerCirceModule } from '@spinner/spinner.module';

@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    FormBehaviorModule,
    ReactiveFormsModule,
    SpinnerCirceModule
  ],
  providers: [EventsService]
})
export class ButtonModule {}
