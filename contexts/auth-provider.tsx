import { useState } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (token: any) => {
    try {
      setToken(token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const ctx = {
    accessToken: token,
    user: user,
    login: login,
    logout: null,
    updateUser: null,
  };

  if (loading) return null;

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
}
