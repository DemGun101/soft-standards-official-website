import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Soft Standards Inc. — AI-Powered Marketing Agency'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#0a0a0a',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle violet gradient accent at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #7c3aed, #a78bfa, #7c3aed)',
            display: 'flex',
          }}
        />

        {/* Subtle radial glow behind text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-1px',
              display: 'flex',
            }}
          >
            Soft Standards Inc.
          </div>

          <div
            style={{
              fontSize: '28px',
              fontWeight: 400,
              color: '#a78bfa',
              display: 'flex',
            }}
          >
            AI-Powered Marketing Agency
          </div>

          {/* Divider line */}
          <div
            style={{
              width: '80px',
              height: '2px',
              background: '#7c3aed',
              marginTop: '8px',
              marginBottom: '8px',
              display: 'flex',
            }}
          />

          {/* Stats */}
          <div
            style={{
              fontSize: '20px',
              fontWeight: 500,
              color: '#a1a1aa',
              display: 'flex',
              gap: '32px',
              marginTop: '8px',
            }}
          >
            <span style={{ display: 'flex' }}>150+ Systems Built</span>
            <span style={{ color: '#52525b', display: 'flex' }}>|</span>
            <span style={{ display: 'flex' }}>97% Client Retention</span>
            <span style={{ color: '#52525b', display: 'flex' }}>|</span>
            <span style={{ display: 'flex' }}>4+ Years</span>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #7c3aed, #a78bfa, #7c3aed)',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
