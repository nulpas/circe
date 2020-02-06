import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';

@NgModule({
  imports: [CommonModule]
})
export class LoginModule {
  public static forChild() {
    return {
      ngModule: LoginModule,
      providers: [LoginService]
    }
  }
}
