'use client';

import { AuthProvider } from '@/contexts/auth-provider';
import ThemeProvider from '../contexts/theme-provider';
import { Toaster } from '@/components/ui/toaster';

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
