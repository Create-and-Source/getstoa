import { useNavigate } from 'react-router-dom'

export default function Preview({ config, onReset }) {
  const nav = useNavigate()

  if (!config) {
    nav('/')
    return null
  }

  const features = JSON.parse(sessionStorage.getItem('stoa_selections') || '[]')

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => nav('/')}>← Back to Builder</button>
      </div>

      <div style={styles.content}>
        <div style={{ ...styles.tag, color: config.color }}>YOUR PLATFORM IS READY</div>
        <h1 style={styles.title}>{config.name}</h1>
        <p style={styles.subtitle}>
          Here's what you built — {features.length} features, your brand color, your name everywhere.
        </p>

        {/* Phone mockup */}
        <div style={styles.phone}>
          <div style={styles.phoneNotch} />
          <div style={styles.phoneScreen}>
            <div style={{ ...styles.phoneNav, borderBottom: `2px solid ${config.color}` }}>
              <span style={{ color: config.color, fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600 }}>
                {config.name}
              </span>
              <span style={{ fontSize: 11, color: '#888' }}>☰</span>
            </div>
            <div style={styles.phoneBody}>
              <div style={{ ...styles.phoneHero, background: `linear-gradient(135deg, ${config.color}15, #000)` }}>
                <div style={{ fontSize: 10, color: config.color, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.2em' }}>WELCOME TO</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#F0EDE6', marginTop: 4 }}>{config.name}</div>
                <div style={{ marginTop: 12, padding: '6px 16px', background: config.color, borderRadius: 100, fontSize: 10, fontWeight: 600, color: '#000' }}>
                  Explore
                </div>
              </div>
              <div style={styles.phoneFeatures}>
                {features.slice(0, 4).map(f => (
                  <div key={f} style={{ ...styles.phoneFeature, borderColor: config.color + '20' }}>
                    <div style={{ fontSize: 9, color: '#888', textTransform: 'capitalize' }}>{f.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div style={styles.summary}>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Brand</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, background: config.color }} />
              <span style={styles.summaryValue}>{config.color}</span>
            </div>
          </div>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Features</span>
            <span style={styles.summaryValue}>{features.length} selected</span>
          </div>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Story</span>
            <span style={{ ...styles.summaryValue, textTransform: 'capitalize' }}>{config.story}</span>
          </div>
        </div>

        {/* CTA */}
        <div style={styles.cta}>
          <button style={{ ...styles.ctaBtn, background: config.color }}>
            Save & Create Account →
          </button>
          <button style={styles.shareBtn}>
            Share Preview Link
          </button>
          <p style={styles.ctaHint}>
            Save your build to get a live link you can share. No credit card required.
          </p>
        </div>

        {/* Reset */}
        <button style={styles.resetBtn} onClick={onReset}>
          Start Over — Try a Different Brand
        </button>
      </div>

      <div style={styles.footer}>
        <span style={styles.footerText}>Built with STOA — The Seller's Platform</span>
      </div>
    </div>
  )
}

const styles = {
  wrap: {
    minHeight: '100dvh',
    background: '#000',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '16px 20px',
  },
  backBtn: {
    fontSize: 13,
    color: '#666',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 24px 40px',
    gap: 20,
  },
  tag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.25em',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(28px, 7vw, 40px)',
    fontWeight: 500,
    color: '#F0EDE6',
    textAlign: 'center',
    margin: 0,
  },
  subtitle: {
    fontSize: 14,
    color: '#908D9A',
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 1.5,
  },
  phone: {
    width: 220,
    background: '#1a1a1a',
    borderRadius: 28,
    padding: 8,
    border: '2px solid #333',
    position: 'relative',
  },
  phoneNotch: {
    width: 80,
    height: 6,
    background: '#333',
    borderRadius: 3,
    margin: '8px auto 4px',
  },
  phoneScreen: {
    borderRadius: 20,
    overflow: 'hidden',
    background: '#000',
  },
  phoneNav: {
    padding: '10px 12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phoneBody: {
    padding: 0,
  },
  phoneHero: {
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  phoneFeatures: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 4,
    padding: '8px 8px 16px',
  },
  phoneFeature: {
    padding: '8px',
    borderRadius: 6,
    border: '1px solid',
    textAlign: 'center',
  },
  summary: {
    width: '100%',
    maxWidth: 360,
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    background: '#0a0a0a',
    borderRadius: 16,
    border: '1px solid #1a1a1a',
    overflow: 'hidden',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 16px',
    borderBottom: '1px solid #1a1a1a',
  },
  summaryLabel: {
    fontSize: 13,
    color: '#666',
  },
  summaryValue: {
    fontSize: 13,
    color: '#F0EDE6',
    fontWeight: 500,
    fontFamily: "'JetBrains Mono', monospace",
  },
  cta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    maxWidth: 360,
  },
  ctaBtn: {
    width: '100%',
    padding: '16px 0',
    borderRadius: 100,
    fontSize: 15,
    fontWeight: 600,
    color: '#000',
    textAlign: 'center',
    cursor: 'pointer',
    border: 'none',
  },
  shareBtn: {
    width: '100%',
    padding: '14px 0',
    borderRadius: 100,
    fontSize: 14,
    fontWeight: 500,
    color: '#888',
    textAlign: 'center',
    cursor: 'pointer',
    background: '#111',
    border: '1px solid #222',
  },
  ctaHint: {
    fontSize: 12,
    color: '#444',
    textAlign: 'center',
  },
  resetBtn: {
    fontSize: 13,
    color: '#444',
    padding: '12px 0',
    marginTop: 20,
  },
  footer: {
    padding: '20px',
    textAlign: 'center',
  },
  footerText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.1em',
    color: '#333',
  },
}
