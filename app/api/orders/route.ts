import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';
import { getSession, requireAdmin } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userOnly = searchParams.get('user') === 'true';

    if (userOnly) {
      const session = await getSession();
      if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      const { data } = await getAdminClient().from('orders').select('*').eq('user_id', (session as { id: number }).id).order('created_at', { ascending: false });
      return NextResponse.json(data || []);
    }

    await requireAdmin();
    const { data } = await getAdminClient().from('orders').select('*').order('created_at', { ascending: false });
    return NextResponse.json(data || []);
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 403 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    const body = await request.json();

    // Generate order ID
    const orderId = `#VT-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderData = {
      ...body,
      id: orderId,
      user_id: session ? (session as { id: number }).id : null,
      status: 'processing',
    };

    const { data, error } = await getAdminClient().from('orders').insert(orderData).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
