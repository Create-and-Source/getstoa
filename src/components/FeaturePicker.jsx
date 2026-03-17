export default function FeaturePicker({ features, active, onToggle, color, onClose }) {
  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div style={styles.title}>Add Features</div>
        <button style={styles.closeBtn} onClick={onClose}>Done</button>
      </div>
      <div style={styles.subtitle}>Toggle features on and off to build your platform</div>
      <div style={styles.grid}>
        {features.map(f => {
          const isActive = active.includes(f.id)
          return (
            <button
              key={f.id}
              style={{
                ...styles.item,
                background: isActive ? color + '10' : '#0a0a0a',
                borderColor: isActive ? color + '40' : '#1a1a1a',
              }}
              onClick={() => onToggle(f.id)}
            >
              <div style={styles.itemTop}>
                <span style={{ ...styles.icon, color: isActive ? color : '#555' }}>{f.icon}</span>
                <div style={{
                  ...styles.toggle,
                  background: isActive ? color : '#333',
                }}>
                  <div style={{
                    ...styles.dot,
                    transform: isActive ? 'translateX(14px)' : 'translateX(0)',
                  }} />
                </div>
              </div>
              <div style={{ ...styles.itemLabel, color: isActive ? '#F0EDE6' : '#666' }}>{f.label}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const styles = {
  wrap: {
    position: 'sticky',
    top: 49,
    zIndex: 90,
    background: '#000',
    borderBottom: '1px solid #1a1a1a',
    padding: '16px',
    animation: 'fadeUp 0.3s ease',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 18,
    fontWeight: 600,
    color: '#F0EDE6',
  },
  closeBtn: {
    fontSize: 13,
    fontWeight: 600,
    color: '#888',
    padding: '6px 14px',
    background: '#1a1a1a',
    borderRadius: 100,
    cursor: 'pointer',
  },
  subtitle: {
    fontSize: 12,
    color: '#555',
    marginBottom: 16,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 8,
    maxHeight: '40vh',
    overflowY: 'auto',
  },
  item: {
    padding: '12px 10px',
    borderRadius: 12,
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  itemTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
  },
  toggle: {
    width: 30,
    height: 16,
    borderRadius: 8,
    padding: 1,
    transition: 'background 0.2s',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: '50%',
    background: '#fff',
    transition: 'transform 0.2s cubic-bezier(.16,1,.3,1)',
  },
  itemLabel: {
    fontSize: 11,
    fontWeight: 500,
  },
}
