import { useState } from 'react'

const STYLES = ['Painterly', 'Realistic', 'Watercolor', 'Abstract', 'Dreamy', 'Action Shot']
const GALLERY = [
  { id: 1, label: 'Desert Sunset', color: '#E8A87C', fav: true },
  { id: 2, label: 'Mountain Vista', color: '#85CDCA', fav: false },
  { id: 3, label: 'City Lights', color: '#8B5CF6', fav: true },
  { id: 4, label: 'Ocean Waves', color: '#4A90D9', fav: false },
  { id: 5, label: 'Forest Path', color: '#50C878', fav: false },
  { id: 6, label: 'Neon Abstract', color: '#FF6B6B', fav: true },
]

export default function DesignStudioPage() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('Painterly')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [favs, setFavs] = useState(new Set(GALLERY.filter(g => g.fav).map(g => g.id)))

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setGenerating(true)
    setTimeout(() => { setGenerating(false); setGenerated(true) }, 2500)
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div>
          <div style={styles.tag}>✦ AI-POWERED</div>
          <h1 style={styles.title}>Design Studio</h1>
          <div style={styles.sub}>Generate custom images for your brand with AI</div>
        </div>
      </div>

      {/* Prompt */}
      <div style={styles.card}>
        <textarea
          style={styles.textarea}
          placeholder="Describe the image you want to create..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          rows={3}
        />
        <div style={styles.styleRow}>
          {STYLES.map(s => (
            <button
              key={s}
              style={{
                ...styles.styleBtn,
                background: style === s ? '#D4AF37' : '#fff',
                color: style === s ? '#000' : '#888',
                border: style === s ? 'none' : '1px solid #eee',
              }}
              onClick={() => setStyle(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div style={styles.btnRow}>
          <button
            style={{ ...styles.genBtn, opacity: prompt.trim() ? 1 : 0.4 }}
            onClick={handleGenerate}
            disabled={!prompt.trim() || generating}
          >
            {generating ? '✦ Generating...' : '✦ Generate Image'}
          </button>
          <button style={styles.surpriseBtn} onClick={() => {
            setPrompt('A stunning landscape perfect for social media')
            handleGenerate()
          }}>
            Surprise Me
          </button>
        </div>
      </div>

      {/* Generated result */}
      {generated && (
        <div style={styles.card}>
          <div style={styles.resultLabel}>Generated Image</div>
          <div style={styles.resultImg}>
            <div style={{ fontSize: 48 }}>✦</div>
            <div style={{ fontSize: 13, color: '#888', marginTop: 8 }}>AI-generated image preview</div>
          </div>
          <div style={styles.resultActions}>
            <button style={styles.actionBtn}>⬇ Download</button>
            <button style={styles.actionBtn}>🔗 Copy URL</button>
            <button style={{ ...styles.actionBtn, background: '#D4AF37', color: '#000', border: 'none' }}>Use Image</button>
          </div>
        </div>
      )}

      {/* Gallery */}
      <div style={styles.galleryHeader}>
        <span style={styles.galleryTitle}>Gallery</span>
        <span style={styles.galleryCount}>{GALLERY.length} images</span>
      </div>
      <div style={styles.gallery}>
        {GALLERY.map(g => (
          <div key={g.id} style={styles.galleryItem}>
            <div style={{ ...styles.galleryImg, background: `linear-gradient(135deg, ${g.color}40, ${g.color}10)` }}>
              <span style={{ fontSize: 24, opacity: 0.6 }}>◇</span>
            </div>
            <div style={styles.galleryBottom}>
              <span style={styles.galleryLabel}>{g.label}</span>
              <button
                style={{ ...styles.favBtn, color: favs.has(g.id) ? '#EF4444' : '#ccc' }}
                onClick={() => setFavs(prev => {
                  const next = new Set(prev)
                  next.has(g.id) ? next.delete(g.id) : next.add(g.id)
                  return next
                })}
              >
                {favs.has(g.id) ? '♥' : '♡'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  wrap: { padding: '20px 16px 40px' },
  header: { marginBottom: 20 },
  tag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.15em', color: '#D4AF37', marginBottom: 4 },
  title: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 700, color: '#1A1A2E', margin: '0 0 4px' },
  sub: { fontSize: 13, color: '#888' },

  card: { background: '#fff', borderRadius: 14, padding: 16, border: '1px solid #eee', marginBottom: 16 },
  textarea: {
    width: '100%', padding: '12px', background: '#FAFAF8', border: '1px solid #eee', borderRadius: 10,
    color: '#1A1A2E', fontSize: 14, outline: 'none', resize: 'none', fontFamily: 'inherit', marginBottom: 12,
  },
  styleRow: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  styleBtn: { padding: '6px 12px', borderRadius: 100, fontSize: 11, fontWeight: 600, cursor: 'pointer' },
  btnRow: { display: 'flex', gap: 8 },
  genBtn: {
    flex: 1, padding: '12px 0', borderRadius: 100, background: '#D4AF37', color: '#000',
    fontSize: 14, fontWeight: 600, textAlign: 'center', border: 'none',
  },
  surpriseBtn: {
    padding: '12px 16px', borderRadius: 100, background: '#fff', color: '#888',
    fontSize: 13, border: '1px solid #eee',
  },

  resultLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', color: '#D4AF37', marginBottom: 10 },
  resultImg: {
    height: 200, borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    background: 'linear-gradient(135deg, #D4AF3720, #f5f5f5)', marginBottom: 12,
  },
  resultActions: { display: 'flex', gap: 8 },
  actionBtn: {
    flex: 1, padding: '8px 0', borderRadius: 100, fontSize: 12, fontWeight: 600,
    background: '#fff', border: '1px solid #eee', color: '#1A1A2E', textAlign: 'center',
  },

  galleryHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  galleryTitle: { fontSize: 16, fontWeight: 700, color: '#1A1A2E' },
  galleryCount: { fontSize: 12, color: '#888' },
  gallery: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 },
  galleryItem: { background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #eee' },
  galleryImg: {
    height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  galleryBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px' },
  galleryLabel: { fontSize: 11, color: '#555' },
  favBtn: { fontSize: 16, padding: 0 },
}
