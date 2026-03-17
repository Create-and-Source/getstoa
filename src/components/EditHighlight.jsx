export default function EditHighlight({ active, onToggle, editMode }) {
  return (
    <>
      <button
        style={{
          ...styles.btn,
          background: active ? '#D4AF37' : '#1a1a1a',
          color: active ? '#000' : '#D4AF37',
          border: active ? 'none' : '1px solid #D4AF3730',
        }}
        onClick={onToggle}
      >
        {active ? '✕ Hide Editable' : '✦ What Can I Edit?'}
      </button>

      {active && (
        <div style={styles.tooltip}>
          <div style={styles.tooltipTitle}>Everything with a gold border is editable</div>
          <div style={styles.tooltipText}>
            Tap the ✎ pencil in the top bar to enter edit mode, then click any highlighted element to change it.
          </div>
        </div>
      )}

      {/* Global highlight styles injected when active */}
      {active && (
        <style>{`
          [data-editable] {
            outline: 2px dashed #D4AF3780 !important;
            outline-offset: 4px;
            border-radius: 4px;
            transition: outline-color 0.3s;
            position: relative;
          }
          [data-editable]:hover {
            outline-color: #D4AF37 !important;
            cursor: pointer;
          }
          [data-editable]::after {
            content: 'editable';
            position: absolute;
            top: -8px;
            right: -4px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 8px;
            letter-spacing: 0.1em;
            color: #000;
            background: #D4AF37;
            padding: 1px 5px;
            border-radius: 3px;
            pointer-events: none;
            text-transform: uppercase;
          }
        `}</style>
      )}
    </>
  )
}

const styles = {
  btn: {
    position: 'fixed',
    bottom: 24,
    right: 20,
    padding: '12px 20px',
    borderRadius: 100,
    fontSize: 13,
    fontWeight: 600,
    zIndex: 60,
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
    transition: 'all 0.3s',
    whiteSpace: 'nowrap',
  },
  tooltip: {
    position: 'fixed',
    bottom: 72,
    right: 20,
    width: 260,
    background: '#111',
    border: '1px solid #D4AF3730',
    borderRadius: 16,
    padding: 16,
    zIndex: 60,
    animation: 'fadeUp 0.3s ease',
  },
  tooltipTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#D4AF37',
    marginBottom: 6,
  },
  tooltipText: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#888',
  },
}
