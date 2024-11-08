'use client';

import { Toaster } from '@/components/ui/toaster';
import { SWRConfig } from 'swr';
import fetcher from '@/services/fetcher';
import { CartContextProvider } from '../contexts/CartContext';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <CartContextProvider>
          {children}
          <Toaster />
        </CartContextProvider>
      </SWRConfig>
    </>
  );
};

export default Providers;
