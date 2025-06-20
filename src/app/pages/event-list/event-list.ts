import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Button } from 'primeng/button';
import { ProgressBar } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { EMPTY, Observable, switchMap, tap } from 'rxjs';
import { EventItem, EventItemCreate } from '../../core/models/event/event';
import { EventRepository } from '../../core/models/event/event-repository';
import { useOpenEventFormDialog } from '../../features/event-form/use-open-event-form-dialog';

@Component({
  selector: 'evnt-event-list',
  imports: [TableModule, Button, ProgressBar],
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventList {
  private eventsRepository = inject(EventRepository);
  private destroyRef = inject(DestroyRef);

  protected events = this.eventsRepository.events;
  protected isListLoading = this.eventsRepository.isLoading;

  protected isCreating = signal(false);
  protected editingItemId = signal<number | null>(null);
  protected removingItemId = signal<number | null>(null);

  private openEventFormDialog = useOpenEventFormDialog();

  create() {
    this.openEventFormDialog({
      type: 'music',
    })
      .pipe(
        switchMap(event => {
          if (event) {
            this.isCreating.set(true);
            return this.eventsRepository.createEvent(event);
          }
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.isCreating.set(false));
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
        tap(editedEvent => {
          if (editedEvent) {
            this.editingItemId.set(event.id);
          }
        }),
        switchMap(editedEvent => {
          if (editedEvent) {
            return this.eventsRepository.updateEvent(event.id, editedEvent);
          }
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.editingItemId.set(null));
  }

  remove(id: number) {
    this.removingItemId.set(id);
    this.eventsRepository
      .deleteEvent(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.removingItemId.set(null));
  }
}
