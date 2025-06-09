import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormRecord,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { map } from 'rxjs';
import { BaseEventCreate } from '../../../core/models/event/event';

@Component({
  selector: 'evnt-base-event-form',
  imports: [InputText, ReactiveFormsModule],
  templateUrl: './base-event-form.html',
  styleUrl: './base-event-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseEventFormComponent<T extends BaseEventCreate> {
  readonly initialValue = input<T>();
  readonly submit = output<T>();

  protected form = new FormRecord<FormControl<string> | FormControl<number>>({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
      ],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [Validators.maxLength(200)],
      nonNullable: true,
    }),
    location: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ],
      nonNullable: true,
    }),
  });

  protected isFormInvalid = toSignal(
    this.form.statusChanges.pipe(map(status => status === 'INVALID')),
    { initialValue: false }
  );

  private initalValueEffect = effect(() => {
    const initialValue = this.initialValue();
    if (initialValue) {
      this.form.patchValue(initialValue);
    }
  });

  protected submitForm() {
    if (this.form.valid) {
      const formValue = this.form.value as T;
      this.submit.emit(formValue);
    }
  }
}
