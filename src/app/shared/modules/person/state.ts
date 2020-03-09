export interface IPersonEntry {
  avatarSource: string,
  name: string,
  room: string,
}

export interface IPersonState {
  persons: any
}

export const PersonDefaultState = (): IPersonState => {
  return {
    persons: {},
  };
};
