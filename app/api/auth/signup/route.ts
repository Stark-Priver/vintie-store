import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getAdminClient } from '@/lib/supabase';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password, fullName } = await request.json();
    if (!email || !password || !fullName) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const supabase = getAdminClient();
    const { data: existing } = await supabase.from('users').select('id').eq('email', email).single();
    if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 12);
    const { data: user, error } = await supabase
      .from('users')
      .insert({ email, password: hashedPassword, full_name: fullName, is_admin: false })
      .select('id, email, full_name, is_admin')
      .single();

    if (error) throw error;

    const token = await signToken({ id: user.id, email: user.email, is_admin: user.is_admin });
    cookies().set('vintie_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
