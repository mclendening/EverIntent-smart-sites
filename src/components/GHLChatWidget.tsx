import { useEffect, useRef } from 'react';
import { ensureGHLWidget, openViaAnyAPI } from '@/lib/ghlLoader';

/**
 * GHLChatWidget - Sets up global toggle function but does NOT auto-load widget.
 * Widget is lazy-loaded on first click to prevent stock launcher from appearing.
 */
export function GHLChatWidget() {
  const widgetLoaded = useRef(false);
  const isLoading = useRef(false);

  useEffect(() => {
    // Set up global toggle function - lazy loads widget on first click
    window.toggleGHLChat = async () => {
      // If already loaded, just open
      if (widgetLoaded.current) {
        openViaAnyAPI();
        return;
      }

      // Prevent double-loading
      if (isLoading.current) return;
      isLoading.current = true;

      try {
        const locationId = import.meta.env.VITE_GHL_LOCATION_ID;
        if (!locationId) {
          console.warn('[GHL] VITE_GHL_LOCATION_ID not configured');
          return;
        }

        // Load widget for first time
        await ensureGHLWidget(locationId);
        widgetLoaded.current = true;

        // Small delay then open
        setTimeout(() => {
          openViaAnyAPI();
        }, 300);
      } catch (err) {
        console.error('[GHL] Failed to load widget:', err);
      } finally {
        isLoading.current = false;
      }
    };

    return () => {
      window.toggleGHLChat = undefined;
    };
  }, []);

  // This component doesn't render anything - GHL injects its own UI on demand
  return null;
}
