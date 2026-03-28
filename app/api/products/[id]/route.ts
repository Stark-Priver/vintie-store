import { NextResponse } from 'next/server';
import { getAdminClient, supabase } from '@/lib/supabase';
import { requireAdmin } from '@/lib/auth';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase.from('products').select('*').eq('id', params.id).single();
  if (error) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const body = await request.json();
    const { data, error } = await getAdminClient().from('products').update(body).eq('id', params.id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 403 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const { error } = await getAdminClient().from('products').delete().eq('id', params.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 403 });
  }
}
