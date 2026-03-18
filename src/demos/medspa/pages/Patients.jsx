import { useState, useEffect } from 'react';
import { useStyles, getAvatarGradient } from '../theme';
import { getPatients, addPatient, updatePatient, deletePatient, getAppointments, getServices, subscribe } from '../store';

const fmt = (cents) => `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 0 })}`;

export default function Patients() {
  const s = useStyles();
  const [, setTick] = useState(0);
  useEffect(() => subscribe(() => setTick(t => t + 1)), []);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', dob: '', gender: 'Female', allergies: '', notes: '', membershipTier: 'None' });

  const patients = getPatients();
  const appointments = getAppointments();
  const services = getServices();

  const filtered = patients.filter(p => {
    const q = search.toLowerCase();
    const nameMatch = !q || `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) || p.email?.toLowerCase().includes(q) || p.phone?.includes(q);
    if (!nameMatch) return false;
    if (filter === 'members') return p.membershipTier && p.membershipTier !== 'None';
    if (filter === 'platinum') return p.membershipTier === 'Platinum';
    if (filter === 'gold') return p.membershipTier === 'Gold';
    if (filter === 'silver') return p.membershipTier === 'Silver';
    if (filter === 'recent') {
      const thirty = new Date(); thirty.setDate(thirty.getDate() - 30);
      return p.lastVisit && new Date(p.lastVisit) >= thirty;
    }
    return true;
  }).sort((a, b) => (b.lastVisit || '').localeCompare(a.lastVisit || ''));

  const totalRevenue = patients.reduce((sum, p) => sum + (p.totalSpent || 0), 0);
  const memberCount = patients.filter(p => p.membershipTier && p.membershipTier !== 'None').length;
  const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentVisits = patients.filter(p => p.lastVisit && new Date(p.lastVisit) >= thirtyDaysAgo).length;
  const newThisMonth = patients.filter(p => p.createdAt?.startsWith(new Date().toISOString().slice(0, 7))).length;

  const handleAdd = () => {
    if (!form.firstName || !form.lastName) return;
    addPatient({ ...form, totalSpent: 0, visitCount: 0, location: 'LOC-1' });
    setForm({ firstName: '', lastName: '', email: '', phone: '', dob: '', gender: 'Female', allergies: '', notes: '', membershipTier: 'None' });
    setShowAdd(false);
  };

  const tierColor = (tier) => {
    if (tier === 'Platinum') return { bg: '#F3F0FF', color: '#7C3AED' };
    if (tier === 'Gold') return { bg: '#FEF9E7', color: '#B8960C' };
    if (tier === 'Silver') return { bg: '#F1F5F9', color: '#64748B' };
    return { bg: 'transparent', color: 'transparent' };
  };

  // Patient detail view
  if (selectedPatient) {
    const p = selectedPatient;
    const patientAppts = appointments.filter(a => a.patientId === p.id || a.patientName === `${p.firstName} ${p.lastName}`).sort((a, b) => `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`));
    const tc = tierColor(p.membershipTier);

    return (
      <div>
        <button onClick={() => setSelectedPatient(null)} style={{ ...s.pillGhost, padding: '7px 16px', fontSize: 12, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
          Back to Patients
        </button>

        {/* Profile Header */}
        <div style={{ ...s.cardStyle, padding: '28px 32px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
            background: getAvatarGradient(`${p.firstName} ${p.lastName}`),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            font: `600 24px ${s.FONT}`, color: '#fff',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          }}>
            {p.firstName?.[0]}{p.lastName?.[0]}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h1 style={{ font: `600 24px ${s.FONT}`, color: s.text, margin: 0 }}>{p.firstName} {p.lastName}</h1>
              {p.membershipTier && p.membershipTier !== 'None' && (
                <span style={{ padding: '3px 10px', borderRadius: 100, font: `500 10px ${s.FONT}`, textTransform: 'uppercase', letterSpacing: 0.5, background: tc.bg, color: tc.color }}>{p.membershipTier}</span>
              )}
            </div>
            <div style={{ font: `400 13px ${s.FONT}`, color: s.text2, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <span>{p.email}</span>
              <span>{p.phone}</span>
              {p.dob && <span>DOB: {new Date(p.dob + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ font: `600 22px ${s.FONT}`, color: s.accent }}>{fmt(p.totalSpent || 0)}</div>
            <div style={{ font: `400 11px ${s.FONT}`, color: s.text3 }}>lifetime spend</div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Total Visits', value: p.visitCount || 0 },
            { label: 'Last Visit', value: p.lastVisit ? new Date(p.lastVisit + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' },
            { label: 'Location', value: p.location === 'LOC-2' ? 'Flagship' : 'Main Location' },
            { label: 'Allergies', value: p.allergies || 'None' },
          ].map(k => (
            <div key={k.label} style={{ ...s.cardStyle, padding: '16px 20px' }}>
              <div style={{ font: `400 10px ${s.MONO}`, textTransform: 'uppercase', letterSpacing: 1, color: s.text3, marginBottom: 6 }}>{k.label}</div>
              <div style={{ font: `600 16px ${s.FONT}`, color: s.text }}>{k.value}</div>
            </div>
          ))}
        </div>

        {/* Appointment History */}
        <div style={{ ...s.tableWrap }}>
          <div style={{ padding: '16px 22px', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ font: `600 15px ${s.FONT}`, color: s.text }}>Appointment History</span>
            <span style={{ font: `400 12px ${s.FONT}`, color: s.text3 }}>{patientAppts.length} appointments</span>
          </div>
          {patientAppts.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', font: `400 14px ${s.FONT}`, color: s.text3 }}>No appointment history</div>
          ) : patientAppts.slice(0, 15).map(a => {
            const svc = services.find(sv => sv.id === a.serviceId);
            const statusColor = a.status === 'completed' ? s.success : a.status === 'confirmed' ? '#0369A1' : a.status === 'pending' ? s.warning : s.text3;
            return (
              <div key={a.id} style={{ padding: '14px 22px', borderBottom: '1px solid rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 44, textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ font: `600 14px ${s.FONT}`, color: s.text }}>{new Date(a.date + 'T12:00:00').getDate()}</div>
                  <div style={{ font: `500 9px ${s.MONO}`, color: s.text3, textTransform: 'uppercase' }}>{new Date(a.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short' })}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ font: `500 14px ${s.FONT}`, color: s.text }}>{svc?.name || 'Service'}</div>
                  <div style={{ font: `400 12px ${s.FONT}`, color: s.text3 }}>{a.time} — {svc?.category || ''}</div>
                </div>
                <span style={{
                  padding: '3px 10px', borderRadius: 100,
                  font: `500 10px ${s.FONT}`, textTransform: 'uppercase', letterSpacing: 0.3,
                  background: a.status === 'completed' ? '#F0FDF4' : a.status === 'confirmed' ? '#F0F9FF' : a.status === 'pending' ? '#FFFBEB' : '#F5F5F5',
                  color: statusColor,
                }}>{a.status}</span>
                {svc?.price && <div style={{ font: `500 13px ${s.MONO}`, color: s.text, flexShrink: 0 }}>{fmt(svc.price)}</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ font: `600 26px ${s.FONT}`, color: s.text, marginBottom: 4 }}>Patients</h1>
          <p style={{ font: `400 14px ${s.FONT}`, color: s.text2, margin: 0 }}>Full client directory — search, filter, and manage patient profiles</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} style={{ ...s.pillAccent, padding: '10px 20px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          New Patient
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total Patients', value: patients.length },
          { label: 'Active Members', value: memberCount },
          { label: 'New This Month', value: newThisMonth },
          { label: 'Visited (30 Days)', value: recentVisits },
          { label: 'Lifetime Revenue', value: fmt(totalRevenue) },
        ].map(k => (
          <div key={k.label} style={{ ...s.cardStyle, padding: '16px 20px' }}>
            <div style={{ font: `400 10px ${s.MONO}`, textTransform: 'uppercase', letterSpacing: 1, color: s.text3, marginBottom: 6 }}>{k.label}</div>
            <div style={{ font: `600 24px ${s.FONT}`, color: s.text }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Add Patient Form */}
      {showAdd && (
        <div style={{ ...s.cardStyle, padding: '24px 28px', marginBottom: 20 }}>
          <div style={{ font: `600 16px ${s.FONT}`, color: s.text, marginBottom: 16 }}>Add New Patient</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={s.label}>First Name *</label>
              <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} style={s.input} placeholder="First name" />
            </div>
            <div>
              <label style={s.label}>Last Name *</label>
              <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} style={s.input} placeholder="Last name" />
            </div>
            <div>
              <label style={s.label}>Email</label>
              <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={s.input} placeholder="email@example.com" />
            </div>
            <div>
              <label style={s.label}>Phone</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={s.input} placeholder="(480) 555-0000" />
            </div>
            <div>
              <label style={s.label}>Date of Birth</label>
              <input type="date" value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} style={s.input} />
            </div>
            <div>
              <label style={s.label}>Membership</label>
              <select value={form.membershipTier} onChange={e => setForm({ ...form, membershipTier: e.target.value })} style={s.input}>
                <option value="None">None</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleAdd} style={s.pillAccent}>Add Patient</button>
            <button onClick={() => setShowAdd(false)} style={s.pillGhost}>Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, or phone..." style={{ ...s.input, maxWidth: 300 }} />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[['all', 'All'], ['members', 'Members'], ['platinum', 'Platinum'], ['gold', 'Gold'], ['silver', 'Silver'], ['recent', 'Recent Visit']].map(([id, label]) => (
            <button key={id} onClick={() => setFilter(id)} style={{
              ...s.pill, padding: '7px 14px', fontSize: 12,
              background: filter === id ? s.accent : 'transparent',
              color: filter === id ? s.accentText : s.text2,
              border: filter === id ? `1px solid ${s.accent}` : '1px solid #E5E5E5',
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Patient List */}
      <div style={{ ...s.tableWrap }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              {['Patient', 'Contact', 'Membership', 'Visits', 'Last Visit', 'Total Spent'].map(h => (
                <th key={h} style={{ padding: '14px 18px', textAlign: 'left', font: `500 10px ${s.MONO}`, textTransform: 'uppercase', letterSpacing: 1.5, color: s.text3 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const tc = tierColor(p.membershipTier);
              return (
                <tr key={p.id} onClick={() => setSelectedPatient(p)} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)', cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.015)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                        background: getAvatarGradient(`${p.firstName} ${p.lastName}`),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        font: `500 13px ${s.FONT}`, color: '#fff',
                      }}>
                        {p.firstName?.[0]}{p.lastName?.[0]}
                      </div>
                      <div>
                        <div style={{ font: `500 14px ${s.FONT}`, color: s.text }}>{p.firstName} {p.lastName}</div>
                        <div style={{ font: `400 11px ${s.FONT}`, color: s.text3 }}>ID: {p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ font: `400 13px ${s.FONT}`, color: s.text2 }}>{p.email}</div>
                    <div style={{ font: `400 12px ${s.FONT}`, color: s.text3 }}>{p.phone}</div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    {p.membershipTier && p.membershipTier !== 'None' ? (
                      <span style={{ padding: '3px 10px', borderRadius: 100, font: `500 10px ${s.FONT}`, textTransform: 'uppercase', letterSpacing: 0.5, background: tc.bg, color: tc.color }}>{p.membershipTier}</span>
                    ) : (
                      <span style={{ font: `400 12px ${s.FONT}`, color: s.text3 }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: '14px 18px', font: `500 14px ${s.FONT}`, color: s.text }}>{p.visitCount || 0}</td>
                  <td style={{ padding: '14px 18px', font: `400 13px ${s.FONT}`, color: s.text2 }}>
                    {p.lastVisit ? new Date(p.lastVisit + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                  </td>
                  <td style={{ padding: '14px 18px', font: `500 14px ${s.MONO}`, color: s.text }}>{fmt(p.totalSpent || 0)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: 48, textAlign: 'center', font: `400 14px ${s.FONT}`, color: s.text3 }}>
            {search ? 'No patients match your search' : 'No patients yet — add your first one above'}
          </div>
        )}
      </div>
    </div>
  );
}
