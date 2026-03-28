import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    await requireAdmin();
    const { data, error } = await getAdminClient()
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data || []);
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 403 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    if (!body.code || !body.type || body.value === undefined) {
      return NextResponse.json({ error: 'code, type, and value are required' }, { status: 400 });
    }
    const { data, error } = await getAdminClient()
      .from('coupons')
      .insert({
        code: body.code.toUpperCase().trim(),
        type: body.type,
        value: Number(body.value),
        min_order: body.min_order ? Number(body.min_order) : null,
        max_uses: body.max_uses ? Number(body.max_uses) : null,
        expires_at: body.expires_at || null,
        is_active: body.is_active !== false,
      })
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 403 });
  }
}
