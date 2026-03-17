import { useState } from 'react'

const EVENTS = [
  { id: 1, title: 'Grand Opening Celebration', date: 'Apr 12', time: '6:00 PM', spots: 45, total: 50, cat: 'Special' },
  { id: 2, title: 'Members-Only Night', date: 'Apr 18', time: '7:00 PM', spots: 20, total: 30, cat: 'Members' },
  { id: 3, title: 'Weekend Workshop', date: 'Apr 25', time: '10:00 AM', spots: 8, total: 15, cat: 'Education' },
]

export default function DemoEvents({ config }) {
  const [reserved, setReserved] = useState(new Set())
  const [showModal, setShowModal] = useState(null)

  const handleReserve = (id) => {
    setReserved(prev => new Set([...prev, id]))
    setShowModal(null)
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.label}>YOUR EVENTS</div>
      <div style={styles.section}>
        <div style={{ ...styles.tag, color: config.color }}>UPCOMING</div>
        <div style={styles.title}>What's Happening at {config.name}</div>

        <div style={styles.list}>
          {EVENTS.map(ev => {
            const isReserved = reserved.has(ev.id)
            const pct = (ev.spots / ev.total) * 100
            return (
              <div key={ev.id} style={styles.card}>
                <div style={styles.dateBox}>
                  <div style={{ ...styles.dateMonth, color: config.color }}>{ev.date.split(' ')[0]}</div>
                  <div style={styles.dateDay}>{ev.date.split(' ')[1]}</div>
                </div>
                <div style={styles.info}>
                  <div style={{ ...styles.evCat, color: config.color }}>{ev.cat}</div>
                  <div style={styles.evTitle}>{ev.title}</div>
                  <div style={styles.evTime}>{ev.time}</div>
                  <div style={styles.spotsRow}>
                    <div style={styles.spotsBar}>
                      <div style={{ ...styles.spotsFill, width: pct + '%', background: pct > 80 ? '#EF4444' : config.color }} />
                    </div>
                    <span style={styles.spotsText}>{ev.total - ev.spots} left</span>
                  </div>
                </div>
                <button
                  style={{
                    ...styles.reserveBtn,
                    background: isReserved ? '#1a1a1a' : config.color,
                    color: isReserved ? config.color : '#000',
                    border: isReserved ? `1px solid ${config.color}30` : 'none',
                  }}
                  onClick={() => !isReserved && setShowModal(ev.id)}
                >
                  {isReserved ? '✓' : 'Reserve'}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Reservation modal */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalTitle}>Reserve Your Spot</div>
            <div style={styles.modalEv}>{EVENTS.find(e => e.id === showModal)?.title}</div>
            <input style={styles.modalInput} placeholder="Your name" />
            <input style={styles.modalInput} placeholder="Email" />
            <button style={{ ...styles.modalBtn, background: config.color }} onClick={() => handleReserve(showModal)}>
              Confirm Reservation →
            </button>
          </div>
        </div>
      )}
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
    background: '#0a0a0a',
    borderRadius: 16,
    border: '1px solid #1a1a1a',
    padding: '20px 16px',
  },
  tag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    letterSpacing: '0.2em',
    marginBottom: 4,
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 20,
    fontWeight: 500,
    color: '#F0EDE6',
    marginBottom: 20,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    background: '#111',
    borderRadius: 12,
    border: '1px solid #1a1a1a',
  },
  dateBox: {
    width: 48,
    textAlign: 'center',
    flexShrink: 0,
  },
  dateMonth: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  dateDay: {
    fontSize: 22,
    fontWeight: 700,
    color: '#F0EDE6',
    lineHeight: 1,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  evCat: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 8,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  evTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#F0EDE6',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  evTime: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  spotsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  spotsBar: {
    flex: 1,
    height: 3,
    background: '#222',
    borderRadius: 2,
    overflow: 'hidden',
  },
  spotsFill: {
    height: '100%',
    borderRadius: 2,
    transition: 'width 0.5s',
  },
  spotsText: {
    fontSize: 10,
    color: '#555',
    whiteSpace: 'nowrap',
  },
  reserveBtn: {
    padding: '8px 14px',
    borderRadius: 100,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'all 0.2s',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    zIndex: 200,
  },
  modal: {
    background: '#111',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    border: '1px solid #222',
  },
  modalTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 20,
    fontWeight: 600,
    color: '#F0EDE6',
  },
  modalEv: {
    fontSize: 13,
    color: '#888',
  },
  modalInput: {
    padding: '12px 16px',
    background: '#0a0a0a',
    border: '1px solid #222',
    borderRadius: 10,
    color: '#F0EDE6',
    fontSize: 14,
    outline: 'none',
  },
  modalBtn: {
    padding: '14px 0',
    borderRadius: 100,
    fontSize: 14,
    fontWeight: 600,
    color: '#000',
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: 4,
    border: 'none',
  },
}
