import { NgModule } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
import { DropdownEventsDirective } from './dropdown-events.directive';
import { ClickOutsideModule } from '@lunaeme/circe-click-outside';
import { CoreModule } from '@lunaeme/circe-core';
import { CommonModule } from '@angular/common';

@NgModule({
  exports: [
    DropdownComponent,
    DropdownEventsDirective
  ],
  declarations: [
    DropdownComponent,
    DropdownEventsDirective
  ],
  imports: [
    CommonModule,
    ClickOutsideModule,
    CoreModule.forChild()
  ]
})
export class DropdownModule {}
