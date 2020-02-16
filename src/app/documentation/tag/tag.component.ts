import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {Form, FormControl} from '@angular/forms';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent implements OnInit, OnDestroy {
  public tagSize: FormControl = new FormControl(1);
  public tagText: FormControl = new FormControl('Cool Tag');
  public tagStyle: FormControl = new FormControl(1);

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
