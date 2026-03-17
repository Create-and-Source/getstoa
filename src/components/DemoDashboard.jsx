export default function DemoDashboard({ config }) {
  const kpis = [
    { label: 'Revenue', value: '$12,847', change: '+18%', up: true },
    { label: 'Orders', value: '284', change: '+12%', up: true },
    { label: 'Members', value: '2,412', change: '+8%', up: true },
    { label: 'Events', value: '7', change: 'This Week', up: null },
  ]

  const recentOrders = [
    { id: '#1042', customer: 'Sarah M.', amount: '$89.99', status: 'Shipped' },
    { id: '#1041', customer: 'James K.', amount: '$34.50', status: 'Processing' },
    { id: '#1040', customer: 'Emily R.', amount: '$128.00', status: 'Delivered' },
  ]

  return (
    <div style={styles.wrap}>
      <div style={styles.label}>YOUR ADMIN DASHBOARD</div>
      <div style={styles.section}>
        <div style={styles.header}>
          <div>
            <div style={styles.greeting}>Good evening</div>
            <div style={styles.dashTitle}>{config.name} Dashboard</div>
          </div>
          <div style={{ ...styles.liveTag, background: config.color + '15', color: config.color }}>
            ● Live
          </div>
        </div>

        {/* KPIs */}
        <div style={styles.kpiGrid}>
          {kpis.map(k => (
            <div key={k.label} style={styles.kpiCard}>
              <div style={styles.kpiLabel}>{k.label}</div>
              <div style={styles.kpiValue}>{k.value}</div>
              {k.up !== null && (
                <div style={{ ...styles.kpiChange, color: k.up ? '#4ADE80' : '#EF4444' }}>
                  {k.change}
                </div>
              )}
              {k.up === null && <div style={styles.kpiChange}>{k.change}</div>}
            </div>
          ))}
        </div>

        {/* Recent orders */}
        <div style={styles.ordersHeader}>Recent Orders</div>
        {recentOrders.map(o => (
          <div key={o.id} style={styles.orderRow}>
            <div style={{ ...styles.orderId, color: config.color }}>{o.id}</div>
            <div style={styles.orderCustomer}>{o.customer}</div>
            <div style={styles.orderAmount}>{o.amount}</div>
            <div style={{
              ...styles.orderStatus,
              background: o.status === 'Shipped' ? '#4ADE8015' : o.status === 'Delivered' ? '#4ADE8015' : config.color + '15',
              color: o.status === 'Processing' ? config.color : '#4ADE80',
            }}>{o.status}</div>
          </div>
        ))}

        {/* Quick actions */}
        <div style={styles.quickGrid}>
          {['New Order', 'Add Product', 'Send Email', 'View Reports'].map(action => (
            <button key={action} style={{ ...styles.quickBtn, borderColor: config.color + '20' }}>
              <span style={styles.quickText}>{action}</span>
            </button>
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
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 13,
    color: '#888',
  },
  dashTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 18,
    fontWeight: 700,
    color: '#1A1A2E',
  },
  liveTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    padding: '4px 10px',
    borderRadius: 100,
    fontWeight: 600,
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 10,
    marginBottom: 20,
  },
  kpiCard: {
    background: '#fff',
    borderRadius: 12,
    padding: 14,
    border: '1px solid #eee',
  },
  kpiLabel: {
    fontSize: 11,
    color: '#888',
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: 700,
    color: '#1A1A2E',
    lineHeight: 1.2,
  },
  kpiChange: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: 600,
  },
  ordersHeader: {
    fontSize: 14,
    fontWeight: 700,
    color: '#1A1A2E',
    marginBottom: 10,
  },
  orderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  orderId: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    fontWeight: 600,
    width: 50,
  },
  orderCustomer: {
    fontSize: 13,
    color: '#444',
    flex: 1,
  },
  orderAmount: {
    fontSize: 13,
    fontWeight: 600,
    color: '#1A1A2E',
  },
  orderStatus: {
    fontSize: 10,
    fontWeight: 600,
    padding: '3px 8px',
    borderRadius: 100,
    marginLeft: 8,
  },
  quickGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 8,
    marginTop: 16,
  },
  quickBtn: {
    padding: '12px 8px',
    borderRadius: 10,
    background: '#fff',
    border: '1px solid',
    cursor: 'pointer',
  },
  quickText: {
    fontSize: 12,
    fontWeight: 600,
    color: '#1A1A2E',
  },
}
