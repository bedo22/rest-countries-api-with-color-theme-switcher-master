import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Nunito_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Header } from '@/components/Header';
import './globals.css';

const nunitoSans = Nunito_Sans({
  weight: ['300', '600', '800'],
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Where in the world?',
  description: 'REST Countries API with color theme switcher',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning
        className={`${nunitoSans.variable} font-sans min-h-screen bg-light-bg text-light-text antialiased dark:bg-dark-bg dark:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="rest-countries-theme"
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
