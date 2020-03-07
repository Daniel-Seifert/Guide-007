export interface IEventEntry {
  expiryTime: Date;
  data: IEvent[];
}

export interface IEvent {
  duration: {
    from: Date;
    to: Date;
  };

  changed: {
    plan?: boolean;
    room?: boolean;
    moved?: boolean;
    canceled?: boolean;
    description?: string;
  };

  groups: string[];
  rooms: string[];
  teachers: string[];
  descriptions: string[];
  modules: string[];
  type: string;
  weekday: string;
}

export interface IEventState {
  // Map date formated as ISO 8601 string (YYYY-MM-DDTHH:mm:ss.sssZ) of event to list of events
  // i.e. 2020-10 -> IEventEntry
  events: any;
  selection: Date;
  maxCacheDays: number;
}

export const EventDefaultState = (): IEventState => {
  return {
    events: {},
    selection: new Date(),
    maxCacheDays: 1,
  };
};
