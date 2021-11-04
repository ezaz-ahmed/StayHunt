export interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface UserInputForSignUp {
  name: string;
  email: string;
  phone: string;
  password: string;
  conPass: string;
}

export interface UserState {
  isLogged: boolean;
  loading: boolean;
  userId: string;
  user?: User;
}
