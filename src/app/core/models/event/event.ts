export interface BaseEvent {
  id: number;
  name: string;
  description: string;
  location: string;
  type: 'music' | 'sport';
}

export interface SportEvent extends BaseEvent {
  type: 'sport';
  participants: number;
}

export interface MusicEvent extends BaseEvent {
  type: 'music';
  genre: string;
}

export type EventItem = SportEvent | MusicEvent;
