'use client';

import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/contexts/AuthProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </>
  );
};

export default Providers;
