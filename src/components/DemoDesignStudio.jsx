import { useState } from 'react'

const STYLES = ['Painterly', 'Realistic', 'Watercolor', 'Abstract', 'Dreamy', 'Action Shot']
const GALLERY = [
  { id: 1, label: 'Desert Sunset', color: '#E8A87C' },
  { id: 2, label: 'Mountain Vista', color: '#85CDCA' },
  { id: 3, label: 'City Lights', color: '#8B5CF6' },
  { id: 4, label: 'Ocean Waves', color: '#4A90D9' },
]

export default function DemoDesignStudio({ config }) {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('Painterly')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 2000)
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.label}>AI DESIGN STUDIO</div>
      <div style={styles.section}>
        <div style={styles.header}>
          <div style={{ ...styles.tag, color: config.color }}>✦ AI-POWERED</div>
          <div style={styles.title}>Design Studio</div>
          <div style={styles.subtitle}>Generate custom images for your brand with AI</div>
        </div>

        {/* Prompt */}
        <div style={styles.inputWrap}>
          <textarea
            style={styles.textarea}
            placeholder={`A beautiful photo for ${config.name}...`}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            rows={2}
          />
        </div>

        {/* Style picker */}
        <div style={styles.styleGrid}>
          {STYLES.map(s => (
            <button
              key={s}
              style={{
                ...styles.styleBtn,
                background: style === s ? config.color : '#1a1a1a',
                color: style === s ? '#000' : '#888',
                border: style === s ? 'none' : '1px solid #222',
              }}
              onClick={() => setStyle(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Generate button */}
        <button
          style={{ ...styles.genBtn, background: config.color, opacity: prompt.trim() ? 1 : 0.4 }}
          onClick={handleGenerate}
          disabled={!prompt.trim() || generating}
        >
          {generating ? '✦ Generating...' : '✦ Generate Image'}
        </button>

        {/* Result */}
        {generated && (
          <div style={styles.result}>
            <div style={{ ...styles.resultImg, background: `linear-gradient(135deg, ${config.color}40, #1a1a1a, ${config.color}20)` }}>
              <div style={{ fontSize: 40 }}>✦</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 8 }}>Your AI-generated image would appear here</div>
            </div>
            <div style={styles.resultActions}>
              <button style={{ ...styles.actionBtn, borderColor: config.color + '30' }}>Download</button>
              <button style={{ ...styles.actionBtn, borderColor: config.color + '30' }}>Copy URL</button>
              <button style={{ ...styles.actionBtn, background: config.color, color: '#000', borderColor: config.color }}>Use Image</button>
            </div>
          </div>
        )}

        {/* Gallery preview */}
        <div style={styles.galleryLabel}>Gallery</div>
        <div style={styles.gallery}>
          {GALLERY.map(g => (
            <div key={g.id} style={{ ...styles.galleryItem, background: `linear-gradient(135deg, ${g.color}30, #111)` }}>
              <div style={{ fontSize: 20, opacity: 0.5 }}>◇</div>
              <div style={{ fontSize: 10, color: '#666', marginTop: 4 }}>{g.label}</div>
            </div>
          ))}
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
  header: {
    marginBottom: 16,
  },
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
  subtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  inputWrap: {
    marginBottom: 12,
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: 12,
    color: '#1A1A2E',
    fontSize: 14,
    outline: 'none',
    resize: 'none',
    fontFamily: 'inherit',
  },
  styleGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  styleBtn: {
    padding: '6px 12px',
    borderRadius: 100,
    fontSize: 11,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  genBtn: {
    width: '100%',
    padding: '14px 0',
    borderRadius: 100,
    fontSize: 14,
    fontWeight: 600,
    color: '#000',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: 16,
    transition: 'opacity 0.2s',
    border: 'none',
  },
  result: {
    marginBottom: 20,
  },
  resultImg: {
    height: 180,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  resultActions: {
    display: 'flex',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    padding: '8px 0',
    borderRadius: 100,
    fontSize: 12,
    fontWeight: 600,
    background: 'transparent',
    border: '1px solid',
    color: '#1A1A2E',
    cursor: 'pointer',
  },
  galleryLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: '#1A1A2E',
    marginBottom: 10,
  },
  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 8,
  },
  galleryItem: {
    height: 80,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #eee',
  },
}
