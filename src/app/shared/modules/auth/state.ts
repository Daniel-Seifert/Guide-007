export interface IAuthState {
  username: string;
  password: string;
}

export const AuthDefaultState = (): IAuthState => {
  return {
    username: null,
    password: null,
  };
};
