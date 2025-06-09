import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { mockEvents } from './mock-data';

const mockDelay = 1000;

@Injectable({
  providedIn: 'root',
})
export class EventHttp {
  getAllEvents() {
    return of(mockEvents).pipe(delay(mockDelay));
  }

  getEventById(id: number) {
    const target = mockEvents.find(event => event.id === id);
    return of(target).pipe(delay(mockDelay));
  }
}
