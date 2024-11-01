'use client';

import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { Token, User } from '@/utils/helpers';
import { getCookie } from 'cookies-next';

const tokenCtrl = new Token();
const userCtl = new User();

interface props {
  children: JSX.Element | JSX.Element[];
}

const AuthProvider = ({ children }: props) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = tokenCtrl.getToken();

      if (!token) {
        logout();
        setLoading(false);
        return;
      }

      if (tokenCtrl.hasExpired(token)) {
        logout();
      } else {
        await login(token);
      }
    })();
  }, []);

  const login = async (token: string) => {
    try {
      // Token
      tokenCtrl.setToken(token);
      setToken(token);
      // User
      const response = await userCtl.getMe();
      setUser(response);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const logout = () => {
    tokenCtrl.removeToken();
    setToken(null);
    setUser(null);
  };

  const updateUser = (key: string, value: string) => {
    setUser({
      ...user,
      [key]: value,
    });
  };
  const cookieToken = getCookie('token') as string

  const ctx = {
    accessToken: token,
    user: user,
    login: login,
    logout: logout,
    updateUser: updateUser,
    cookieToken: cookieToken
  };

  if (loading === true) return null;

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
