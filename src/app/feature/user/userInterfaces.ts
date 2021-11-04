export interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface ConfirmUser {
  userId: string;
  otp: string;
}

export interface UserInputForSignUp {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface UserState {
  isLogged: boolean;
  loading: boolean;
  userId: string;
  user?: User;
}
