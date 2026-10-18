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
            padding: '40px 40px',
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
              gap: '10px',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            {/* Zeile 1: Level, Rank, Name, Ping (Größer: 52px) */}
            <div style={{ display: 'flex', fontSize: '52px', fontWeight: 'normal' }}>
              <span>[{data.level}]</span>
              <span style={{ marginLeft: '12px' }}>{data.rank}</span>
              <span style={{ marginLeft: '16px' }}>{data.name}</span>
              <span style={{ marginLeft: '16px' }}>{data.ping}</span>
            </div>

            {/* Zeile 2: Overall (Größer: 40px) */}
            <div
              style={{
                display: 'flex',
                fontSize: '40px',
                fontWeight: 'normal',
                marginTop: '2px',
                marginBottom: '2px',
              }}
            >
              Overall
            </div>

            {/* Zeile 3: Finals / Deaths (Größer: 36px) */}
            <div style={{ display: 'flex', fontSize: '36px' }}>
              Finals: {data.finals} / Deaths: {data.deaths}
            </div>

            {/* Zeile 4: FKDR (Größer: 36px) */}
            <div style={{ display: 'flex', fontSize: '36px' }}>
              FKDR: {data.fkdr}
            </div>

            {/* Zeile 5: Wins / Losses (Größer: 36px) */}
            <div style={{ display: 'flex', fontSize: '36px' }}>
              Wins: {data.wins} / Losses: {data.losses}
            </div>

            {/* Zeile 6: WLR (Größer: 36px) */}
            <div style={{ display: 'flex', fontSize: '36px' }}>
              WLR: {data.wlr}
            </div>

            {/* Leerzeile / Abstandshalter zwischen WLR und Winstreak */}
            <div style={{ height: '16px' }} />

            {/* Zeile 7: Winstreak (Größer: 36px) */}
            <div style={{ display: 'flex', fontSize: '36px' }}>
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
