import { useState } from 'react'

export default function DemoNav({ config, adminMode, onAdminToggle }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={styles.section}>
      <div style={styles.label}>YOUR NAVIGATION BAR</div>
      <div style={{ ...styles.nav, borderBottom: `1px solid ${config.color}15` }}>
        <div style={styles.navInner}>
          <div style={{ ...styles.brand, color: config.color }}>
            {config.name}
          </div>
          <div style={styles.links}>
            {['Home', 'About', 'Events', 'Shop'].map(link => (
              <span key={link} style={styles.link}>{link}</span>
            ))}
          </div>
          <div style={styles.navRight}>
            <button style={{ ...styles.joinBtn, background: config.color }}>Join</button>
            <div
              style={{ ...styles.toggle, background: adminMode ? config.color : '#333' }}
              onClick={onAdminToggle}
            >
              <div style={{
                ...styles.toggleDot,
                transform: adminMode ? 'translateX(16px)' : 'translateX(0)',
              }} />
            </div>
            {adminMode && <span style={{ ...styles.adminBadge, background: config.color + '20', color: config.color }}>ADMIN</span>}
          </div>
        </div>
      </div>
      <div style={styles.tip}>
        ↑ Toggle the admin switch to see your back office
      </div>
    </div>
  )
}

const styles = {
  section: {
    padding: '0 0 8px',
  },
  label: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    letterSpacing: '0.2em',
    color: '#444',
    textAlign: 'center',
    padding: '20px 16px 8px',
  },
  nav: {
    padding: '12px 16px',
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(20px)',
  },
  navInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  brand: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 16,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '35%',
  },
  links: {
    display: 'flex',
    gap: 16,
    flex: 1,
    justifyContent: 'center',
  },
  link: {
    fontSize: 13,
    color: '#908D9A',
    cursor: 'pointer',
    display: 'none', // hidden on mobile
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  joinBtn: {
    padding: '6px 16px',
    borderRadius: 100,
    fontSize: 12,
    fontWeight: 600,
    color: '#000',
    whiteSpace: 'nowrap',
  },
  toggle: {
    width: 36,
    height: 20,
    borderRadius: 10,
    padding: 2,
    cursor: 'pointer',
    transition: 'background 0.3s',
    flexShrink: 0,
  },
  toggleDot: {
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: '#fff',
    transition: 'transform 0.3s cubic-bezier(.16,1,.3,1)',
  },
  adminBadge: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: '0.15em',
    padding: '3px 6px',
    borderRadius: 4,
    whiteSpace: 'nowrap',
  },
  tip: {
    fontSize: 11,
    color: '#333',
    textAlign: 'center',
    padding: '8px 16px',
    fontStyle: 'italic',
  },
}
