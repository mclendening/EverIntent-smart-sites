/**
 * @fileoverview GHL Widget Configuration Endpoint
 * @description Returns the appropriate GHL widget ID based on route.
 *              Reads widget IDs from Supabase secrets, not exposed in client code.
 * 
 * @module functions/ghl-config
 * 
 * @endpoint GET /ghl-config?route=/some/path
 * @returns { widgetId: string }
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Route-to-widget mapping.
 * Routes are matched by prefix. First match wins.
 * Default (no match) uses 'sales' widget.
 */
const ROUTE_WIDGET_MAP: Array<{ prefix: string; envKey: string }> = [
  { prefix: '/localpros', envKey: 'GHL_WIDGET_ID_LOCALPROS' },
  { prefix: '/support', envKey: 'GHL_WIDGET_ID_SUPPORT' },
  { prefix: '/help', envKey: 'GHL_WIDGET_ID_SUPPORT' },
  { prefix: '/demo', envKey: 'GHL_WIDGET_ID_DEMO' },
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
