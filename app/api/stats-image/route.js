import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// VT323 Schriftart von Google Fonts laden (schön pixelig)
const fontData = fetch(new URL('https://fonts.gstatic.com/s/vt323/v17/pxiByp8kv8JHgFVrFJDS.ttf')).then((res) =>
  res.arrayBuffer(),
);

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get('key');
  const expectedKey = process.env.API_KEY;

  if (!expectedKey || apiKey !== expectedKey) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const data = await request.json();

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
            backgroundImage: 'radial-gradient(circle at center, rgba(80, 20, 100, 0.4) 0%, rgba(20, 5, 25, 0.9) 60%, rgba(0,0,0,1) 100%), linear-gradient(135deg, rgba(30,10,40,0.3) 0%, rgba(10,30,20,0.3) 100%)',
            backgroundSize: 'cover',
            color: '#ffffff',
            fontFamily: '"VT323", monospace',
            padding: '60px 40px',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: '20px',
          }}
        >
          {/* Zeile 1: [<level>][<rank>] <name> <ping>ms */}
          <div style={{
            display: 'flex',
            fontSize: '32px',
            fontWeight: 'normal',
            textShadow: textGlow,
          }}>
            <span>[{data.level}]</span>
            <span>[{data.rank}]</span>
            <span style={{ marginLeft: '10px' }}>{data.name}</span>
            <span style={{ marginLeft: '10px' }}>{data.ping}ms</span>
          </div>

          {/* Zeile 2: Overall (Komplett ohne Unterstreichung oder Balken) */}
          <div
            style={{
              display: 'flex',
              fontSize: '38px',
              fontWeight: 'bold',
              textShadow: '0 0 12px rgba(255, 255, 255, 0.9), 0 0 6px rgba(255, 255, 255, 0.7)',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            Overall
          </div>

          {/* Zeile 3: Finals / Deaths */}
          <div style={{
            display: 'flex',
            fontSize: '28px',
            textShadow: textGlow,
          }}>
            Finals: {data.finals} / Deaths: {data.deaths}
          </div>

          {/* Zeile 4: FKDR */}
          <div style={{
            display: 'flex',
            fontSize: '28px',
            textShadow: textGlow,
          }}>
            FKDR: {data.fkdr}
          </div>

          {/* Zeile 5: Wins / Losses */}
          <div style={{
            display: 'flex',
            fontSize: '28px',
            textShadow: textGlow,
          }}>
            Wins: {data.wins} / Losses: {data.losses}
          </div>

          {/* Zeile 6: WLR */}
          <div style={{
            display: 'flex',
            fontSize: '28px',
            textShadow: textGlow,
          }}>
            WLR: {data.wlr}
          </div>
        </div>
      ),
      {
        width: 800,
        height: 600,
        fonts: [
          {
            name: 'VT323',
            data: await fontData,
            weight: 400,
            style: 'normal',
          },
        ],
      },
    );
  } catch (error) {
    return new Response('Error: ' + error.message, { status: 500 });
  }
}
