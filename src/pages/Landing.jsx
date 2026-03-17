import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const BRAND_COLORS = [
  { name: 'Gold', value: '#D4AF37' },
  { name: 'Rose', value: '#C4787A' },
  { name: 'Ocean', value: '#4A90D9' },
  { name: 'Emerald', value: '#50C878' },
  { name: 'Violet', value: '#8B5CF6' },
  { name: 'Coral', value: '#FF6B6B' },
  { name: 'Teal', value: '#2DD4BF' },
  { name: 'Amber', value: '#F59E0B' },
]

const STORIES = [
  {
    id: 'brand',
    icon: '✦',
    title: 'Brand First',
    desc: 'Your brand front and center — a stunning website your customers will remember.',
    features: ['website', 'editMode', 'shop', 'membership'],
  },
  {
    id: 'location',
    icon: '◉',
    title: 'On Location',
    desc: 'People come to you — manage visitors, bookings, events, and check-ins.',
    features: ['events', 'visitors', 'facility', 'volunteers'],
  },
  {
    id: 'commerce',
    icon: '⬡',
    title: 'Sell Everything',
    desc: 'Products, services, memberships, donations — all in one beautiful platform.',
    features: ['shop', 'pos', 'inventory', 'orders'],
  },
  {
    id: 'creative',
    icon: '◇',
    title: 'Create & Share',
    desc: 'AI-powered design studio, social media, email campaigns — tell your story.',
    features: ['designStudio', 'socialMedia', 'emails', 'content'],
  },
]

export default function Landing({ onStart }) {
  const nav = useNavigate()
  const [step, setStep] = useState(0) // 0=intro, 1=name, 2=color, 3=story
  const [name, setName] = useState('')
  const [color, setColor] = useState('#D4AF37')
  const [customColor, setCustomColor] = useState('')
  const [story, setStory] = useState(null)
  const nameRef = useRef()

  const handleStart = () => {
    setStep(1)
    setTimeout(() => nameRef.current?.focus(), 400)
  }

  const handleNameNext = () => {
    if (name.trim()) setStep(2)
  }

  const handleColorNext = () => setStep(3)

  const handleGo = (s) => {
    setStory(s.id)
    onStart({ name: name.trim(), color, story: s.id, features: s.features })
    nav('/')
  }

  return (
    <div style={styles.wrap}>
      {/* Subtle grid background */}
      <div style={styles.gridBg} />

      {/* Logo */}
      <div style={styles.logoWrap}>
        <img src="/images/logo.png" alt="STOA" style={styles.logo} />
      </div>

      {/* Step 0: Intro */}
      {step === 0 && (
        <div style={{ ...styles.card, ...styles.fadeIn }}>
          <div style={styles.tagline}>THE SELLER'S PLATFORM</div>
          <h1 style={styles.h1}>Build Your<br />Platform</h1>
          <p style={styles.subtitle}>
            See what your custom software looks like — in&nbsp;seconds.
            Pick your brand, choose your features, and experience it&nbsp;live.
          </p>
          <button style={styles.btn} onClick={handleStart}>
            Start Building
            <span style={styles.arrow}>→</span>
          </button>
          <p style={styles.hint}>No sign-up required. Refreshing resets the demo.</p>
        </div>
      )}

      {/* Step 1: Name */}
      {step === 1 && (
        <div style={{ ...styles.card, ...styles.fadeIn }} key="name">
          <div style={styles.stepLabel}>STEP 1 OF 3</div>
          <h2 style={styles.h2}>What's your business called?</h2>
          <p style={styles.subtitle2}>We'll put your name everywhere — headers, emails, receipts, the works.</p>
          <input
            ref={nameRef}
            style={styles.input}
            type="text"
            placeholder="e.g. Haus of Confidence"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleNameNext()}
            maxLength={40}
          />
          <button
            style={{ ...styles.btn, opacity: name.trim() ? 1 : 0.4 }}
            onClick={handleNameNext}
            disabled={!name.trim()}
          >
            Next
            <span style={styles.arrow}>→</span>
          </button>
        </div>
      )}

      {/* Step 2: Brand Color */}
      {step === 2 && (
        <div style={{ ...styles.card, ...styles.fadeIn }} key="color">
          <div style={styles.stepLabel}>STEP 2 OF 3</div>
          <h2 style={styles.h2}>Pick your brand color</h2>
          <p style={styles.subtitle2}>This will theme your entire platform — buttons, accents, highlights.</p>

          <div style={styles.colorGrid}>
            {BRAND_COLORS.map(c => (
              <button
                key={c.value}
                onClick={() => { setColor(c.value); setCustomColor('') }}
                style={{
                  ...styles.colorBtn,
                  background: c.value,
                  boxShadow: color === c.value ? `0 0 0 3px ${c.value}, 0 0 20px ${c.value}40` : 'none',
                  transform: color === c.value ? 'scale(1.15)' : 'scale(1)',
                }}
                aria-label={c.name}
              >
                {color === c.value && <span style={styles.check}>✓</span>}
              </button>
            ))}
          </div>

          <div style={styles.customRow}>
            <span style={styles.customLabel}>Or enter a hex:</span>
            <input
              style={styles.customInput}
              type="text"
              placeholder="#FF5733"
              value={customColor}
              maxLength={7}
              onChange={e => {
                const v = e.target.value
                setCustomColor(v)
                if (/^#[0-9A-Fa-f]{6}$/.test(v)) setColor(v)
              }}
            />
            {customColor && /^#[0-9A-Fa-f]{6}$/.test(customColor) && (
              <div style={{ ...styles.colorBtn, background: customColor, width: 32, height: 32, flexShrink: 0 }} />
            )}
          </div>

          {/* Live preview bar */}
          <div style={{ ...styles.previewBar, background: color }}>
            <span style={{ color: '#000', fontWeight: 600, fontSize: 14 }}>{name}</span>
            <span style={{ color: '#00000088', fontSize: 12 }}>Your brand, live</span>
          </div>

          <button style={styles.btn} onClick={handleColorNext}>
            Next
            <span style={styles.arrow}>→</span>
          </button>
        </div>
      )}

      {/* Step 3: Story */}
      {step === 3 && (
        <div style={{ ...styles.card, ...styles.fadeIn, maxWidth: 520 }} key="story">
          <div style={styles.stepLabel}>STEP 3 OF 3</div>
          <h2 style={styles.h2}>What matters most?</h2>
          <p style={styles.subtitle2}>Pick a starting point. You'll be able to add everything else inside.</p>

          <div style={styles.storyGrid}>
            {STORIES.map(s => (
              <button
                key={s.id}
                style={styles.storyCard}
                onClick={() => handleGo(s)}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = color
                  e.currentTarget.style.boxShadow = `0 0 20px ${color}20`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#222'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ ...styles.storyIcon, color }}>{s.icon}</div>
                <div style={styles.storyTitle}>{s.title}</div>
                <div style={styles.storyDesc}>{s.desc}</div>
                <div style={{ ...styles.storyGo, background: color }}>
                  Build This →
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={styles.footer}>
        <span style={styles.footerText}>© 2026 Get Stoa LLC</span>
        <span style={styles.footerDot}>·</span>
        <span style={styles.footerText}>The Seller's Platform</span>
      </div>
    </div>
  )
}

/* ── All styles — mobile-first ── */
const styles = {
  wrap: {
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 20px',
    position: 'relative',
    overflow: 'hidden',
  },
  gridBg: {
    position: 'fixed',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
    pointerEvents: 'none',
    zIndex: 0,
  },
  logoWrap: {
    marginBottom: 32,
    zIndex: 1,
  },
  logo: {
    width: 80,
    height: 80,
    objectFit: 'contain',
    opacity: 0.9,
  },
  card: {
    zIndex: 1,
    width: '100%',
    maxWidth: 440,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  fadeIn: {
    animation: 'fadeUp 0.5s cubic-bezier(.16,1,.3,1) both',
  },
  tagline: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.25em',
    color: '#D4AF37',
    textTransform: 'uppercase',
  },
  h1: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(36px, 8vw, 56px)',
    fontWeight: 500,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    color: '#F0EDE6',
    textAlign: 'center',
  },
  h2: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(24px, 6vw, 32px)',
    fontWeight: 500,
    lineHeight: 1.2,
    color: '#F0EDE6',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 1.6,
    color: '#908D9A',
    textAlign: 'center',
    maxWidth: 360,
  },
  subtitle2: {
    fontSize: 14,
    lineHeight: 1.5,
    color: '#908D9A',
    textAlign: 'center',
  },
  stepLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.2em',
    color: '#5C5870',
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 32px',
    background: 'var(--brand, #D4AF37)',
    color: '#000',
    fontWeight: 600,
    fontSize: 15,
    borderRadius: 100,
    transition: 'all 0.3s cubic-bezier(.16,1,.3,1)',
    marginTop: 8,
  },
  arrow: {
    fontSize: 18,
    transition: 'transform 0.3s',
  },
  hint: {
    fontSize: 12,
    color: '#5C5870',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 360,
    padding: '16px 20px',
    background: '#111',
    border: '1px solid #222',
    borderRadius: 12,
    color: '#F0EDE6',
    fontSize: 18,
    outline: 'none',
    textAlign: 'center',
    transition: 'border-color 0.3s',
  },
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16,
    padding: '8px 0',
  },
  colorBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(.16,1,.3,1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  check: {
    color: '#000',
    fontWeight: 700,
    fontSize: 18,
  },
  customRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  customLabel: {
    fontSize: 13,
    color: '#5C5870',
    whiteSpace: 'nowrap',
  },
  customInput: {
    width: 100,
    padding: '8px 12px',
    background: '#111',
    border: '1px solid #222',
    borderRadius: 8,
    color: '#F0EDE6',
    fontSize: 14,
    fontFamily: "'JetBrains Mono', monospace",
    outline: 'none',
  },
  previewBar: {
    width: '100%',
    maxWidth: 360,
    padding: '12px 20px',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background 0.3s',
  },
  storyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12,
    width: '100%',
  },
  storyCard: {
    background: '#0a0a0a',
    border: '1px solid #222',
    borderRadius: 16,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    textAlign: 'left',
    transition: 'all 0.3s cubic-bezier(.16,1,.3,1)',
    cursor: 'pointer',
  },
  storyIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  storyTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 16,
    fontWeight: 600,
    color: '#F0EDE6',
  },
  storyDesc: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#908D9A',
    flex: 1,
  },
  storyGo: {
    marginTop: 8,
    padding: '8px 16px',
    borderRadius: 100,
    fontSize: 12,
    fontWeight: 600,
    color: '#000',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    zIndex: 1,
  },
  footerText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.1em',
    color: '#333',
  },
  footerDot: {
    color: '#333',
    fontSize: 10,
  },
}
