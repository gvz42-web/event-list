import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, switchMap, tap } from 'rxjs';
import { EventItemCreate } from './event';
import { EventHttp } from './event-http';

@Injectable({
  providedIn: 'root',
})
export class EventRepository {
  private eventHttp = inject(EventHttp);

  private reloadTrigger$ = new Subject<void>();

  isLoading = signal(true);

  events = toSignal(
    this.reloadTrigger$.pipe(
      switchMap(() =>
        this.eventHttp.getAllEvents().pipe(tap(() => this.isLoading.set(false)))
      )
    ),
    { initialValue: [] }
  );

  constructor() {
    this.reloadList();
  }

  reloadList() {
    this.reloadTrigger$.next();
  }

  createEvent(event: EventItemCreate) {
    return this.eventHttp.createEvent(event).pipe(tap(() => this.reloadList()));
  }

  updateEvent(id: number, event: EventItemCreate) {
    return this.eventHttp
      .updateEvent(id, event)
      .pipe(tap(() => this.reloadList()));
  }

  deleteEvent(id: number) {
    return this.eventHttp.deleteEvent(id).pipe(tap(() => this.reloadList()));
  }
}
