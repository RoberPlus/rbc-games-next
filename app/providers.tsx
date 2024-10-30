'use client';

import ThemeProvider from '../contexts/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/contexts/AuthProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};

export default Providers;
