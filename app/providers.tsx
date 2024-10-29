'use client';

import ThemeProvider from '../contexts/theme-provider';
import { Toaster } from '@/components/ui/toaster';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </>
  );
};

export default Providers;
