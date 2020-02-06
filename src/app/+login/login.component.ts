import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginElement } from './login.types';
import { EventsService } from '@core/events.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Login, ResponseError } from '../_types/response.types';
import { DataService } from '../_services/data/data.service';
import { LoginService } from '../_services/login/login.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToolService } from '@core/tool.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  public stratioNameImage: string;
  public login: FormGroup;
  public sessionStore: FormControl;
  public submitFormActive: boolean;

  public errorMessage: string = '';
  public validationErrors: Array<ResponseError>;

  private _componentDestroyed$: Subject<undefined> = new Subject();

  constructor(
    public ev: EventsService,
    public tools: ToolService,
    private _data: DataService,
    private _login: LoginService,
    private _cd: ChangeDetectorRef
  ) {
    this.stratioNameImage = 'assets/stratio.svg';
    this.login = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('')
    });
    this.sessionStore = new FormControl(false);

    this.login.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((changes: LoginElement) => {
      this.validationErrors = [];
      this.submitFormActive = (changes.email !== '' && changes.password !== '' && this.login.controls.email.valid);
      _cd.markForCheck();
    });

    this.login.controls.email.valueChanges.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe(() => {
      this.errorMessage = '';
      if (this.login.controls.email.invalid) {
        this.errorMessage = 'Introduce valid email';
      }
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    document.getElementById('sds-login-user').focus();
  }

  public keyHandler(event: KeyboardEvent): void {
    this.ev.preventNeededEvent(event);
    if (event.key === 'Enter') {
      this.ev.preventNoNeededEvent(event);
      if (this.submitFormActive) {
        this.doLogin();
      }
    }
  }

  public doLogin(): void {
    this._data.login(this.login.value).pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((r: Login) => {
      this._login.token = r.token;
      this._login.goRouter.next();
      console.log('SESSION', this.sessionStore.value);
    }, (error: HttpErrorResponse) => {
      this.validationErrors = (Array.isArray(error.error)) ? error.error : [error.error];
      this._cd.markForCheck();
      console.log('ERRORS', error);
    });
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
