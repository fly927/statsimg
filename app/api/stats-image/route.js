import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Minecraft-Schriftart laden (VT323 von Google Fonts ist perfekt und frei verfügbar)
const fontData = fetch(new URL('https://fonts.googleapis.com/css2?family=VT323&display=block')).then((res) =>
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

    // Simuliere den dunklen Vortex-Hintergrund mit CSS-Gradients
    const vortexGradient = `
      radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(50,10,60,1) 50%, rgba(10,50,20,1) 80%, rgba(10,10,10,1) 100%),
      linear-gradient(135deg, rgba(30,10,40,0.3) 0%, rgba(10,30,20,0.3) 100%)
    `;

    // Der Glow-Effekt für den Text
    const textGlow = '0 0 10px rgba(255, 255, 255, 0.8), 0 0 5px rgba(255, 255, 255, 0.6)';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#0a0a0a', // Deep dark
            backgroundImage: vortexGradient,
            backgroundSize: 'cover',
            color: '#ffffff',
            fontFamily: '"VT323", monospace', // Minecraft-style font
            padding: '60px 40px',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: '20px',
          }}
        >
          {/* Zeile 1: [<level>] [<rank>] <name> <ping>ms */}
          <div style={{
            fontSize: '32px',
            fontWeight: 'normal',
            textShadow: textGlow,
          }}>
            <span>[{data.level}]</span>{' '}
            <span style={{ color: '#aaa' }}>[{data.rank}]</span>{' '}
            <span style={{ color: '#fff', fontWeight: 'bold' }}>{data.name}</span>{' '}
            <span style={{ color: '#aaa' }}>({data.ping}ms)</span>
          </div>

          {/* Zeile 2: Overall */}
          <div style={{
            fontSize: '38px',
            fontWeight: 'bold',
            borderBottom: '4px solid white',
            paddingBottom: '8px',
            marginBottom: '10px',
            textShadow: '0 0 12px rgba(255, 255, 255, 0.9), 0 0 6px rgba(255, 255, 255, 0.7)',
          }}>
            Overall
          </div>

          {/* Zeile 3: Finals: [FINALS] / Deaths: [DEATHS] */}
          <div style={{
            fontSize: '28px',
            textShadow: '0 0 8px rgba(255, 255, 255, 0.7), 0 0 4px rgba(255, 255, 255, 0.5)',
          }}>
            Finals: {data.finals} / Deaths: {data.deaths}
          </div>

          {/* Zeile 4: FKDR: [FKDR] */}
          <div style={{
            fontSize: '28px',
            textShadow: '0 0 8px rgba(255, 255, 255, 0.7), 0 0 4px rgba(255, 255, 255, 0.5)',
          }}>
            FKDR: <span style={{ color: '#00e676', fontWeight: 'bold' }}>{data.fkdr}</span> {/* Farb-Tipp für FKDR */}
          </div>

          {/* Zeile 5: Wins: [WINS] / Losses: [LOSSES] */}
          <div style={{
            fontSize: '28px',
            textShadow: '0 0 8px rgba(255, 255, 255, 0.7), 0 0 4px rgba(255, 255, 255, 0.5)',
          }}>
            Wins: {data.wins} / Losses: {data.losses}
          </div>

          {/* Zeile 6: WLR: [WLR] */}
          <div style={{
            fontSize: '28px',
            textShadow: '0 0 8px rgba(255, 255, 255, 0.7), 0 0 4px rgba(255, 255, 255, 0.5)',
          }}>
            WLR: <span style={{ color: '#2979ff', fontWeight: 'bold' }}>{data.wlr}</span> {/* Farb-Tipp für WLR */}
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
    return new Response('Error', { status: 500 });
  }
}
