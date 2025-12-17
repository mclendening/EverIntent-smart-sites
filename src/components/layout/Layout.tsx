import { ReactNode, useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileBottomBar } from '@/components/MobileBottomBar';
import { CookieConsent } from '@/components/CookieConsent';
import { GHLChatWidget } from '@/components/GHLChatWidget';
import { DesktopChatButton } from '@/components/DesktopChatButton';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Only render client-side components after mount to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col" suppressHydrationWarning>
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      {/* Client-only components that depend on localStorage/cookies */}
      {isMounted && (
        <>
          <MobileBottomBar />
          <DesktopChatButton />
          <GHLChatWidget />
          <CookieConsent />
        </>
      )}
    </div>
  );
}
