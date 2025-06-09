import { inject } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { EventItemCreate } from '../../core/models/event/event';
import { EventFormDialog } from './event-form-dialog';
import { EventFormDialogData } from './event-form-dialog-data';

export const useOpenEventFormDialog = () => {
  const dialogService = inject(DialogService);

  return (data: EventFormDialogData): Observable<EventItemCreate | undefined> =>
    dialogService.open<EventFormDialog, EventFormDialogData>(EventFormDialog, {
      data,
      modal: true,
      dismissableMask: true,
      focusOnShow: false,
    }).onClose;
};
