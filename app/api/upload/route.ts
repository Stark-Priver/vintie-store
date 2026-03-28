import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';
import { requireAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bucket = (formData.get('bucket') as string) || 'product-images';

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const bytes = await file.arrayBuffer();

    const { data, error } = await getAdminClient().storage
      .from(bucket)
      .upload(fileName, bytes, { contentType: file.type, upsert: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    const { data: { publicUrl } } = getAdminClient().storage.from(bucket).getPublicUrl(data.path);
    return NextResponse.json({ url: publicUrl, path: data.path });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
