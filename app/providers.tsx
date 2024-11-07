'use client';

import { Toaster } from '@/components/ui/toaster';
import { SWRConfig } from 'swr';
import fetcher from '@/services/fetcher';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        {children}
        <Toaster />
      </SWRConfig>
    </>
  );
};

export default Providers;
