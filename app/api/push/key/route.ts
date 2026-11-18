import { json, supabaseConfigured } from '@/lib/server';
import { vapid } from '@/lib/push';

export const runtime = 'nodejs';

export async function GET() {
  if (!supabaseConfigured()) return json({ code: 'not_configured' }, 503);
  return new Response(JSON.stringify({ key: vapid().pub }), { headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=3600' } });
}
