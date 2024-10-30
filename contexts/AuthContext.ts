import { createContext } from 'react';

interface Object<T> {
  [key: string]: T;
}

interface authContext {
  accessToken: string | null;
  user: Object<string> | null;
  login: (token: string) => void;
  logout: () => void;
  updateUser: (key: string, value: string) => void;
}

export const AuthContext = createContext<authContext>({} as authContext);
