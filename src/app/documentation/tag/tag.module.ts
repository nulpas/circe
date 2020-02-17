import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBehaviorModule } from '@form-behavior/form-behavior.module';
import { EventsService } from '@core/events.service';

@NgModule({
  declarations: [TagComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormBehaviorModule
  ],
  providers: [EventsService]
})
export class TagModule {}
