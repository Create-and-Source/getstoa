import { useState } from 'react'

const TEMPLATES = [
  { id: 'welcome', name: 'Welcome', icon: '✦', desc: 'New member greeting' },
  { id: 'promo', name: 'Promotion', icon: '◎', desc: 'Sale announcement' },
  { id: 'event', name: 'Event Invite', icon: '◉', desc: 'Event notification' },
  { id: 'newsletter', name: 'Newsletter', icon: '◇', desc: 'Monthly update' },
]

const CAMPAIGNS = [
  { name: 'Spring Collection Launch', sent: '2,412', open: '68%', clicks: '24%', status: 'Sent', date: 'Mar 12' },
  { name: 'Members-Only Sale', sent: '1,847', open: '72%', clicks: '31%', status: 'Sent', date: 'Mar 8' },
  { name: 'Weekend Event Reminder', sent: '956', open: '61%', clicks: '18%', status: 'Scheduled', date: 'Mar 20' },
]

export default function EmailPage() {
  const [template, setTemplate] = useState('welcome')
  const [subject, setSubject] = useState('Welcome to the community!')
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div>
          <div style={styles.tag}>COMMUNICATIONS</div>
          <h1 style={styles.title}>Email Campaigns</h1>
        </div>
        <button style={styles.newBtn}>+ New</button>
      </div>

      {/* Past campaigns */}
      <div style={styles.sectionTitle}>Recent Campaigns</div>
      <div style={styles.campaigns}>
        {CAMPAIGNS.map(c => (
          <div key={c.name} style={styles.campCard}>
            <div style={styles.campTop}>
              <div style={styles.campName}>{c.name}</div>
              <div style={{
                ...styles.campStatus,
                background: c.status === 'Sent' ? '#4ADE8015' : '#D4AF3715',
                color: c.status === 'Sent' ? '#4ADE80' : '#D4AF37',
              }}>{c.status}</div>
            </div>
            <div style={styles.campDate}>{c.date} · {c.sent} recipients</div>
            <div style={styles.campMetrics}>
              <div style={styles.metric}><span style={styles.metricVal}>{c.open}</span><span style={styles.metricLabel}>Opens</span></div>
              <div style={styles.metric}><span style={styles.metricVal}>{c.clicks}</span><span style={styles.metricLabel}>Clicks</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Compose */}
      <div style={styles.sectionTitle}>Quick Compose</div>
      <div style={styles.composeCard}>
        <div style={styles.templateGrid}>
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              style={{
                ...styles.templateBtn,
                background: template === t.id ? '#D4AF3710' : '#fff',
                borderColor: template === t.id ? '#D4AF37' : '#eee',
              }}
              onClick={() => setTemplate(t.id)}
            >
              <span style={{ fontSize: 16 }}>{t.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#1A1A2E' }}>{t.name}</span>
              <span style={{ fontSize: 9, color: '#888' }}>{t.desc}</span>
            </button>
          ))}
        </div>

        <div style={styles.fieldRow}>
          <span style={styles.fieldLabel}>To:</span>
          <span style={styles.fieldVal}>All Members (2,412)</span>
        </div>

        <input
          style={styles.subjectInput}
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="Subject line"
        />

        {/* Email preview */}
        <div style={styles.emailPreview}>
          <div style={styles.emailHeader}>Your Brand</div>
          <div style={styles.emailBody}>
            <div style={styles.emailH}>Welcome! 👋</div>
            <div style={styles.emailP}>Thank you for joining. We're thrilled to have you as part of our community.</div>
            <div style={styles.emailCta}>Get Started →</div>
          </div>
        </div>

        <button style={{ ...styles.sendBtn, background: sent ? '#4ADE80' : '#D4AF37' }} onClick={handleSend}>
          {sent ? '✓ Sent!' : 'Send Campaign →'}
        </button>
        <div style={styles.sendMeta}>2,412 recipients · ~68% expected open rate</div>
      </div>
    </div>
  )
}

const styles = {
  wrap: { padding: '20px 16px 40px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  tag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.15em', color: '#D4AF37', marginBottom: 4 },
  title: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 700, color: '#1A1A2E', margin: 0 },
  newBtn: {
    padding: '8px 16px', borderRadius: 100, background: '#D4AF37', color: '#000',
    fontSize: 13, fontWeight: 600, border: 'none',
  },

  sectionTitle: { fontSize: 16, fontWeight: 700, color: '#1A1A2E', marginBottom: 10 },

  campaigns: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 },
  campCard: { background: '#fff', borderRadius: 12, padding: 14, border: '1px solid #eee' },
  campTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  campName: { fontSize: 14, fontWeight: 600, color: '#1A1A2E' },
  campStatus: { fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 100 },
  campDate: { fontSize: 11, color: '#888', marginBottom: 8 },
  campMetrics: { display: 'flex', gap: 20 },
  metric: { display: 'flex', flexDirection: 'column' },
  metricVal: { fontSize: 18, fontWeight: 700, color: '#1A1A2E' },
  metricLabel: { fontSize: 10, color: '#888' },

  composeCard: { background: '#fff', borderRadius: 14, padding: 16, border: '1px solid #eee' },
  templateGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 14 },
  templateBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
    padding: '10px 8px', borderRadius: 10, border: '1px solid', cursor: 'pointer', background: '#fff',
  },
  fieldRow: {
    display: 'flex', gap: 8, padding: '8px 12px', background: '#FAFAF8', borderRadius: 8,
    border: '1px solid #eee', alignItems: 'center', marginBottom: 8,
  },
  fieldLabel: { fontSize: 12, color: '#888', fontWeight: 600 },
  fieldVal: { fontSize: 12, color: '#1A1A2E' },
  subjectInput: {
    width: '100%', padding: '10px 12px', background: '#FAFAF8', border: '1px solid #eee',
    borderRadius: 8, color: '#1A1A2E', fontSize: 14, fontWeight: 600, outline: 'none', marginBottom: 12,
    fontFamily: 'inherit',
  },
  emailPreview: { borderRadius: 12, overflow: 'hidden', border: '1px solid #eee', marginBottom: 14 },
  emailHeader: {
    padding: '14px 16px', background: '#D4AF37',
    fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: '#000',
  },
  emailBody: { padding: 16, background: '#fff' },
  emailH: { fontSize: 18, fontWeight: 700, color: '#1A1A2E', marginBottom: 6 },
  emailP: { fontSize: 13, lineHeight: 1.6, color: '#666', marginBottom: 14 },
  emailCta: {
    display: 'inline-block', padding: '8px 20px', background: '#D4AF37', borderRadius: 100,
    fontSize: 12, fontWeight: 600, color: '#000',
  },
  sendBtn: {
    width: '100%', padding: '14px 0', borderRadius: 100, fontSize: 14, fontWeight: 600,
    color: '#000', textAlign: 'center', border: 'none', transition: 'background 0.3s',
  },
  sendMeta: { fontSize: 11, color: '#888', textAlign: 'center', marginTop: 8 },
}
