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
            backgroundImage: 'radial-gradient(circle at center, #2e0828 0%, #0d010e 60%, #000000 100%)',
            color: '#ffffff',
            fontFamily: 'monospace',
            padding: '50px 40px',
            justifyContent: 'flex-start',
            gap: '16px',
          }}
        >
          {/* Header: [<level>][<rank>] <name> <ping>ms */}
          <div style={{ display: 'flex', fontSize: '32px', fontWeight: 'bold' }}>
            <span>[{data.level}]</span>
            <span>[{data.rank}]</span>
            <span style={{ marginLeft: '8px' }}>{data.name}</span>
            <span style={{ marginLeft: '8px' }}>{data.ping}ms</span>
          </div>

          {/* Section: Overall */}
          <div
            style={{
              display: 'flex',
              fontSize: '38px',
              fontWeight: 'bold',
              borderBottom: '3px solid #ffffff',
              paddingBottom: '4px',
              width: '180px',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            Overall
          </div>

          {/* Finals / Deaths */}
          <div style={{ display: 'flex', fontSize: '28px', fontWeight: 'bold' }}>
            Finals: {data.finals} / Deaths: {data.deaths}
          </div>

          {/* FKDR */}
          <div style={{ display: 'flex', fontSize: '28px', fontWeight: 'bold' }}>
            FKDR: {data.fkdr}
          </div>

          {/* Wins / Losses */}
          <div style={{ display: 'flex', fontSize: '28px', fontWeight: 'bold' }}>
            Wins: {data.wins} / Losses: {data.losses}
          </div>

          {/* WLR */}
          <div style={{ display: 'flex', fontSize: '28px', fontWeight: 'bold' }}>
            WLR: {data.wlr}
          </div>
        </div>
      ),
      {
        width: 800,
        height: 450,
      },
    );
  } catch (error) {
    return new Response('Error: ' + error.message, { status: 500 });
  }
}
