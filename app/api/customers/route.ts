import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    await requireAdmin();
    const { data } = await getAdminClient()
      .from('users')
      .select('id, email, full_name, phone, is_admin, created_at')
      .eq('is_admin', false)
      .order('created_at', { ascending: false });
    return NextResponse.json(data || []);
  } catch (e: unknown) { return NextResponse.json({ error: (e as Error).message }, { status: 403 }); }
}
