import { useState } from 'react'

const TIERS = [
  { name: 'Explorer', price: '$0', period: 'Free forever', features: ['Newsletter access', 'Event announcements', 'Community updates', 'Basic perks'], featured: false },
  { name: 'Member', price: '$15', period: '/month', features: ['Everything in Explorer', 'Members-only events', '10% store discount', 'Early access', 'Member portal'], featured: true },
  { name: 'Patron', price: '$50', period: '/month', features: ['Everything in Member', 'VIP experiences', '20% store discount', 'Exclusive merchandise', 'Priority booking', 'Recognition wall'], featured: false },
]

export default function MembershipPage() {
  const [selected, setSelected] = useState('Member')

  return (
    <div style={styles.wrap}>
      <div style={styles.hero}>
        <div style={styles.heroTag} data-editable="mem-tag">MEMBERSHIP</div>
        <h1 style={styles.heroTitle} data-editable="mem-title">Join the Community</h1>
        <p style={styles.heroSub} data-editable="mem-sub">Choose the membership that fits your passion.</p>
        <div style={styles.memberCount}>2,412 members and counting</div>
      </div>

      <div style={styles.tiers}>
        {TIERS.map(t => (
          <div
            key={t.name}
            style={{
              ...styles.tierCard,
              border: t.featured ? '2px solid #D4AF37' : '1px solid #1a1a1a',
              background: t.featured ? '#0a0a0a' : '#050505',
            }}
          >
            {t.featured && <div style={styles.popular}>MOST POPULAR</div>}
            <div style={styles.tierName} data-editable={`tier-${t.name}`}>{t.name}</div>
            <div style={styles.tierPrice}>
              <span style={styles.priceVal}>{t.price}</span>
              <span style={styles.pricePer}>{t.period}</span>
            </div>
            <div style={styles.features}>
              {t.features.map(f => (
                <div key={f} style={styles.feature}>
                  <span style={styles.featureCheck}>✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <button style={{
              ...styles.tierBtn,
              background: t.featured ? '#D4AF37' : 'transparent',
              color: t.featured ? '#000' : '#D4AF37',
              border: t.featured ? 'none' : '1px solid #D4AF3740',
            }}>
              {t.price === '$0' ? 'Sign Up Free' : 'Join Now'}
            </button>
          </div>
        ))}
      </div>

      <div style={styles.faq}>
        <div style={styles.faqTag}>FAQ</div>
        <h2 style={styles.faqTitle} data-editable="mem-faq-title">Common Questions</h2>
        {[
          { q: 'Can I cancel anytime?', a: 'Yes, cancel online anytime. No fees, no hassle.' },
          { q: 'Do memberships auto-renew?', a: 'Monthly memberships renew automatically. You can pause or cancel from your portal.' },
          { q: 'What payment methods do you accept?', a: 'All major credit cards, Apple Pay, and Google Pay.' },
        ].map(item => (
          <div key={item.q} style={styles.faqItem}>
            <div style={styles.faqQ}>{item.q}</div>
            <div style={styles.faqA}>{item.a}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  wrap: { paddingBottom: 40 },
  hero: {
    padding: '48px 24px 32px', textAlign: 'center',
    background: 'linear-gradient(180deg, rgba(212,175,55,0.04) 0%, transparent 100%)',
  },
  heroTag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.3em', color: '#D4AF37', marginBottom: 8, outline: 'none' },
  heroTitle: { fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 500, color: '#F0EDE6', margin: '0 0 8px', outline: 'none' },
  heroSub: { fontSize: 14, color: '#908D9A', margin: '0 0 12px', outline: 'none' },
  memberCount: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#D4AF37' },
  tiers: { display: 'flex', flexDirection: 'column', gap: 16, padding: '0 16px' },
  tierCard: { borderRadius: 16, padding: 20, position: 'relative' },
  popular: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: '0.2em',
    color: '#000', background: '#D4AF37', padding: '4px 10px', borderRadius: 100,
    position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap',
  },
  tierName: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: '#F0EDE6', marginBottom: 4, outline: 'none' },
  tierPrice: { display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 },
  priceVal: { fontSize: 32, fontWeight: 700, color: '#D4AF37' },
  pricePer: { fontSize: 13, color: '#666' },
  features: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 },
  feature: { display: 'flex', gap: 8, fontSize: 13, color: '#ccc', alignItems: 'center' },
  featureCheck: { color: '#D4AF37', fontWeight: 700, fontSize: 14 },
  tierBtn: { width: '100%', padding: '12px 0', borderRadius: 100, fontSize: 14, fontWeight: 600, textAlign: 'center' },
  faq: { padding: '48px 20px' },
  faqTag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.25em', color: '#D4AF37', textAlign: 'center', marginBottom: 8 },
  faqTitle: { fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 500, color: '#F0EDE6', textAlign: 'center', margin: '0 0 24px', outline: 'none' },
  faqItem: { padding: '16px 0', borderBottom: '1px solid #1a1a1a' },
  faqQ: { fontSize: 15, fontWeight: 600, color: '#F0EDE6', marginBottom: 6 },
  faqA: { fontSize: 13, lineHeight: 1.5, color: '#888' },
}
