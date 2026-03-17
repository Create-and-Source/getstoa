import { useState } from 'react'

const TEMPLATES = [
  { id: 'welcome', name: 'Welcome Email', icon: '✦' },
  { id: 'promo', name: 'Promotion', icon: '◎' },
  { id: 'event', name: 'Event Invite', icon: '◉' },
  { id: 'newsletter', name: 'Newsletter', icon: '◇' },
]

export default function DemoEmailComposer({ config }) {
  const [template, setTemplate] = useState('welcome')
  const [subject, setSubject] = useState(`Welcome to ${config.name}!`)
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.label}>EMAIL CAMPAIGNS</div>
      <div style={styles.section}>
        <div style={styles.header}>
          <div style={{ ...styles.tag, color: config.color }}>COMMUNICATIONS</div>
          <div style={styles.title}>Email Composer</div>
        </div>

        {/* Templates */}
        <div style={styles.templateGrid}>
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              style={{
                ...styles.templateBtn,
                background: template === t.id ? config.color + '10' : '#fff',
                borderColor: template === t.id ? config.color : '#eee',
              }}
              onClick={() => setTemplate(t.id)}
            >
              <span style={{ fontSize: 16 }}>{t.icon}</span>
              <span style={{ fontSize: 11, color: template === t.id ? '#1A1A2E' : '#888' }}>{t.name}</span>
            </button>
          ))}
        </div>

        {/* Compose */}
        <div style={styles.compose}>
          <div style={styles.field}>
            <span style={styles.fieldLabel}>To:</span>
            <span style={styles.fieldValue}>All Members (2,412)</span>
          </div>
          <input
            style={styles.subjectInput}
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Subject line"
          />
          <div style={styles.emailPreview}>
            <div style={{ ...styles.emailHeader, background: config.color }}>
              <div style={styles.emailBrand}>{config.name}</div>
            </div>
            <div style={styles.emailBody}>
              <div style={styles.emailH1}>Welcome! 👋</div>
              <div style={styles.emailText}>
                Thank you for joining {config.name}. We're thrilled to have you as part of our community.
              </div>
              <div style={{ ...styles.emailBtn, background: config.color }}>
                Get Started →
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          <button style={{ ...styles.sendBtn, background: sent ? '#4ADE80' : config.color }}>
            {sent ? '✓ Sent!' : 'Send Campaign →'}
          </button>
          <div style={styles.stats}>
            <span style={styles.statItem}>2,412 recipients</span>
            <span style={styles.statDot}>·</span>
            <span style={styles.statItem}>~68% open rate</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrap: { padding: '0 16px 8px' },
  label: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    letterSpacing: '0.2em',
    color: '#444',
    textAlign: 'center',
    padding: '16px 0 8px',
  },
  section: {
    background: '#FAFAF8',
    borderRadius: 16,
    border: '1px solid #e5e5e5',
    padding: '20px 16px',
  },
  header: { marginBottom: 16 },
  tag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    letterSpacing: '0.2em',
    marginBottom: 4,
  },
  title: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 20,
    fontWeight: 700,
    color: '#1A1A2E',
  },
  templateGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 8,
    marginBottom: 16,
  },
  templateBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    padding: '12px 8px',
    borderRadius: 10,
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: '#fff',
  },
  compose: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 16,
  },
  field: {
    display: 'flex',
    gap: 8,
    padding: '8px 12px',
    background: '#fff',
    borderRadius: 8,
    border: '1px solid #eee',
    alignItems: 'center',
  },
  fieldLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: 600,
  },
  fieldValue: {
    fontSize: 12,
    color: '#1A1A2E',
  },
  subjectInput: {
    padding: '10px 12px',
    background: '#fff',
    border: '1px solid #eee',
    borderRadius: 8,
    color: '#1A1A2E',
    fontSize: 14,
    fontWeight: 600,
    outline: 'none',
    fontFamily: 'inherit',
  },
  emailPreview: {
    borderRadius: 12,
    overflow: 'hidden',
    border: '1px solid #eee',
  },
  emailHeader: {
    padding: '16px 20px',
  },
  emailBrand: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 16,
    fontWeight: 600,
    color: '#000',
  },
  emailBody: {
    padding: '20px',
    background: '#fff',
  },
  emailH1: {
    fontSize: 20,
    fontWeight: 700,
    color: '#1A1A2E',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 13,
    lineHeight: 1.6,
    color: '#666',
    marginBottom: 16,
  },
  emailBtn: {
    display: 'inline-block',
    padding: '10px 24px',
    borderRadius: 100,
    fontSize: 13,
    fontWeight: 600,
    color: '#000',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center',
  },
  sendBtn: {
    width: '100%',
    padding: '14px 0',
    borderRadius: 100,
    fontSize: 14,
    fontWeight: 600,
    color: '#000',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background 0.3s',
    border: 'none',
  },
  stats: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  statItem: {
    fontSize: 11,
    color: '#888',
  },
  statDot: {
    color: '#ccc',
  },
}
