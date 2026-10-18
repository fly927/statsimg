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

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'radial-gradient(circle at center, rgba(80, 20, 100, 0.4) 0%, rgba(20, 5, 25, 0.9) 60%, rgba(0,0,0,1) 100%)',
            color: '#ffffff',
            fontFamily: 'monospace',
            padding: '60px 40px',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: '20px',
          }}
        >
          {/* Zeile 1: Level, Rank, Name, Ping */}
          <div style={{ display: 'flex', fontSize: '32px', fontWeight: 'bold' }}>
            <span>[{data.level}]</span>
            <span>[{data.rank}]</span>
            <span style={{ marginLeft: '10px' }}>{data.name}</span>
            <span style={{ marginLeft: '10px' }}>{data.ping}ms</span>
          </div>

          {/* Zeile 2: Overall */}
          <div style={{ display: 'flex', fontSize: '38px', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }}>
            Overall
          </div>

          {/* Zeile 3: Finals / Deaths */}
          <div style={{ display: 'flex', fontSize: '28px' }}>
            Finals: {data.finals} / Deaths: {data.deaths}
          </div>

          {/* Zeile 4: FKDR */}
          <div style={{ display: 'flex', fontSize: '28px' }}>
            FKDR: {data.fkdr}
          </div>

          {/* Zeile 5: Wins / Losses */}
          <div style={{ display: 'flex', fontSize: '28px' }}>
            Wins: {data.wins} / Losses: {data.losses}
          </div>

          {/* Zeile 6: WLR */}
          <div style={{ display: 'flex', fontSize: '28px' }}>
            WLR: {data.wlr}
          </div>
        </div>
      ),
      {
        width: 800,
        height: 600,
      },
    );
  } catch (error) {
    return new Response('Error: ' + error.message, { status: 500 });
  }
}
