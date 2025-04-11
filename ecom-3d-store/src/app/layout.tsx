import './globals.css';
import { ReactNode } from 'react';
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper';
import Providers from './providers';

export const metadata = {
  title: '3D E-Commerce Store',
  description: 'Experience products in 3D before you buy!',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
