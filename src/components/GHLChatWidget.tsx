import { useEffect } from 'react';
import { injectGHLScript, openGHLChat, closeGHLChat } from '@/lib/ghlLoader';

declare global {
  interface Window {
    toggleGHLChat?: () => void;
    closeGHLChat?: () => void;
  }
}

export function GHLChatWidget() {
  useEffect(() => {
    // Inject script immediately so widget is ready when needed
    injectGHLScript();

    window.toggleGHLChat = () => openGHLChat();
    window.closeGHLChat = () => closeGHLChat();

    return () => {
      delete window.toggleGHLChat;
      delete window.closeGHLChat;
    };
  }, []);

  return null;
}
