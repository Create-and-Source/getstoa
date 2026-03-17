export default function DashboardPage() {
  const kpis = [
    { label: 'Revenue', value: '$12,847', change: '+18%', up: true },
    { label: 'Orders', value: '284', change: '+12%', up: true },
    { label: 'Members', value: '2,412', change: '+8%', up: true },
    { label: 'Visitors', value: '1,847', change: '+24%', up: true },
  ]

  const orders = [
    { id: '#1042', customer: 'Sarah M.', amount: '$89.99', status: 'Shipped', statusColor: '#4ADE80' },
    { id: '#1041', customer: 'James K.', amount: '$34.50', status: 'Processing', statusColor: '#D4AF37' },
    { id: '#1040', customer: 'Emily R.', amount: '$128.00', status: 'Delivered', statusColor: '#4ADE80' },
    { id: '#1039', customer: 'Michael T.', amount: '$52.00', status: 'Pending', statusColor: '#F59E0B' },
  ]

  const alerts = [
    { type: 'warning', text: 'Premium Hoodie stock is low — 12 units remaining' },
    { type: 'info', text: 'Grand Opening Night is 90% booked' },
    { type: 'success', text: 'Email campaign "Spring Collection" sent to 2,412 members' },
  ]

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div>
          <div style={styles.greeting}>Good evening ✦</div>
          <h1 style={styles.title}>Dashboard</h1>
        </div>
        <div style={styles.liveBadge}>● Live</div>
      </div>

      {/* AI Summary */}
      <div style={styles.aiCard}>
        <div style={styles.aiHeader}>
          <span style={styles.aiIcon}>✦</span>
          <span style={styles.aiLabel}>AI Summary</span>
        </div>
        <div style={styles.aiText}>
          Revenue is up 18% this month. 3 events are nearly sold out. The Spring Collection email had a 68% open rate — your best yet. Consider restocking Premium Hoodies before the weekend rush.
        </div>
      </div>

      {/* KPIs */}
      <div style={styles.kpiGrid}>
        {kpis.map(k => (
          <div key={k.label} style={styles.kpiCard}>
            <div style={styles.kpiLabel}>{k.label}</div>
            <div style={styles.kpiValue}>{k.value}</div>
            <div style={{ ...styles.kpiChange, color: k.up ? '#4ADE80' : '#EF4444' }}>{k.change}</div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div style={styles.sectionTitle}>Needs Attention</div>
      <div style={styles.alertList}>
        {alerts.map((a, i) => (
          <div key={i} style={{
            ...styles.alert,
            borderLeftColor: a.type === 'warning' ? '#F59E0B' : a.type === 'success' ? '#4ADE80' : '#D4AF37',
          }}>
            <div style={styles.alertText}>{a.text}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div style={styles.sectionTitle}>Recent Orders</div>
      <div style={styles.ordersCard}>
        {orders.map(o => (
          <div key={o.id} style={styles.orderRow}>
            <div style={styles.orderId}>{o.id}</div>
            <div style={styles.orderCustomer}>{o.customer}</div>
            <div style={styles.orderAmount}>{o.amount}</div>
            <div style={{ ...styles.orderStatus, background: o.statusColor + '15', color: o.statusColor }}>
              {o.status}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={styles.sectionTitle}>Quick Actions</div>
      <div style={styles.quickGrid}>
        {['New Order', 'Add Product', 'Create Event', 'Send Email', 'View Reports', 'Add Member'].map(a => (
          <button key={a} style={styles.quickBtn}>{a}</button>
        ))}
      </div>

      {/* Revenue chart placeholder */}
      <div style={styles.sectionTitle}>Revenue This Month</div>
      <div style={styles.chartCard}>
        <div style={styles.chartBars}>
          {[40, 55, 35, 70, 60, 85, 75].map((h, i) => (
            <div key={i} style={styles.chartCol}>
              <div style={{ ...styles.chartBar, height: h + '%' }} />
              <div style={styles.chartLabel}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrap: { padding: '20px 16px 40px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  greeting: { fontSize: 13, color: '#888', marginBottom: 2 },
  title: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 700, color: '#1A1A2E', margin: 0 },
  liveBadge: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 11, padding: '4px 12px',
    borderRadius: 100, background: '#D4AF3715', color: '#D4AF37', fontWeight: 600,
  },

  aiCard: { background: '#fff', borderRadius: 14, padding: 16, border: '1px solid #e5e5e5', marginBottom: 16 },
  aiHeader: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 },
  aiIcon: { color: '#D4AF37', fontSize: 14 },
  aiLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', color: '#D4AF37', fontWeight: 600 },
  aiText: { fontSize: 13, lineHeight: 1.6, color: '#555' },

  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 24 },
  kpiCard: { background: '#fff', borderRadius: 12, padding: 14, border: '1px solid #eee' },
  kpiLabel: { fontSize: 11, color: '#888', marginBottom: 4 },
  kpiValue: { fontSize: 24, fontWeight: 700, color: '#1A1A2E', lineHeight: 1.2 },
  kpiChange: { fontSize: 12, marginTop: 4, fontWeight: 600 },

  sectionTitle: { fontSize: 16, fontWeight: 700, color: '#1A1A2E', marginBottom: 10 },

  alertList: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 },
  alert: { background: '#fff', borderRadius: 10, padding: '12px 14px', borderLeft: '3px solid', border: '1px solid #eee' },
  alertText: { fontSize: 13, color: '#444', lineHeight: 1.4 },

  ordersCard: { background: '#fff', borderRadius: 14, border: '1px solid #eee', overflow: 'hidden', marginBottom: 24 },
  orderRow: {
    display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px',
    borderBottom: '1px solid #f5f5f5',
  },
  orderId: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, color: '#D4AF37', width: 50 },
  orderCustomer: { fontSize: 13, color: '#444', flex: 1 },
  orderAmount: { fontSize: 13, fontWeight: 600, color: '#1A1A2E' },
  orderStatus: { fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 100 },

  quickGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 24 },
  quickBtn: {
    padding: '14px 8px', borderRadius: 10, background: '#fff', border: '1px solid #eee',
    fontSize: 12, fontWeight: 600, color: '#1A1A2E',
  },

  chartCard: { background: '#fff', borderRadius: 14, padding: 20, border: '1px solid #eee' },
  chartBars: { display: 'flex', gap: 8, alignItems: 'flex-end', height: 120 },
  chartCol: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' },
  chartBar: { width: '100%', background: 'linear-gradient(180deg, #D4AF37, #D4AF3760)', borderRadius: '4px 4px 0 0', transition: 'height 0.5s' },
  chartLabel: { fontSize: 10, color: '#888', marginTop: 6 },
}
