import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { FormBehaviorModule } from '@form-behavior/form-behavior.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '@core/events/events.service';

@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormBehaviorModule
  ],
  providers: [EventsService]
})
export class InputModule {}
