/**
 * @fileoverview Main layout wrapper providing consistent page structure.
 * @module components/layout/Layout
 */

import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileBottomBar } from '@/components/MobileBottomBar';
import { CookieConsent } from '@/components/CookieConsent';
import { GHLChatWidget } from '@/components/GHLChatWidget';
import { DesktopChatButton } from '@/components/DesktopChatButton';
import { ClientOnly } from '@/components/ClientOnly';
import { AffiliateTracker } from '@/components/AffiliateTracker';

/**
 * Props for the Layout component.
 */
interface LayoutProps {
  /** Page content to render in the main area */
  children: ReactNode;
}

/**
 * Main page layout wrapper providing consistent structure across all marketing pages.
 * Includes header, footer, and client-only components for chat/consent functionality.
 * 
 * Structure:
 * - Header: Site navigation with logo and menu
 * - Main: Page content with bottom padding for mobile nav bar
 * - Footer: Multi-column navigation and branding
 * - Client-only: MobileBottomBar, DesktopChatButton, GHLChatWidget, CookieConsent
 * 
 * The client-only wrapper prevents SSR hydration mismatches for components
 * that depend on browser APIs (localStorage, window dimensions).
 * 
 * @component
 * @param {LayoutProps} props - Component props
 * @param {ReactNode} props.children - Page content to render
 * 
 * @example
 * <Layout>
 *   <HomePage />
 * </Layout>
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      
      {/* Browser-dependent components wrapped in ClientOnly to prevent hydration mismatches */}
      {/* These components use localStorage which doesn't exist during SSR */}
      <ClientOnly>
        <AffiliateTracker />
        <MobileBottomBar />
        <DesktopChatButton />
        <GHLChatWidget />
        <CookieConsent />
      </ClientOnly>
    </div>
  );
}
