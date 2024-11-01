'use client';

import { ENV } from './constants';
import { jwtDecode } from 'jwt-decode';
import { UserType } from './types';
import { getCookie, hasCookie, deleteCookie } from 'cookies-next';

export class Token {
  setToken(token: string) {
    window.localStorage.setItem(ENV.TOKEN, token);
  }

  getToken() {
    return getCookie(ENV.TOKEN);
  }

  removeToken() {
    deleteCookie('token');
  }

  hasExpired(token: string): boolean {
    const decodedToken: any = jwtDecode(token);
    const expirationTime: number = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if (currentTime > expirationTime) {
      return true;
    }

    return false;
  }
}

export class User {
  async getMe(): Promise<UserType | any> {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER_ME}`;

      const response = await authFetch({ url, params: {} });
      const result = await response.json();
      if (response.status !== 200) throw Error;

      return result;
    } catch (error) {
      throw error;
    }
  }
}

export async function authFetch({ url, params }: { url: string; params: any }): Promise<any> {
  const tokenCtrl = new Token();
  const token = tokenCtrl.getToken();

  const logout = () => {
    tokenCtrl.removeToken();
    window.location.replace('/');
  };

  if (!token) {
    return logout();
  } else {
    if (tokenCtrl.hasExpired(token)) {
      return logout();
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        return await fetch(url, paramsTemp);
      } catch (error) {
        return error;
      }
    }
  }
}
