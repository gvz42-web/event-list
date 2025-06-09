import { MusicEvent, SportEvent } from '../../core/models/event/event';

export type EventFormDialogData =
  | { type: 'music'; event?: MusicEvent }
  | { type: 'sport'; event?: SportEvent };
