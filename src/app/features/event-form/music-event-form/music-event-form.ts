import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { MusicEventCreate } from '../../../core/models/event/event';
import { BaseEventFormComponent } from '../base-event-form/base-event-form';

@Component({
  selector: 'evnt-music-event-form',
  imports: [ReactiveFormsModule, InputText, Button],
  templateUrl: './music-event-form.html',
  styleUrl: '../base-event-form/base-event-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicEventFormComponent extends BaseEventFormComponent<MusicEventCreate> {
  constructor() {
    super();
    this.form.addControl(
      'genre',
      new FormControl('', {
        validators: [Validators.minLength(3), Validators.maxLength(20)],
        nonNullable: true,
      })
    );
  }
}
