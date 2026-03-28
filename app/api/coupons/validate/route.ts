import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { code, orderAmount } = await request.json();

    if (!code) return NextResponse.json({ error: 'Promo code is required' }, { status: 400 });

    const { data: coupon, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase().trim())
      .eq('is_active', true)
      .single();

    if (error || !coupon) {
      return NextResponse.json({ error: 'Invalid promo code' }, { status: 404 });
    }

    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return NextResponse.json({ error: 'This promo code has expired' }, { status: 400 });
    }

    if (coupon.max_uses && coupon.times_used >= coupon.max_uses) {
      return NextResponse.json({ error: 'This promo code has reached its usage limit' }, { status: 400 });
    }

    if (coupon.min_order && orderAmount < coupon.min_order) {
      return NextResponse.json({
        error: `Minimum order of ₦${Number(coupon.min_order).toLocaleString()} required for this code`
      }, { status: 400 });
    }

    const discount = coupon.type === 'percentage'
      ? (orderAmount * Number(coupon.value)) / 100
      : Number(coupon.value);

    return NextResponse.json({
      coupon: { code: coupon.code, type: coupon.type, value: coupon.value },
      discount: Math.min(discount, orderAmount),
    });
  } catch (e: unknown) {
    return NextResponse.json({ error: 'Failed to validate code' }, { status: 500 });
  }
}
