import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function POST(request) {
  // 1. API-Key aus dem Authorization-Header auslesen
  const authHeader = request.headers.get('authorization');
  const expectedKey = process.env.API_KEY;

  // Prüfen, ob der Key übereinstimmt
  if (!expectedKey || authHeader !== `Bearer ${expectedKey}`) {
    return new Response('Unauthorized: Ungültiger oder fehlender API-Key', { status: 401 });
  }

  try {
    const data = await request.json();

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '60px',
            fontFamily: 'sans-serif',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 24, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Statistik Übersicht
            </span>
            <span style={{ fontSize: 48, fontWeight: 'bold', marginTop: '10px' }}>
              Live Kennzahlen
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            {Object.entries(data).map(([key, value]) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#1e293b',
                  padding: '20px 30px',
                  borderRadius: '12px',
                }}
              >
                <span style={{ fontSize: 28, color: '#cbd5e1' }}>{key}</span>
                <span style={{ fontSize: 32, fontWeight: 'bold', color: '#38bdf8' }}>
                  {String(value)}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 18, color: '#64748b' }}>
            Generiert via Vercel & Cloudflare
          </div>
        </div>
      ),
      {
        width: 800,
        height: 600,
      },
    );
  } catch (error) {
    return new Response('Fehler beim Generieren des Bildes', { status: 500 });
  }
}
