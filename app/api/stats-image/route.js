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
            padding: '60px 40px',
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

          {/* Inhalt-Container, der sicher über dem Bild liegt */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              zIndex: 1,
              gap: '20px',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            {/* Zeile 1: Level, Rank, Name, Ping (kein doppeltes ms mehr) */}
            <div style={{ display: 'flex', fontSize: '32px', fontWeight: 'normal' }}>
              <span>[{data.level}]</span>
              <span>[{data.rank}]</span>
              <span style={{ marginLeft: '10px' }}>{data.name}</span>
              <span style={{ marginLeft: '10px' }}>{data.ping}</span>
            </div>

            {/* Zeile 2: Overall (Normales Gewicht, kein Balken/Unterstrich) */}
            <div
              style={{
                display: 'flex',
                fontSize: '38px',
                fontWeight: 'normal',
                marginTop: '10px',
                marginBottom: '10px',
              }}
            >
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
