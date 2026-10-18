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
            color: '#ffffff',
            padding: '60px 40px',
            justifyContent: 'flex-start',
            gap: '20px',
          }}
        >
          {/* Zeile 1: Level, Rank, Name, Ping */}
          <div style={{ display: 'flex', fontSize: '36px', fontWeight: 'bold' }}>
            <span>[{data.level}]</span>{' '}
            <span style={{ color: '#aaaaaa', marginLeft: '10px' }}>[{data.rank}]</span>{' '}
            <span style={{ color: '#ffffff', marginLeft: '10px' }}>{data.name}</span>{' '}
            <span style={{ color: '#aaaaaa', marginLeft: '10px' }}>({data.ping})</span>
          </div>

          {/* Zeile 2: Overall */}
          <div style={{ display: 'flex', fontSize: '42px', fontWeight: 'bold', borderBottom: '4px solid white', paddingBottom: '8px', marginBottom: '10px' }}>
            Overall
          </div>

          {/* Zeile 3: Finals / Deaths */}
          <div style={{ display: 'flex', fontSize: '32px' }}>
            Finals: {data.finals} / Deaths: {data.deaths}
          </div>

          {/* Zeile 4: FKDR */}
          <div style={{ display: 'flex', fontSize: '32px' }}>
            FKDR: <span style={{ color: '#00e676', marginLeft: '10px', fontWeight: 'bold' }}>{data.fkdr}</span>
          </div>

          {/* Zeile 5: Wins / Losses */}
          <div style={{ display: 'flex', fontSize: '32px' }}>
            Wins: {data.wins} / Losses: {data.losses}
          </div>

          {/* Zeile 6: WLR */}
          <div style={{ display: 'flex', fontSize: '32px' }}>
            WLR: <span style={{ color: '#2979ff', marginLeft: '10px', fontWeight: 'bold' }}>{data.wlr}</span>
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
