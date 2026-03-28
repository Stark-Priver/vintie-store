import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', background: '#faf9f7', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0 }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '6rem', fontWeight: 500, color: '#111110', lineHeight: 1, marginBottom: '1rem' }}>404</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 400, color: '#111110', marginBottom: '0.5rem' }}>Page not found</h1>
          <p style={{ color: '#8a867e', fontSize: '0.875rem', marginBottom: '2rem' }}>The page you&apos;re looking for doesn&apos;t exist.</p>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.75rem', background: '#111110', color: '#faf9f7', textDecoration: 'none', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
            Back to Home
          </a>
        </div>
      </body>
    </html>
  );
}
