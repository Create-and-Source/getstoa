import { useState } from 'react'

export default function HomePage({ editMode }) {
  const [heroTitle, setHeroTitle] = useState('Your Brand, Your Platform')
  const [heroSub, setHeroSub] = useState('Everything your business needs — built beautifully, powered by AI, ready to launch.')
  const [showToast, setShowToast] = useState(false)

  const handleEdit = (setter) => (e) => {
    if (editMode) {
      setter(e.target.innerText)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    }
  }

  const features = [
    { icon: '◈', title: 'Stunning Website', desc: 'A premium storefront that matches your brand — with a built-in CMS to edit everything live.' },
    { icon: '⬡', title: 'Online Store', desc: 'Sell products, services, memberships, and donations — with a real cart and checkout.' },
    { icon: '◎', title: 'Events & Booking', desc: 'Manage events, sell tickets, track attendance, and handle reservations.' },
    { icon: '▦', title: 'Admin Dashboard', desc: 'KPIs, orders, inventory, reports — your entire back office in one place.' },
    { icon: '◇', title: 'AI Design Studio', desc: 'Generate custom images for your brand with AI. No designer needed.' },
    { icon: '✉', title: 'Email & Social', desc: 'Send campaigns, create social posts, manage your audience — all built in.' },
    { icon: '★', title: 'Memberships', desc: 'Tiered membership plans with perks, member portals, and automatic tracking.' },
    { icon: '◉', title: 'Visitor & Volunteer', desc: 'Track foot traffic, manage volunteers, log hours, and schedule shifts.' },
    { icon: '✎', title: 'Edit Everything', desc: 'Click the pencil, edit any text on your site, publish instantly. No code.' },
    { icon: '⊞', title: 'Point of Sale', desc: 'Ring up customers on a tablet. Syncs with inventory and orders automatically.' },
    { icon: '◫', title: 'Inventory & Orders', desc: 'Track stock across locations, receive shipments, manage purchase orders.' },
    { icon: '♡', title: 'Donations', desc: 'Accept donations, track fundraising progress, manage donors and campaigns.' },
  ]

  const stats = [
    { value: '22+', label: 'Pages Built' },
    { value: '67', label: 'Products Ready' },
    { value: '100%', label: 'Customizable' },
    { value: '0', label: 'Code Required' },
  ]

  return (
    <div style={styles.wrap}>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <div style={styles.heroTag} data-editable="hero-tag">THE SELLER'S PLATFORM</div>
          <h1
            style={styles.heroTitle}
            contentEditable={editMode}
            suppressContentEditableWarning
            onBlur={handleEdit(setHeroTitle)}
            data-editable="hero-title"
          >
            {heroTitle}
          </h1>
          <p
            style={styles.heroSub}
            contentEditable={editMode}
            suppressContentEditableWarning
            onBlur={handleEdit(setHeroSub)}
            data-editable="hero-subtitle"
          >
            {heroSub}
          </p>
          <div style={styles.heroBtns}>
            <button style={styles.btnPrimary}>See It In Action ↓</button>
            <button style={styles.btnGhost}>Book a Demo</button>
          </div>
        </div>

        {/* Stats bar */}
        <div style={styles.statsBar}>
          {stats.map(s => (
            <div key={s.label} style={styles.stat}>
              <div style={styles.statVal} data-editable={`stat-${s.label}`}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit mode banner */}
      {editMode && (
        <div style={styles.editBanner}>
          ✎ Edit Mode ON — Click any text to change it. Changes save automatically.
        </div>
      )}

      {/* What you get section */}
      <div style={styles.section}>
        <div style={styles.sectionTag} data-editable="features-tag">EVERYTHING YOU NEED</div>
        <h2 style={styles.sectionTitle} data-editable="features-title">One Platform, Every Feature</h2>
        <p style={styles.sectionSub} data-editable="features-sub">
          We didn't build a template. We built every feature a business could need — beautiful, fast, and ready to customize.
        </p>

        <div style={styles.featureGrid}>
          {features.map(f => (
            <div key={f.title} style={styles.featureCard}>
              <div style={styles.featureIcon}>{f.icon}</div>
              <div style={styles.featureTitle} data-editable={`feature-${f.title}`}>{f.title}</div>
              <div style={styles.featureDesc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ ...styles.section, background: '#050505' }}>
        <div style={styles.sectionTag} data-editable="how-tag">HOW IT WORKS</div>
        <h2 style={styles.sectionTitle} data-editable="how-title">From Idea to Launch</h2>
        <div style={styles.stepList}>
          {[
            { num: '01', title: 'Explore the Demo', desc: 'Browse every page in the sidebar. This entire site is your platform — shop, events, dashboard, everything.' },
            { num: '02', title: 'Try Editing', desc: 'Tap the pencil icon, then click any text to change it. Your name, your words, your brand.' },
            { num: '03', title: 'See the Admin', desc: 'Switch to the Back Office pages — dashboard, AI tools, email campaigns, reports. This is what your team uses.' },
            { num: '04', title: 'Make It Yours', desc: 'Tell us your brand colors, your features, your flow. We customize and launch your platform.' },
          ].map(step => (
            <div key={step.num} style={styles.step}>
              <div style={styles.stepNum}>{step.num}</div>
              <div>
                <div style={styles.stepTitle} data-editable={`step-${step.num}`}>{step.title}</div>
                <div style={styles.stepDesc}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social proof / built with */}
      <div style={styles.section}>
        <div style={styles.sectionTag} data-editable="built-tag">BUILT DIFFERENT</div>
        <h2 style={styles.sectionTitle} data-editable="built-title">Real Platforms, Already Running</h2>
        <p style={styles.sectionSub}>
          These aren't mockups. Every platform below was built with the same technology powering yours.
        </p>
        <div style={styles.caseGrid}>
          {[
            { name: 'Dark Sky Discovery Center', type: 'Nonprofit · Gift Shop · Events', features: '22+ admin pages, AI design studio, POS, edit mode CMS' },
            { name: 'MedFlow', type: 'Medical Sales · CRM · 3 Portals', features: 'Admin, sales rep, doctor portals · AI coaching · compliance tracking' },
            { name: 'Haus of Confidence', type: 'MedSpa · Booking · Services', features: 'Appointment booking, service catalog, staff management, client portal' },
            { name: 'Create & Source', type: 'Merchandise · Sourcing · Operations', features: 'Client portal, internal ops, order tracking, vendor management' },
          ].map(c => (
            <div key={c.name} style={styles.caseCard}>
              <div style={styles.caseName} data-editable={`case-${c.name}`}>{c.name}</div>
              <div style={styles.caseType}>{c.type}</div>
              <div style={styles.caseFeatures}>{c.features}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={styles.cta}>
        <div style={styles.ctaTag}>READY?</div>
        <h2 style={styles.ctaTitle} data-editable="cta-title">Let's Build Your Platform</h2>
        <p style={styles.ctaSub}>
          Everything you just explored — customized to your brand, your business, your way.
        </p>
        <button style={styles.btnPrimary}>Get Started →</button>
        <div style={styles.ctaFooter}>
          © 2026 Get Stoa LLC · The Seller's Platform · @getstoa
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div style={styles.toast}>✓ Saved</div>
      )}
    </div>
  )
}

const styles = {
  wrap: {},

  /* Hero */
  hero: {
    position: 'relative',
    minHeight: '85dvh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '80px 24px 40px',
    background: '#000',
    overflow: 'hidden',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.06) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    maxWidth: 480,
  },
  heroTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.3em',
    color: '#D4AF37',
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(32px, 8vw, 52px)',
    fontWeight: 500,
    lineHeight: 1.1,
    color: '#F0EDE6',
    margin: 0,
    outline: 'none',
  },
  heroSub: {
    fontSize: 16,
    lineHeight: 1.6,
    color: '#908D9A',
    maxWidth: 380,
    margin: 0,
    outline: 'none',
  },
  heroBtns: {
    display: 'flex',
    gap: 12,
    marginTop: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btnPrimary: {
    padding: '14px 28px',
    background: '#D4AF37',
    color: '#000',
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 100,
    border: 'none',
    cursor: 'pointer',
  },
  btnGhost: {
    padding: '14px 28px',
    background: 'transparent',
    color: '#D4AF37',
    fontWeight: 500,
    fontSize: 14,
    borderRadius: 100,
    border: '1px solid #D4AF3740',
    cursor: 'pointer',
  },
  statsBar: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    gap: 20,
    marginTop: 48,
    padding: '16px 28px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.05)',
  },
  stat: { textAlign: 'center' },
  statVal: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 24,
    fontWeight: 600,
    color: '#D4AF37',
    outline: 'none',
  },
  statLabel: {
    fontSize: 10,
    color: '#5C5870',
    marginTop: 2,
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '0.05em',
  },

  /* Edit banner */
  editBanner: {
    background: '#D4AF37',
    color: '#000',
    textAlign: 'center',
    padding: '10px 16px',
    fontSize: 12,
    fontWeight: 600,
    position: 'sticky',
    top: 52,
    zIndex: 25,
  },

  /* Sections */
  section: {
    padding: '64px 20px',
  },
  sectionTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.25em',
    color: '#D4AF37',
    textAlign: 'center',
    marginBottom: 8,
    outline: 'none',
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(24px, 6vw, 36px)',
    fontWeight: 500,
    color: '#F0EDE6',
    textAlign: 'center',
    margin: '0 0 12px',
    outline: 'none',
  },
  sectionSub: {
    fontSize: 14,
    lineHeight: 1.6,
    color: '#908D9A',
    textAlign: 'center',
    maxWidth: 400,
    margin: '0 auto 32px',
    outline: 'none',
  },

  /* Feature grid */
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12,
    maxWidth: 520,
    margin: '0 auto',
  },
  featureCard: {
    background: '#0a0a0a',
    border: '1px solid #1a1a1a',
    borderRadius: 14,
    padding: 16,
  },
  featureIcon: {
    fontSize: 20,
    color: '#D4AF37',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#F0EDE6',
    marginBottom: 4,
    outline: 'none',
  },
  featureDesc: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#666',
  },

  /* Steps */
  stepList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    maxWidth: 440,
    margin: '32px auto 0',
  },
  step: {
    display: 'flex',
    gap: 16,
    alignItems: 'flex-start',
  },
  stepNum: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 28,
    fontWeight: 600,
    color: '#D4AF37',
    lineHeight: 1,
    flexShrink: 0,
    width: 40,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#F0EDE6',
    marginBottom: 4,
    outline: 'none',
  },
  stepDesc: {
    fontSize: 13,
    lineHeight: 1.5,
    color: '#888',
  },

  /* Case studies */
  caseGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 12,
    maxWidth: 440,
    margin: '0 auto',
  },
  caseCard: {
    background: '#0a0a0a',
    border: '1px solid #1a1a1a',
    borderRadius: 14,
    padding: 16,
  },
  caseName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 18,
    fontWeight: 600,
    color: '#D4AF37',
    marginBottom: 4,
    outline: 'none',
  },
  caseType: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '0.05em',
  },
  caseFeatures: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#666',
  },

  /* CTA */
  cta: {
    padding: '64px 24px',
    textAlign: 'center',
    background: '#050505',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  ctaTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.3em',
    color: '#D4AF37',
  },
  ctaTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(24px, 6vw, 36px)',
    fontWeight: 500,
    color: '#F0EDE6',
    margin: 0,
    outline: 'none',
  },
  ctaSub: {
    fontSize: 14,
    color: '#908D9A',
    maxWidth: 340,
  },
  ctaFooter: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.1em',
    color: '#333',
    marginTop: 32,
  },

  /* Toast */
  toast: {
    position: 'fixed',
    top: 100,
    right: 20,
    padding: '10px 20px',
    background: '#D4AF37',
    color: '#000',
    borderRadius: 100,
    fontSize: 13,
    fontWeight: 600,
    zIndex: 100,
    animation: 'fadeUp 0.3s ease',
  },
}
