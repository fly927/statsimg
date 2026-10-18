import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get('key');
  const expectedKey = process.env.API_KEY;

  if (!expectedKey || apiKey !== expectedKey) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const data = await request.json();

    const vortexGradient = `
      radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(50,10,60,1) 50%, rgba(10,50,20,1) 80%, rgba(10,10,10,1) 100%),
      linear-gradient(135deg, rgba(30,10,40,0.3) 0%, rgba(10,30,20,0.3) 100%)
    `;

    const textGlow = '0 0 10px rgba(255, 255, 255, 0.8), 0 0 5px rgba(255, 255, 255, 0.6)';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#0a0a0a',
            backgroundImage: vortexGradient,
            backgroundSize: 'cover',
            color: '#ffffff',
            fontFamily: 'monospace', // Stabile System-Monospace-Schrift
            padding: '60px 40px',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: '20px',
          }}
        >
          {/* Zeile 1: [<level>] [<rank>] <name> <ping>ms */}
          <div style={{
            fontSize: '36px',
            fontWeight: 'bold',
            textShadow: textGlow,
          }}>
            <span>[{data.level}]</span>{' '}
            <span style={{ color: '#aaa' }}>[{data.rank}]</span>{' '}
            <span style={{ color: '#fff' }}>{data.name}</span>{' '}
            <span style={{ color: '#aaa', fontSize: '28px' }}>({data.ping})</span>
          </div>

          {/* Zeile 2: Overall */}
          <div style={{
            fontSize: '42px',
            fontWeight: 'bold',
            borderBottom: '4px solid white',
            paddingBottom: '8px',
            marginBottom: '10px',
            textShadow: '0 0 12px rgba(255, 255, 255, 0.9)',
          }}>
            Overall
          </div>

          {/* Zeile 3: Finals / Deaths */}
          <div style={{
            fontSize: '32px',
            textShadow: textGlow,
          }}>
            Finals: {data.finals} / Deaths: {data.deaths}
          </div>

          {/* Zeile 4: FKDR */}
          <div style={{
            fontSize: '32px',
            textShadow: textGlow,
          }}>
            FKDR: <span style={{ color: '#00e676', fontWeight: 'bold' }}>{data.fkdr}</span>
          </div>

          {/* Zeile 5: Wins / Losses */}
          <div style={{
            fontSize: '32px',
            textShadow: textGlow,
          }}>
            Wins: {data.wins} / Losses: {data.losses}
          </div>

          {/* Zeile 6: WLR */}
          <div style={{
            fontSize: '32px',
            textShadow: textGlow,
          }}>
            WLR: <span style={{ color: '#2979ff', fontWeight: 'bold' }}>{data.wlr}</span>
          </div>
        </div>
      ),
      {
        width: 800,
        height: 600,
      },
    );
  } catch (error) {
    return new Response('Error generating image', { status: 500 });
  }
}
