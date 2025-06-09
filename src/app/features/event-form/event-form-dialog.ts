import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectButton } from 'primeng/selectbutton';
import { EventItemCreate, EventType } from '../../core/models/event/event';
import { EventFormDialogData } from './event-form-dialog-data';
import { MusicEventFormComponent } from './music-event-form/music-event-form';
import { SportEventFormComponent } from './sport-event-form/sport-event-form';

@Component({
  selector: 'evnt-form-dialog',
  templateUrl: './event-form-dialog.html',
  styleUrl: './event-form-dialog.scss',
  imports: [
    SportEventFormComponent,
    MusicEventFormComponent,
    SelectButton,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFormDialog {
  private dialogRef = inject(DynamicDialogRef);
  private data =
    inject<DynamicDialogConfig<EventFormDialogData>>(DynamicDialogConfig).data;

  protected event = this.data?.event;
  protected isEdit = !!this.event;

  protected type = signal(this.data?.type || 'music');

  protected typeOptions: { value: EventType; label: string }[] = [
    {
      value: 'sport',
      label: 'Спорт',
    },
    {
      value: 'music',
      label: 'Музыка',
    },
  ];

  close(event: EventItemCreate) {
    this.dialogRef.close(event);
  }
}
