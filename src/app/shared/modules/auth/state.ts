export interface IAuthState {
  username: string;
  password: string;
  loginCSRFToken: string;
}

export const AuthDefaultState = (): IAuthState => {
  return {
    username: null,
    password: null,
    loginCSRFToken: null,
  };
};
