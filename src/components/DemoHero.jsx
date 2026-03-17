export default function DemoHero({ config }) {
  return (
    <div style={styles.wrap}>
      <div style={styles.label}>YOUR HOMEPAGE HERO</div>
      <div style={styles.hero}>
        <div style={{ ...styles.overlay, background: `linear-gradient(135deg, #000 0%, ${config.color}10 50%, #000 100%)` }} />
        <div style={styles.content}>
          <div style={{ ...styles.tag, color: config.color }}>WELCOME TO</div>
          <h1 style={styles.title}>{config.name}</h1>
          <p style={styles.subtitle}>Experience something extraordinary. Your premier destination for unforgettable moments.</p>
          <div style={styles.btns}>
            <button style={{ ...styles.btnPrimary, background: config.color }}>Explore</button>
            <button style={{ ...styles.btnGhost, borderColor: config.color + '60', color: config.color }}>Learn More</button>
          </div>
        </div>

        {/* Floating stats */}
        <div style={styles.stats}>
          {[
            { val: '4.9★', label: 'Rating' },
            { val: '2.4k', label: 'Members' },
            { val: '150+', label: 'Events' },
          ].map(s => (
            <div key={s.label} style={styles.stat}>
              <div style={{ ...styles.statVal, color: config.color }}>{s.val}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrap: { padding: '0 0 8px' },
  label: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    letterSpacing: '0.2em',
    color: '#444',
    textAlign: 'center',
    padding: '16px 16px 8px',
  },
  hero: {
    position: 'relative',
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 24px 40px',
    overflow: 'hidden',
    background: '#050505',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    opacity: 0.8,
  },
  content: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  tag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.3em',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(32px, 8vw, 48px)',
    fontWeight: 500,
    lineHeight: 1.1,
    color: '#F0EDE6',
    margin: 0,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 1.6,
    color: '#908D9A',
    maxWidth: 320,
    margin: 0,
  },
  btns: {
    display: 'flex',
    gap: 12,
    marginTop: 8,
  },
  btnPrimary: {
    padding: '12px 28px',
    borderRadius: 100,
    fontSize: 14,
    fontWeight: 600,
    color: '#000',
    border: 'none',
    cursor: 'pointer',
  },
  btnGhost: {
    padding: '12px 28px',
    borderRadius: 100,
    fontSize: 14,
    fontWeight: 500,
    background: 'transparent',
    border: '1px solid',
    cursor: 'pointer',
  },
  stats: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    gap: 24,
    marginTop: 40,
    padding: '16px 24px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.05)',
  },
  stat: {
    textAlign: 'center',
  },
  statVal: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 20,
    fontWeight: 600,
  },
  statLabel: {
    fontSize: 10,
    color: '#5C5870',
    marginTop: 2,
  },
}
