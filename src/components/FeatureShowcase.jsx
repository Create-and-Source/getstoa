import { useState, lazy, Suspense } from 'react'

const MedSpaDemo = lazy(() => import('../pages/MedSpaDemo'))
const MuseumDemo = lazy(() => import('../pages/MuseumDemo'))

const INDUSTRIES = [
  { id: 'medspa', label: "I'm a MedSpa", icon: '◈', desc: 'Booking, clinical charts, DM inbox, patient portal, memberships, retention' },
  { id: 'museum', label: "I'm a Museum / Nonprofit", icon: '✦', desc: 'Gift shop, events, POS, donations, volunteer portal, email marketing' },
]

export default function FeatureShowcase() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="features" style={{ padding: '80px 0 40px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48, padding: '0 32px' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.25em',
          color: 'var(--brand)', marginBottom: 16,
        }}>SEE IT IN ACTION</div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 400, lineHeight: 1.15, color: 'var(--text)', margin: '0 0 12px',
        }}>What does your business need?</h2>
        <p style={{
          fontFamily: 'var(--font-ui)', fontSize: 16, lineHeight: 1.7,
          color: 'var(--text2)', maxWidth: 500, margin: '0 auto',
        }}>
          Pick your industry. Click through every page of a live platform we built.
        </p>
      </div>

      {/* Industry Selector */}
      <div style={{
        display: 'flex', gap: 16, justifyContent: 'center', padding: '0 32px 40px',
        flexWrap: 'wrap',
      }}>
        {INDUSTRIES.map(ind => (
          <button key={ind.id} onClick={() => setSelected(selected === ind.id ? null : ind.id)} style={{
            padding: '24px 28px', borderRadius: 16, cursor: 'pointer',
            textAlign: 'left', minWidth: 280, maxWidth: 400, flex: '1 1 280px',
            background: '#fff',
            border: selected === ind.id ? '2px solid var(--brand)' : '1px solid var(--border)',
            boxShadow: selected === ind.id ? '0 8px 32px rgba(212,175,55,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.25s cubic-bezier(.16,1,.3,1)',
            transform: selected === ind.id ? 'translateY(-2px)' : 'none',
          }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>{ind.icon}</div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500,
              color: selected === ind.id ? 'var(--brand)' : 'var(--text)',
              marginBottom: 6,
            }}>{ind.label}</div>
            <div style={{
              fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--text2)',
              lineHeight: 1.5,
            }}>{ind.desc}</div>
            <div style={{
              marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 11,
              color: selected === ind.id ? 'var(--brand)' : 'var(--muted)',
              letterSpacing: '0.1em',
            }}>
              {selected === ind.id ? '▼ VIEWING DEMO' : '▶ CLICK TO EXPLORE'}
            </div>
          </button>
        ))}
      </div>

      {/* Live Demo — renders directly, no iframe */}
      {selected && (
        <div style={{
          maxWidth: 1300, margin: '0 auto', padding: '0 16px',
          animation: 'fadeIn 0.4s ease',
        }}>
          {/* Browser frame */}
          <div style={{
            borderRadius: 16, overflow: 'hidden',
            border: '1px solid var(--border)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          }}>
            {/* Chrome bar */}
            <div style={{
              background: '#F5F5F5', padding: '8px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
              borderBottom: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', gap: 5 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
              </div>
              <div style={{
                flex: 1, background: '#fff', borderRadius: 8,
                padding: '6px 14px', fontFamily: 'var(--font-mono)', fontSize: 12,
                color: '#999', textAlign: 'center', border: '1px solid #E5E5E5',
              }}>
                {selected === 'medspa' ? 'yourmedspa.com' : 'yourmuseum.org'}
              </div>
              <button onClick={() => setSelected(null)} style={{
                padding: '4px 12px', borderRadius: 100, background: '#eee',
                fontFamily: 'var(--font-ui)', fontSize: 11, color: '#666',
              }}>Close Demo</button>
            </div>

            {/* Demo content */}
            <div style={{ height: 700, overflow: 'auto', background: '#F5F3F0' }}>
              <Suspense fallback={<div style={{ padding: 60, textAlign: 'center', color: '#999' }}>Loading demo...</div>}>
                {selected === 'medspa' && <MedSpaDemo />}
                {selected === 'museum' && <MuseumDemo />}
              </Suspense>
            </div>
          </div>

          <div style={{
            textAlign: 'center', padding: '16px 0',
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em',
            color: 'var(--muted)',
          }}>
            FULLY INTERACTIVE · CLICK THROUGH EVERYTHING · THIS IS REAL SOFTWARE
          </div>
        </div>
      )}
    </section>
  )
}
