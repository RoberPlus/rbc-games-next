import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Providers from './providers';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['vietnamese'] });

export const metadata: Metadata = {
  title: 'RBC Games',
  description: 'A digital marketplace that sells digital entertainment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased dark`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
