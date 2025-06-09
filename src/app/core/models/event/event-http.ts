import { Injectable } from '@angular/core';
import { delay, of, throwError } from 'rxjs';
import { EventItem, EventItemCreate } from './event';
import { mockEvents } from './mock-data';

const mockDelay = 1000;

const clone = <T>(data: T): T => JSON.parse(JSON.stringify(data));

@Injectable({
  providedIn: 'root',
})
export class EventHttp {
  events = mockEvents;

  getAllEvents() {
    return of(clone(this.events)).pipe(delay(mockDelay));
  }

  getEventById(id: number) {
    const target = this.events.find(event => event.id === id);
    return of(clone(target)).pipe(delay(mockDelay));
  }

  createEvent(event: EventItemCreate) {
    const maxId = this.events.reduce((maxId, { id }) => {
      if (id > maxId) {
        return id;
      }
      return maxId;
    }, 0);

    const newEvent: EventItem = {
      id: maxId,
      ...event,
    };

    this.events.push(newEvent);

    return of(clone(newEvent)).pipe(delay(mockDelay));
  }

  updateEvent(id: number, event: EventItemCreate) {
    const index = this.events.findIndex(item => item.id == id);

    if (index === -1) {
      return throwError(() => 'Not found');
    }

    const updatedEvent: EventItem = {
      ...this.events[index],
      ...event,
    };

    this.events[index] = updatedEvent;

    return of(clone(updatedEvent)).pipe(delay(mockDelay));
  }

  deleteEvent(id: number) {
    const index = this.events.findIndex(item => item.id == id);

    if (index === -1) {
      return throwError(() => 'Not found');
    }

    const targetEvent = this.events[index];

    this.events = this.events.filter(event => event.id !== id);

    return of(clone(targetEvent)).pipe(delay(mockDelay));
  }
}
