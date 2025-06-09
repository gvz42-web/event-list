import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { SportEventCreate } from '../../../core/models/event/event';
import { BaseEventFormComponent } from '../base-event-form/base-event-form';

@Component({
  selector: 'evnt-sport-event-form',
  imports: [ReactiveFormsModule, InputText, InputNumber, Button],
  templateUrl: './sport-event-form.html',
  styleUrl: '../base-event-form/base-event-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportEventFormComponent extends BaseEventFormComponent<SportEventCreate> {
  constructor() {
    super();
    this.form.addControl(
      'participants',
      new FormControl(0, { nonNullable: true })
    );
  }
}
