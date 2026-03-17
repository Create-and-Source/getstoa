import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import DemoNav from '../components/DemoNav'
import DemoHero from '../components/DemoHero'
import DemoEditMode from '../components/DemoEditMode'
import DemoShop from '../components/DemoShop'
import DemoEvents from '../components/DemoEvents'
import DemoDashboard from '../components/DemoDashboard'
import DemoDesignStudio from '../components/DemoDesignStudio'
import DemoEmailComposer from '../components/DemoEmailComposer'
import FeaturePicker from '../components/FeaturePicker'

const ALL_FEATURES = [
  { id: 'website', label: 'Website', icon: '◈', component: 'hero' },
  { id: 'editMode', label: 'Edit Your Site', icon: '✎', component: 'editMode' },
  { id: 'shop', label: 'Online Store', icon: '⬡', component: 'shop' },
  { id: 'events', label: 'Events', icon: '◎', component: 'events' },
  { id: 'dashboard', label: 'Admin Dashboard', icon: '▦', component: 'dashboard' },
  { id: 'designStudio', label: 'AI Design Studio', icon: '◇', component: 'designStudio' },
  { id: 'emails', label: 'Email Campaigns', icon: '✉', component: 'emails' },
  { id: 'pos', label: 'Point of Sale', icon: '⊞', component: 'dashboard' },
  { id: 'inventory', label: 'Inventory', icon: '☰', component: 'dashboard' },
  { id: 'orders', label: 'Orders', icon: '◫', component: 'shop' },
  { id: 'membership', label: 'Memberships', icon: '★', component: 'hero' },
  { id: 'visitors', label: 'Visitor Tracking', icon: '◉', component: 'dashboard' },
  { id: 'facility', label: 'Facility Booking', icon: '▣', component: 'events' },
  { id: 'volunteers', label: 'Volunteer Portal', icon: '♡', component: 'dashboard' },
  { id: 'socialMedia', label: 'Social Media', icon: '◐', component: 'emails' },
  { id: 'content', label: 'CMS Editor', icon: '✎', component: 'editMode' },
  { id: 'donations', label: 'Donations', icon: '♡', component: 'shop' },
]

export default function Builder({ config, onReset }) {
  const nav = useNavigate()
  const [activeFeatures, setActiveFeatures] = useState(() => {
    const saved = sessionStorage.getItem('stoa_selections')
    return saved ? JSON.parse(saved) : config.features || ['website', 'editMode', 'shop']
  })
  const [showPicker, setShowPicker] = useState(false)
  const [adminMode, setAdminMode] = useState(false)

  const toggleFeature = useCallback((id) => {
    setActiveFeatures(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
      sessionStorage.setItem('stoa_selections', JSON.stringify(next))
      return next
    })
  }, [])

  const handlePreview = () => {
    sessionStorage.setItem('stoa_selections', JSON.stringify(activeFeatures))
    nav('/preview')
  }

  // Determine which demo sections to show based on active features
  const activeComponents = new Set(
    ALL_FEATURES.filter(f => activeFeatures.includes(f.id)).map(f => f.component)
  )

  return (
    <div style={styles.wrap}>
      {/* Top bar */}
      <div style={styles.topBar}>
        <button style={styles.resetBtn} onClick={onReset}>← Start Over</button>
        <div style={styles.brandBadge}>
          <div style={{ ...styles.brandDot, background: config.color }} />
          <span style={styles.brandName}>{config.name}</span>
        </div>
        <div style={styles.topActions}>
          <button
            style={{ ...styles.adminToggle, background: adminMode ? config.color : '#222', color: adminMode ? '#000' : '#888' }}
            onClick={() => setAdminMode(!adminMode)}
          >
            {adminMode ? 'Admin On' : 'Admin'}
          </button>
          <button style={styles.addBtn} onClick={() => setShowPicker(!showPicker)}>
            {showPicker ? '✕' : '+'} Features
          </button>
        </div>
      </div>

      {/* Feature picker drawer */}
      {showPicker && (
        <FeaturePicker
          features={ALL_FEATURES}
          active={activeFeatures}
          onToggle={toggleFeature}
          color={config.color}
          onClose={() => setShowPicker(false)}
        />
      )}

      {/* Demo sections */}
      <div style={styles.demos}>
        {/* Always show nav */}
        <DemoNav config={config} adminMode={adminMode} onAdminToggle={() => setAdminMode(!adminMode)} />

        {activeComponents.has('hero') && <DemoHero config={config} />}
        {activeComponents.has('editMode') && <DemoEditMode config={config} />}
        {activeComponents.has('shop') && <DemoShop config={config} />}
        {activeComponents.has('events') && <DemoEvents config={config} />}
        {adminMode && activeComponents.has('dashboard') && <DemoDashboard config={config} />}
        {adminMode && activeComponents.has('designStudio') && <DemoDesignStudio config={config} />}
        {adminMode && activeComponents.has('emails') && <DemoEmailComposer config={config} />}
      </div>

      {/* Bottom action bar */}
      <div style={styles.bottomBar}>
        <button style={{ ...styles.previewBtn, background: config.color }} onClick={handlePreview}>
          Preview on Phone →
        </button>
      </div>
    </div>
  )
}

const styles = {
  wrap: {
    minHeight: '100dvh',
    background: '#000',
    paddingBottom: 80,
  },
  topBar: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    background: 'rgba(0,0,0,0.9)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid #1a1a1a',
    gap: 8,
  },
  resetBtn: {
    fontSize: 12,
    color: '#666',
    padding: '6px 0',
    whiteSpace: 'nowrap',
  },
  brandBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
  },
  brandDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    flexShrink: 0,
  },
  brandName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 14,
    fontWeight: 600,
    color: '#F0EDE6',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  topActions: {
    display: 'flex',
    gap: 6,
    flexShrink: 0,
  },
  adminToggle: {
    fontSize: 11,
    fontWeight: 600,
    padding: '6px 12px',
    borderRadius: 100,
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  },
  addBtn: {
    fontSize: 11,
    fontWeight: 600,
    padding: '6px 12px',
    borderRadius: 100,
    background: '#1a1a1a',
    color: '#aaa',
    whiteSpace: 'nowrap',
  },
  demos: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  bottomBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '16px 20px',
    paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
    background: 'linear-gradient(transparent, #000 40%)',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
  },
  previewBtn: {
    padding: '14px 40px',
    borderRadius: 100,
    fontSize: 15,
    fontWeight: 600,
    color: '#000',
    width: '100%',
    maxWidth: 400,
    textAlign: 'center',
  },
}
