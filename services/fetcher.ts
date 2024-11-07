import { getCookie } from 'cookies-next';

const fetcher = (url: string) => {
  return fetch(url, {
    method: 'GET',
  }).then((res) => res.json()) as any;
};

export const authFetcher = (url: string) => {
  const token = getCookie('token');

  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json()) as any;
};

export default fetcher;
