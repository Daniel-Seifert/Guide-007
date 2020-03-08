export interface IPersonEntry {
  name: string,
  avatarSrc: string,
}

export interface IPersonState {
  persons: any
}

export const PersonDefaultState = (): IPersonState => {
  return {
    persons: {}
  };
};
