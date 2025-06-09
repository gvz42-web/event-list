import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, switchMap, tap } from 'rxjs';
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
}
