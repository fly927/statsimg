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
            position: 'relative',
            color: '#ffffff',
            fontFamily: 'monospace',
            padding: '50px 40px',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
        >
          {/* GitHub Hintergrundbild als absolute Ebene im Hintergrund */}
          <img
            src="https://raw.githubusercontent.com/fly927/src/refs/heads/main/bg.png"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />

          {/* Inhalt-Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              zIndex: 1,
              gap: '12px',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            {/* Zeile 1: Level, Rank, Name, Ping */}
            <div style={{ display: 'flex', fontSize: '44px', fontWeight: 'normal' }}>
              <span>[{data.level}]</span>
              <span style={{ marginLeft: '10px' }}>{data.rank}</span>
              <span style={{ marginLeft: '15px' }}>{data.name}</span>
              <span style={{ marginLeft: '15px' }}>{data.ping}</span>
            </div>

            {/* Zeile 2: Overall */}
            <div
              style={{
                display: 'flex',
                fontSize: '34px',
                fontWeight: 'normal',
                marginTop: '4px',
                marginBottom: '4px',
              }}
            >
              Overall
            </div>

            {/* Zeile 3: Finals / Deaths */}
            <div style={{ display: 'flex', fontSize: '30px' }}>
              Finals: {data.finals} / Deaths: {data.deaths}
            </div>

            {/* Zeile 4: FKDR */}
            <div style={{ display: 'flex', fontSize: '30px' }}>
              FKDR: {data.fkdr}
            </div>

            {/* Zeile 5: Wins / Losses */}
            <div style={{ display: 'flex', fontSize: '30px' }}>
              Wins: {data.wins} / Losses: {data.losses}
            </div>

            {/* Zeile 6: WLR */}
            <div style={{ display: 'flex', fontSize: '30px' }}>
              WLR: {data.wlr}
            </div>

            {/* Leerzeile / Abstandshalter zwischen WLR und Winstreak */}
            <div style={{ height: '24px' }} />

            {/* Zeile 7: Winstreak */}
            <div style={{ display: 'flex', fontSize: '30px' }}>
              Winstreak: {data.winstreak}
            </div>
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
