import { ReactNode } from 'react';
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
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <MobileBottomBar />
      <DesktopChatButton />
      <GHLChatWidget />
      <CookieConsent />
    </div>
  );
}
