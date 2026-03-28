import { NextResponse } from 'next/server';
import { getAdminClient, supabase } from '@/lib/supabase';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  const { data, error } = await supabase.from('categories').select('*').order('name');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const { data, error } = await getAdminClient().from('categories').insert(body).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 403 });
  }
}
