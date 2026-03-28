import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';
import { getSession } from '@/lib/auth';

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { full_name, phone } = await request.json();
    if (!full_name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const updates: Record<string, string> = { full_name: full_name.trim() };
    if (phone !== undefined) updates.phone = phone.trim();

    const { data, error } = await getAdminClient()
      .from('users')
      .update(updates)
      .eq('id', (session as { id: number }).id)
      .select('id, email, full_name, is_admin')
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ user: data });
  } catch (e: unknown) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
