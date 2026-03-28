import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';
import { requireAdmin } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const body = await request.json();
    const { data, error } = await getAdminClient().from('categories').update(body).eq('id', params.id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (e: unknown) { return NextResponse.json({ error: (e as Error).message }, { status: 403 }); }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    await getAdminClient().from('categories').delete().eq('id', params.id);
    return NextResponse.json({ success: true });
  } catch (e: unknown) { return NextResponse.json({ error: (e as Error).message }, { status: 403 }); }
}
