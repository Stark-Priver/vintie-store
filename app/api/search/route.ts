import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase
    .from('products')
    .select('id, name, price, image, category, badge')
    .or(`name.ilike.%${query}%,category.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false })
    .limit(8);

  if (error) return NextResponse.json([]);
  return NextResponse.json(data || []);
}
