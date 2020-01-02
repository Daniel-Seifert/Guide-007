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
  }

  groups: string[];
  rooms: string[];
  teachers: string[];
  descriptions: string[];
  modules: string[];
  type: string;
}

export interface IEventState {
  // Map date formated as ISO 8601 string (YYYY-MM-DDTHH:mm:ss.sssZ) of event to list of events
  // i.e. 2011-10-05T14:48:00.000Z -> IEvent[]
  events: any;
}

export const EventDefaultState = (): IEventState => {
  return {
    events: {}
  };
};
