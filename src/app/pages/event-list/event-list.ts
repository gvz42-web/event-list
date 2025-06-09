import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { EventRepository } from '../../core/models/event/event-repository';

@Component({
  selector: 'evnt-event-list',
  imports: [TableModule, Button],
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventList {
  private eventsRepository = inject(EventRepository);

  protected events = this.eventsRepository.events;
  protected isLoading = this.eventsRepository.isLoading;
}
