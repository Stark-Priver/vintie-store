import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getAdminClient } from '@/lib/supabase';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    const supabase = getAdminClient();
    const { data: user } = await supabase
      .from('users')
      .select('id, email, full_name, is_admin, avatar, created_at')
      .eq('id', (session as { id: number }).id)
      .single();

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: 'Failed to get user' }, { status: 500 });
  }
}
