import useSWR from 'swr';
import fetcher from './fetcher';

export function useAddresses(url: string) {
  return useSWR<any>(url);
}
