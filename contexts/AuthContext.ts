import { UserType } from '@/utils/types';
import { createContext } from 'react';

interface authContext {
  accessToken: string | null;
  user: UserType | null;
  login: (token: string) => void;
  logout: () => void;
  updateUser: (key: string, value: string) => void;
  cookieToken: string;
}

export const AuthContext = createContext<authContext>({} as authContext);
