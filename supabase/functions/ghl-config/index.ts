/**
 * @fileoverview GHL Widget Configuration Endpoint (Future Multi-Widget Support)
 * @description Returns the appropriate GHL widget ID based on route.
 *              Reads widget IDs from Supabase secrets, not exposed in client code.
 * 
 * @module functions/ghl-config
 * 
 * @remarks
 * **Current State:** This edge function is deployed but NOT actively called by the frontend.
 * The site uses a single sitewide widget (GHL_WIDGET_ID_SALES) directly.
 * 
 * **Future Activation:** To enable multi-widget routing:
 * 1. Uncomment the edge function call in `src/lib/ghlLoader.ts` (`fetchWidgetIdForRoute`)
 * 2. Configure route prefixes below to match your page structure
 * 3. Ensure corresponding widget IDs are set in Supabase secrets
 * 
 * **Route Matching:** Routes are matched by prefix. First match wins.
 * If no route matches, the default sales widget is returned.
 * 
 * @endpoint GET /ghl-config?route=/some/path
 * @returns {{ widgetId: string }} Widget ID for the matched route
 * 
 * @example
 * // Fetch widget ID for a specific route
 * const response = await fetch('/functions/v1/ghl-config?route=/support/contact');
 * const { widgetId } = await response.json();
 * // Returns GHL_WIDGET_ID_SUPPORT
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Route-to-widget mapping configuration.
 * 
 * Routes are matched by prefix in order. First match wins.
 * Default (no match) returns the sales widget (GHL_WIDGET_ID_SALES).
 * 
 * @remarks
 * Add new route mappings here when enabling multi-widget support.
 * Each entry maps a route prefix to a Supabase secret containing the widget ID.
 * 
 * Example future mappings:
 * - /support/*, /help/* → Support Bot (FAQ, data requests)
 * - /demo/* → Demo Bot (feature showcase)
 * - /partner/* → Partner Bot (LocalPros inquiries)
 */
const ROUTE_WIDGET_MAP: Array<{ prefix: string; envKey: string }> = [
  // Future route mappings (currently all routes use default sales widget)
  { prefix: '/support', envKey: 'GHL_WIDGET_ID_SUPPORT' },
  { prefix: '/help', envKey: 'GHL_WIDGET_ID_SUPPORT' },
  { prefix: '/demo', envKey: 'GHL_WIDGET_ID_DEMO' },
  // { prefix: '/partner', envKey: 'GHL_WIDGET_ID_LOCALPROS' }, // Uncomment when LocalPros pages exist
];

/**
 * Gets the appropriate widget ID based on route.
 */
function getWidgetIdForRoute(pathname: string): string {
  for (const { prefix, envKey } of ROUTE_WIDGET_MAP) {
    if (pathname.startsWith(prefix)) {
      const widgetId = Deno.env.get(envKey);
      if (widgetId) return widgetId;
    }
  }
  
  // Default to sales widget
  return Deno.env.get('GHL_WIDGET_ID_SALES') || Deno.env.get('GHL_WIDGET_ID') || '';
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const route = url.searchParams.get('route') || '/';
    
    const widgetId = getWidgetIdForRoute(route);
    
    console.log(`[ghl-config] Route: ${route}, Widget ID: ${widgetId ? widgetId.substring(0, 8) + '...' : 'none'}`);
    
    return new Response(
      JSON.stringify({ widgetId }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        } 
      }
    );
  } catch (error) {
    console.error('[ghl-config] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
