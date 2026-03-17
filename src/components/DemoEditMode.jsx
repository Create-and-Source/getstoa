import { useState } from 'react'

export default function DemoEditMode({ config }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(`Welcome to ${config.name}`)
  const [subtitle, setSubtitle] = useState('Click any text to edit it — just like your real website.')
  const [showToast, setShowToast] = useState(false)

  const handleSave = (field, value) => {
    if (field === 'title') setTitle(value)
    if (field === 'subtitle') setSubtitle(value)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.label}>EDIT YOUR WEBSITE — LIVE</div>
      <div style={{ ...styles.section, border: editing ? `2px solid ${config.color}` : '2px solid #1a1a1a' }}>
        {/* Pencil toggle */}
        <button
          style={{ ...styles.pencil, background: editing ? config.color : '#222', color: editing ? '#000' : '#888' }}
          onClick={() => setEditing(!editing)}
        >
          ✎
        </button>

        {editing && (
          <div style={{ ...styles.banner, background: config.color }}>
            <span style={styles.bannerText}>✎ Edit Mode — Click any text to change it</span>
          </div>
        )}

        <div style={styles.content}>
          <div
            contentEditable={editing}
            suppressContentEditableWarning
            onBlur={e => handleSave('title', e.target.innerText)}
            style={{
              ...styles.editTitle,
              outline: 'none',
              border: editing ? `1px dashed ${config.color}40` : '1px dashed transparent',
              padding: 8,
              borderRadius: 8,
              cursor: editing ? 'text' : 'default',
            }}
          >
            {title}
          </div>
          <div
            contentEditable={editing}
            suppressContentEditableWarning
            onBlur={e => handleSave('subtitle', e.target.innerText)}
            style={{
              ...styles.editSubtitle,
              outline: 'none',
              border: editing ? `1px dashed ${config.color}40` : '1px dashed transparent',
              padding: 8,
              borderRadius: 8,
              cursor: editing ? 'text' : 'default',
            }}
          >
            {subtitle}
          </div>
        </div>

        {!editing && (
          <div style={styles.hint}>
            ← Tap the pencil to start editing
          </div>
        )}

        {/* Toast */}
        {showToast && (
          <div style={{ ...styles.toast, background: config.color }}>
            ✓ Saved
          </div>
        )}
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
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    background: '#0a0a0a',
    transition: 'border-color 0.3s',
  },
  pencil: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: '50%',
    fontSize: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    transition: 'all 0.3s',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    cursor: 'pointer',
  },
  banner: {
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    fontSize: 12,
    fontWeight: 600,
    color: '#000',
  },
  content: {
    padding: '32px 24px 48px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  editTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 24,
    fontWeight: 600,
    color: '#F0EDE6',
    lineHeight: 1.3,
  },
  editSubtitle: {
    fontSize: 14,
    lineHeight: 1.6,
    color: '#908D9A',
  },
  hint: {
    position: 'absolute',
    bottom: 20,
    left: 64,
    fontSize: 11,
    color: '#444',
    fontStyle: 'italic',
  },
  toast: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: '8px 16px',
    borderRadius: 100,
    fontSize: 12,
    fontWeight: 600,
    color: '#000',
    animation: 'fadeUp 0.3s ease',
  },
}
