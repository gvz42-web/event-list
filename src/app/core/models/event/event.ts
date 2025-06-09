export type EventType = 'music' | 'sport';

export interface BaseEvent {
  id: number;
  name: string;
  description: string;
  location: string;
  type?: EventType;
}
export type BaseEventCreate = Omit<BaseEvent, 'id'>;

export interface SportEvent extends BaseEvent {
  type: 'sport';
  participants: number;
}
export type SportEventCreate = Omit<SportEvent, 'id'>;

export interface MusicEvent extends BaseEvent {
  type: 'music';
  genre: string;
}
export type MusicEventCreate = Omit<MusicEvent, 'id'>;

export type EventItem = SportEvent | MusicEvent;
export type EventItemCreate = SportEventCreate | MusicEventCreate;
