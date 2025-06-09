import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { EventItem, EventItemCreate } from '../../core/models/event/event';
import { EventRepository } from '../../core/models/event/event-repository';
import { useOpenEventFormDialog } from '../../features/event-form/use-open-event-form-dialog';

@Component({
  selector: 'evnt-event-list',
  imports: [TableModule, Button],
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventList {
  private eventsRepository = inject(EventRepository);
  private destroyRef = inject(DestroyRef);

  protected events = this.eventsRepository.events;
  protected isListLoading = this.eventsRepository.isLoading;

  private openEventFormDialog = useOpenEventFormDialog();

  create() {
    this.openEventFormDialog({
      type: 'music',
    })
      .pipe(
        switchMap(event => {
          if (event) {
            return this.eventsRepository.createEvent(event);
          }
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  edit(event: EventItem) {
    let update$: Observable<EventItemCreate | undefined> | undefined;

    if (event.type === 'sport') {
      update$ = this.openEventFormDialog({
        type: 'sport',
        event,
      });
    }
    if (event.type === 'music') {
      update$ = this.openEventFormDialog({
        type: 'music',
        event,
      });
    }

    update$
      ?.pipe(
        switchMap(editedEvent => {
          if (editedEvent) {
            return this.eventsRepository.updateEvent(event.id, editedEvent);
          }
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  remove(id: number) {
    this.eventsRepository
      .deleteEvent(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
