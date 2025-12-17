import { ReactNode, useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileBottomBar } from '@/components/MobileBottomBar';
import { CookieConsent } from '@/components/CookieConsent';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      {isMounted && (
        <>
          <MobileBottomBar />
          <CookieConsent />
        </>
      )}
    </div>
  );
}
