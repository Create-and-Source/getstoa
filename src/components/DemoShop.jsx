import { useState } from 'react'

const PRODUCTS = [
  { id: 1, name: 'Classic Logo Tee', price: 34.99, cat: 'Apparel', img: '👕' },
  { id: 2, name: 'Premium Hoodie', price: 68.00, cat: 'Apparel', img: '🧥' },
  { id: 3, name: 'Canvas Tote', price: 24.99, cat: 'Accessories', img: '👜' },
  { id: 4, name: 'Ceramic Mug', price: 18.99, cat: 'Home', img: '☕' },
  { id: 5, name: 'Sticker Pack', price: 9.99, cat: 'Accessories', img: '✦' },
  { id: 6, name: 'Enamel Pin Set', price: 14.99, cat: 'Accessories', img: '📌' },
]

export default function DemoShop({ config }) {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <div style={styles.wrap}>
      <div style={styles.label}>YOUR ONLINE STORE</div>
      <div style={styles.section}>
        {/* Shop header */}
        <div style={styles.header}>
          <div>
            <div style={{ ...styles.tag, color: config.color }}>SHOP</div>
            <div style={styles.title}>{config.name} Store</div>
          </div>
          <button
            style={{ ...styles.cartBtn, background: config.color + '15', color: config.color }}
            onClick={() => setShowCart(!showCart)}
          >
            🛒 {cart.reduce((s, i) => s + i.qty, 0)}
          </button>
        </div>

        {/* Product grid */}
        <div style={styles.grid}>
          {PRODUCTS.map(p => (
            <div key={p.id} style={styles.card}>
              <div style={styles.imgWrap}>
                <span style={styles.emoji}>{p.img}</span>
              </div>
              <div style={{ ...styles.cat, color: config.color }}>{p.cat}</div>
              <div style={styles.name}>{p.name}</div>
              <div style={styles.row}>
                <span style={{ ...styles.price, color: config.color }}>${p.price.toFixed(2)}</span>
                <button
                  style={{ ...styles.addBtn, background: config.color }}
                  onClick={() => addToCart(p)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mini cart drawer */}
        {showCart && (
          <div style={styles.cartDrawer}>
            <div style={styles.cartHeader}>
              <span style={styles.cartTitle}>Your Cart</span>
              <button style={styles.cartClose} onClick={() => setShowCart(false)}>✕</button>
            </div>
            {cart.length === 0 ? (
              <div style={styles.cartEmpty}>Your cart is empty</div>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} style={styles.cartItem}>
                    <span>{item.name} × {item.qty}</span>
                    <span style={{ color: config.color }}>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div style={styles.cartTotal}>
                  <span>Total</span>
                  <span style={{ color: config.color, fontWeight: 700 }}>${total.toFixed(2)}</span>
                </div>
                <button style={{ ...styles.checkoutBtn, background: config.color }}>
                  Checkout →
                </button>
              </>
            )}
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
    background: '#0a0a0a',
    borderRadius: 16,
    border: '1px solid #1a1a1a',
    overflow: 'hidden',
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 16px 12px',
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
    fontWeight: 600,
    color: '#F0EDE6',
  },
  cartBtn: {
    padding: '8px 14px',
    borderRadius: 100,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12,
    padding: '0 16px 20px',
  },
  card: {
    background: '#111',
    borderRadius: 12,
    overflow: 'hidden',
    border: '1px solid #1a1a1a',
  },
  imgWrap: {
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0d0d0d',
  },
  emoji: {
    fontSize: 36,
  },
  cat: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 8,
    letterSpacing: '0.15em',
    padding: '10px 12px 0',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 13,
    fontWeight: 500,
    color: '#F0EDE6',
    padding: '4px 12px 0',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px 12px',
  },
  price: {
    fontWeight: 700,
    fontSize: 14,
  },
  addBtn: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    fontSize: 16,
    fontWeight: 700,
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  cartDrawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '85%',
    maxWidth: 320,
    height: '100%',
    background: '#111',
    borderLeft: '1px solid #222',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    zIndex: 10,
    animation: 'slideIn 0.3s ease',
  },
  cartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 18,
    fontWeight: 600,
    color: '#F0EDE6',
  },
  cartClose: {
    fontSize: 16,
    color: '#666',
    cursor: 'pointer',
    padding: 4,
  },
  cartEmpty: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    padding: '40px 0',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 13,
    color: '#ccc',
    padding: '8px 0',
    borderBottom: '1px solid #1a1a1a',
  },
  cartTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 15,
    color: '#F0EDE6',
    padding: '8px 0',
    marginTop: 'auto',
  },
  checkoutBtn: {
    padding: '12px 0',
    borderRadius: 100,
    fontSize: 14,
    fontWeight: 600,
    color: '#000',
    textAlign: 'center',
    cursor: 'pointer',
  },
}
