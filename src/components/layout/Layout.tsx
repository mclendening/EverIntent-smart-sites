import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileBottomBar } from '@/components/MobileBottomBar';
import { CookieConsent } from '@/components/CookieConsent';
import { GHLChatWidget } from '@/components/GHLChatWidget';
import { DesktopChatButton } from '@/components/DesktopChatButton';
import { ClientOnly } from '@/components/ClientOnly';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      
      {/* Browser-dependent components wrapped in ClientOnly to prevent hydration mismatches */}
      {/* These components use localStorage which doesn't exist during SSR */}
      <ClientOnly>
        <MobileBottomBar />
        <DesktopChatButton />
        <GHLChatWidget />
        <CookieConsent />
      </ClientOnly>
    </div>
  );
}
