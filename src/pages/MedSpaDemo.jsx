import { useState, useRef, useEffect } from 'react'

/* ═══════════════════════════════════════════════════════════════════════════
   HARDCODED DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const PATIENTS = [
  { id: 1, first: 'Sophia', last: 'Chen', email: 'sophia.chen@email.com', tier: 'Platinum', visits: 24, spent: 8420, phone: '(310) 555-0142' },
  { id: 2, first: 'Marcus', last: 'Rivera', email: 'marcus.r@email.com', tier: 'Gold', visits: 18, spent: 6200, phone: '(310) 555-0198' },
  { id: 3, first: 'Ava', last: 'Williams', email: 'ava.w@email.com', tier: 'Silver', visits: 6, spent: 1890, phone: '(310) 555-0234' },
  { id: 4, first: 'James', last: 'Park', email: 'james.park@email.com', tier: 'Platinum', visits: 31, spent: 12450, phone: '(310) 555-0301' },
  { id: 5, first: 'Isabella', last: 'Nguyen', email: 'isabella.n@email.com', tier: 'Gold', visits: 14, spent: 4890, phone: '(310) 555-0377' },
  { id: 6, first: 'Olivia', last: 'Martinez', email: 'olivia.m@email.com', tier: 'Silver', visits: 3, spent: 890, phone: '(310) 555-0410' },
  { id: 7, first: 'Ethan', last: 'Brooks', email: 'ethan.b@email.com', tier: 'Gold', visits: 11, spent: 3750, phone: '(310) 555-0465' },
  { id: 8, first: 'Mia', last: 'Thompson', email: 'mia.t@email.com', tier: 'Platinum', visits: 28, spent: 10200, phone: '(310) 555-0522' },
]

const UPCOMING_APPTS = [
  { patient: 'Sophia Chen', service: 'Botox — Forehead', time: '9:00 AM', status: 'Confirmed' },
  { patient: 'Marcus Rivera', service: 'Hydrafacial Deluxe', time: '10:30 AM', status: 'Checked In' },
  { patient: 'Ava Williams', service: 'Lip Filler Consult', time: '11:00 AM', status: 'Confirmed' },
  { patient: 'James Park', service: 'PRP Hair Restoration', time: '1:00 PM', status: 'Pending' },
  { patient: 'Isabella Nguyen', service: 'Chemical Peel', time: '2:30 PM', status: 'Confirmed' },
]

const SCHEDULE_APPTS = [
  { time: '9:00', patient: 'Sophia Chen', service: 'Botox — Forehead', duration: 45, color: '#8B5CF6' },
  { time: '10:00', patient: 'Marcus Rivera', service: 'Hydrafacial Deluxe', duration: 60, color: '#06B6D4' },
  { time: '11:00', patient: 'Ava Williams', service: 'Lip Filler Consult', duration: 30, color: '#F59E0B' },
  { time: '13:00', patient: 'James Park', service: 'PRP Hair Restoration', duration: 90, color: '#10B981' },
  { time: '14:30', patient: 'Isabella Nguyen', service: 'Chemical Peel', duration: 45, color: '#EC4899' },
  { time: '16:00', patient: 'Ethan Brooks', service: 'Microneedling', duration: 60, color: '#6366F1' },
]

const DM_CONVERSATIONS = [
  { id: 1, name: 'Jessica Taylor', platform: 'IG', avatar: 'JT', lastMsg: 'Hi! I saw your Botox special — is that still available?', time: '2m ago', unread: true },
  { id: 2, name: 'Ryan Kim', platform: 'FB', avatar: 'RK', lastMsg: 'Thanks for the info! Booking now.', time: '18m ago', unread: true },
  { id: 3, name: 'Amanda Lopez', platform: 'TT', avatar: 'AL', lastMsg: 'OMG your results are amazing 😍', time: '1h ago', unread: false },
  { id: 4, name: 'Chris Evans', platform: 'IG', avatar: 'CE', lastMsg: 'What\'s the downtime for the peel?', time: '3h ago', unread: false },
  { id: 5, name: 'Nina Patel', platform: 'FB', avatar: 'NP', lastMsg: 'Can I reschedule to Thursday?', time: '5h ago', unread: false },
]

const DM_THREAD = [
  { from: 'them', text: 'Hi! I saw your Botox special on IG — is that still available?', time: '2:41 PM' },
  { from: 'us', text: 'Hi Jessica! Yes, our spring special is $11/unit (reg $14). Would you like to book a consultation?', time: '2:42 PM' },
  { from: 'them', text: 'That\'s amazing! How many units do most people need for the forehead?', time: '2:43 PM' },
  { from: 'us', text: 'Typically 10-20 units for the forehead. Our injector will customize the exact amount during your consultation. Would Tuesday or Wednesday work for you?', time: '2:44 PM' },
  { from: 'them', text: 'Wednesday at 2pm would be perfect!', time: '2:45 PM' },
]

const DM_LEADERBOARD = [
  { name: 'Dr. Sarah Kim', revenue: 24800, convos: 42, conversion: '68%' },
  { name: 'Ashley Torres', revenue: 14200, convos: 38, conversion: '55%' },
  { name: 'Jordan Lee', revenue: 8400, convos: 27, conversion: '44%' },
]

const CHARTS = [
  { id: 1, patient: 'Sophia Chen', service: 'Botox — Forehead & Glabella', date: 'Mar 15, 2026', provider: 'Dr. Sarah Kim', status: 'Signed', units: '24 units Botox', zones: ['forehead', 'glabella'] },
  { id: 2, patient: 'James Park', service: 'Dermal Filler — Cheeks', date: 'Mar 14, 2026', provider: 'Dr. Sarah Kim', status: 'Signed', units: '2 syringes Juvederm Voluma', zones: ['leftCheek', 'rightCheek'] },
  { id: 3, patient: 'Mia Thompson', service: 'Lip Filler', date: 'Mar 14, 2026', provider: 'Dr. Sarah Kim', status: 'Draft', units: '1 syringe Juvederm Ultra', zones: ['lips'] },
  { id: 4, patient: 'Isabella Nguyen', service: 'Chemical Peel — Full Face', date: 'Mar 13, 2026', provider: 'Ashley Torres', status: 'Signed', units: 'VI Peel Precision Plus', zones: ['fullFace'] },
]

const TREATMENT_PLANS = [
  { id: 1, patient: 'Sophia Chen', plan: 'Anti-Aging Rejuvenation', provider: 'Dr. Sarah Kim', progress: 75, sessions: [
    { name: 'Botox Forehead', done: true, date: 'Jan 10' },
    { name: 'Hydrafacial', done: true, date: 'Feb 5' },
    { name: 'Botox Touch-up', done: true, date: 'Mar 1' },
    { name: 'Microneedling', done: false, date: 'Apr 2' },
  ]},
  { id: 2, patient: 'Marcus Rivera', plan: 'Acne Scar Treatment', provider: 'Dr. Sarah Kim', progress: 50, sessions: [
    { name: 'Chemical Peel', done: true, date: 'Feb 1' },
    { name: 'Microneedling #1', done: true, date: 'Feb 28' },
    { name: 'Microneedling #2', done: false, date: 'Mar 28' },
    { name: 'PRP Facial', done: false, date: 'Apr 25' },
  ]},
  { id: 3, patient: 'James Park', plan: 'Hair Restoration', provider: 'Dr. Sarah Kim', progress: 33, sessions: [
    { name: 'PRP Session #1', done: true, date: 'Feb 15' },
    { name: 'PRP Session #2', done: false, date: 'Mar 15' },
    { name: 'PRP Session #3', done: false, date: 'Apr 15' },
  ]},
  { id: 4, patient: 'Mia Thompson', plan: 'Lip Enhancement Journey', provider: 'Dr. Sarah Kim', progress: 66, sessions: [
    { name: 'Initial Filler', done: true, date: 'Jan 20' },
    { name: 'Touch-up', done: true, date: 'Feb 20' },
    { name: 'Final Touch-up', done: false, date: 'Mar 20' },
  ]},
]

const BOOKING_SERVICES = [
  { id: 1, name: 'Botox', price: 14, unit: '/unit', desc: 'Smooth fine lines and wrinkles', duration: '30 min', icon: '✦' },
  { id: 2, name: 'Dermal Fillers', price: 650, unit: '/syringe', desc: 'Restore volume and contour', duration: '45 min', icon: '◈' },
  { id: 3, name: 'Hydrafacial', price: 199, unit: '', desc: 'Deep cleanse and hydrate', duration: '60 min', icon: '❋' },
  { id: 4, name: 'Chemical Peel', price: 175, unit: '', desc: 'Reveal fresh, glowing skin', duration: '45 min', icon: '✧' },
  { id: 5, name: 'Microneedling', price: 325, unit: '', desc: 'Stimulate collagen production', duration: '60 min', icon: '⬡' },
  { id: 6, name: 'PRP Therapy', price: 750, unit: '', desc: 'Natural growth factor healing', duration: '90 min', icon: '◉' },
]

const CHECKIN_PATIENTS = [
  { id: 1, name: 'Sophia Chen', service: 'Botox — Forehead', time: '9:00 AM', status: 'Not Arrived' },
  { id: 2, name: 'Marcus Rivera', service: 'Hydrafacial Deluxe', time: '10:30 AM', status: 'Not Arrived' },
  { id: 3, name: 'Ava Williams', service: 'Lip Filler Consult', time: '11:00 AM', status: 'Not Arrived' },
  { id: 4, name: 'James Park', service: 'PRP Hair Restoration', time: '1:00 PM', status: 'Not Arrived' },
  { id: 5, name: 'Isabella Nguyen', service: 'Chemical Peel', time: '2:30 PM', status: 'Not Arrived' },
]

const MEMBERSHIP_TIERS = [
  { name: 'Silver', price: 99, color: '#94A3B8', members: 48, features: ['10% off all treatments', '1 Hydrafacial/month', 'Birthday reward', 'Priority booking'] },
  { name: 'Gold', price: 199, color: '#D4AF37', members: 67, recommended: true, features: ['15% off all treatments', '1 Hydrafacial + 1 Peel/month', 'Birthday reward', 'Priority booking', 'Free consultations', 'Guest pass (1/month)'] },
  { name: 'Platinum', price: 349, color: '#8B5CF6', members: 27, features: ['20% off all treatments', '2 Hydrafacials + 1 Peel/month', 'Birthday reward', 'Same-day booking', 'Free consultations', 'Guest pass (2/month)', 'Exclusive events', 'Annual photo shoot'] },
]

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4' },
  { key: 'schedule', label: 'Schedule', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { key: 'patients', label: 'Patients', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { key: 'inbox', label: 'DM Inbox', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
  { key: 'charts', label: 'Clinical Charts', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { key: 'plans', label: 'Treatment Plans', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { key: 'booking', label: 'Online Booking', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { key: 'portal', label: 'Patient Portal', icon: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { key: 'checkin', label: 'Check-In', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { key: 'memberships', label: 'Memberships', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
]

/* ═══════════════════════════════════════════════════════════════════════════
   STYLES — injected as a <style> block
   ═══════════════════════════════════════════════════════════════════════════ */

const STYLES = `
  .msd-wrap {
    display: flex;
    height: 100vh;
    background: #F5F3F0;
    font-family: var(--font-ui, 'Plus Jakarta Sans', system-ui, sans-serif);
    color: #1A1A1A;
    overflow: hidden;
  }

  /* ── Sidebar ── */
  .msd-sidebar {
    width: 240px;
    min-width: 240px;
    background: #111;
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow-y: auto;
  }
  .msd-sidebar::-webkit-scrollbar { width: 0; }
  .msd-logo {
    padding: 24px 20px 20px;
    font-family: var(--font-display, 'Playfair Display', Georgia, serif);
    font-size: 20px;
    color: #fff;
    letter-spacing: 0.02em;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 8px;
  }
  .msd-logo span { color: var(--brand, #D4AF37); }
  .msd-nav { flex: 1; padding: 4px 8px; }
  .msd-nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    font-size: 13.5px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 2px;
  }
  .msd-nav-item:hover { color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.04); }
  .msd-nav-item.active {
    color: #fff;
    background: rgba(255,255,255,0.08);
  }
  .msd-nav-item.active svg { color: var(--brand, #D4AF37); }
  .msd-nav-item svg { width: 18px; height: 18px; flex-shrink: 0; }
  .msd-sidebar-footer {
    padding: 16px 20px;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; gap: 10px;
  }
  .msd-avatar-sm {
    width: 32px; height: 32px; border-radius: 50%;
    background: linear-gradient(135deg, var(--brand, #D4AF37), #8B5CF6);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 600; color: #fff;
  }
  .msd-sidebar-footer .name { color: #fff; font-size: 13px; font-weight: 500; }
  .msd-sidebar-footer .role { color: rgba(255,255,255,0.4); font-size: 11px; }

  /* ── Content ── */
  .msd-content {
    flex: 1;
    overflow-y: auto;
    padding: 28px 32px;
  }
  .msd-content::-webkit-scrollbar { width: 5px; }
  .msd-content::-webkit-scrollbar-thumb { background: #D5D0C8; border-radius: 3px; }

  /* ── Shared ── */
  .msd-page-title {
    font-family: var(--font-display, 'Playfair Display', Georgia, serif);
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .msd-page-sub {
    color: #888;
    font-size: 14px;
    margin-bottom: 24px;
  }
  .msd-card {
    background: #fff;
    border: 1px solid #E5E2DC;
    border-radius: 14px;
    padding: 20px;
    transition: box-shadow 0.2s;
  }
  .msd-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
  .msd-badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  .msd-badge-confirmed { background: #DCFCE7; color: #166534; }
  .msd-badge-pending { background: #FEF9C3; color: #854D0E; }
  .msd-badge-checkedin { background: #DBEAFE; color: #1E40AF; }
  .msd-badge-draft { background: #FEF3C7; color: #92400E; }
  .msd-badge-signed { background: #D1FAE5; color: #065F46; }
  .msd-badge-silver { background: #F1F5F9; color: #475569; }
  .msd-badge-gold { background: #FEF3C7; color: #92400E; }
  .msd-badge-platinum { background: #EDE9FE; color: #5B21B6; }
  .msd-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 18px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }
  .msd-btn-primary {
    background: var(--brand, #D4AF37);
    color: #fff;
  }
  .msd-btn-primary:hover { filter: brightness(1.1); }
  .msd-btn-outline {
    background: transparent;
    border: 1.5px solid #E5E2DC;
    color: #555;
  }
  .msd-btn-outline:hover { border-color: #bbb; }
  .msd-btn-sm { padding: 6px 12px; font-size: 12px; }
  .msd-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .msd-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .msd-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .msd-input {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid #E5E2DC;
    border-radius: 10px;
    font-size: 13.5px;
    outline: none;
    transition: border 0.2s;
    background: #fff;
  }
  .msd-input:focus { border-color: var(--brand, #D4AF37); }
  .msd-label {
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 10.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #999;
    margin-bottom: 6px;
  }
  .msd-section-title {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .msd-pill {
    display: inline-flex; align-items: center;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12.5px;
    font-weight: 500;
    cursor: pointer;
    border: 1.5px solid #E5E2DC;
    background: #fff;
    transition: all 0.2s;
  }
  .msd-pill.active {
    background: var(--brand, #D4AF37);
    color: #fff;
    border-color: var(--brand, #D4AF37);
  }
  .msd-pill:hover:not(.active) { border-color: #bbb; }

  /* ── Dashboard KPIs ── */
  .msd-kpi-value {
    font-size: 28px;
    font-weight: 700;
    font-family: var(--font-display, 'Playfair Display', Georgia, serif);
  }
  .msd-kpi-label {
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #888;
    margin-top: 4px;
  }
  .msd-kpi-icon {
    width: 40px; height: 40px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }

  /* ── Schedule ── */
  .msd-schedule-grid {
    position: relative;
    border-left: 2px solid #E5E2DC;
    margin-left: 60px;
  }
  .msd-time-row {
    display: flex;
    align-items: flex-start;
    min-height: 60px;
    position: relative;
    border-bottom: 1px solid #f0ede8;
    cursor: pointer;
    transition: background 0.15s;
  }
  .msd-time-row:hover { background: rgba(212,175,55,0.03); }
  .msd-time-label {
    position: absolute;
    left: -62px;
    top: -8px;
    font-family: var(--font-mono, monospace);
    font-size: 11px;
    color: #999;
    width: 50px;
    text-align: right;
  }
  .msd-appt-block {
    margin: 4px 8px 4px 12px;
    padding: 8px 14px;
    border-radius: 10px;
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    min-width: 200px;
  }
  .msd-appt-block small { opacity: 0.8; font-weight: 400; font-size: 11.5px; }

  /* ── Patient Cards ── */
  .msd-patient-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px 16px;
  }
  .msd-patient-avatar {
    width: 56px; height: 56px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 700; color: #fff;
    margin-bottom: 12px;
  }
  .msd-patient-name { font-weight: 600; font-size: 14.5px; margin-bottom: 2px; }
  .msd-patient-email { color: #999; font-size: 12px; margin-bottom: 10px; }
  .msd-patient-stats {
    display: flex; gap: 16px; margin-top: 10px;
    font-size: 12px; color: #666;
  }
  .msd-patient-stats strong { color: #1A1A1A; }

  /* ── DM Inbox ── */
  .msd-inbox-wrap { display: flex; gap: 0; height: calc(100vh - 140px); }
  .msd-inbox-list {
    width: 320px; min-width: 320px;
    border-right: 1px solid #E5E2DC;
    overflow-y: auto;
    background: #fff;
    border-radius: 14px 0 0 14px;
  }
  .msd-inbox-thread {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 0 14px 14px 0;
  }
  .msd-convo-item {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 16px;
    cursor: pointer;
    border-bottom: 1px solid #f5f3f0;
    transition: background 0.15s;
  }
  .msd-convo-item:hover { background: #FAFAF8; }
  .msd-convo-item.active { background: #F5F3F0; }
  .msd-convo-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .msd-convo-meta { flex: 1; min-width: 0; }
  .msd-convo-name { font-weight: 600; font-size: 13.5px; display: flex; align-items: center; gap: 6px; }
  .msd-convo-preview { color: #888; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .msd-convo-time { color: #aaa; font-size: 11px; flex-shrink: 0; }
  .msd-unread-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--brand, #D4AF37); flex-shrink: 0; }
  .msd-platform-badge {
    font-size: 9.5px; font-weight: 700; padding: 2px 6px;
    border-radius: 4px; letter-spacing: 0.04em;
  }
  .msd-platform-ig { background: linear-gradient(135deg, #F58529, #DD2A7B, #8134AF); color: #fff; }
  .msd-platform-fb { background: #1877F2; color: #fff; }
  .msd-platform-tt { background: #111; color: #fff; }
  .msd-msg-bubble {
    max-width: 70%;
    padding: 10px 16px;
    border-radius: 16px;
    font-size: 13.5px;
    line-height: 1.5;
    margin-bottom: 6px;
  }
  .msd-msg-them {
    background: #F5F3F0;
    color: #1A1A1A;
    border-bottom-left-radius: 4px;
    align-self: flex-start;
  }
  .msd-msg-us {
    background: var(--brand, #D4AF37);
    color: #fff;
    border-bottom-right-radius: 4px;
    align-self: flex-end;
  }
  .msd-msg-time { font-size: 10px; color: #aaa; margin-bottom: 12px; }

  /* ── Charts face diagram ── */
  .msd-face-svg { width: 200px; height: 260px; }
  .msd-face-zone { cursor: pointer; transition: opacity 0.2s; }
  .msd-face-zone:hover { opacity: 0.7; }

  /* ── Progress ring ── */
  .msd-ring-wrap { position: relative; width: 64px; height: 64px; }
  .msd-ring-text {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    font-size: 14px; font-weight: 700;
  }

  /* ── Booking ── */
  .msd-booking-steps {
    display: flex; align-items: center; gap: 0; margin-bottom: 28px;
  }
  .msd-step {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 500; color: #aaa;
  }
  .msd-step.active { color: var(--brand, #D4AF37); }
  .msd-step.done { color: #16A34A; }
  .msd-step-num {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700;
    border: 2px solid #ddd;
    color: #aaa;
  }
  .msd-step.active .msd-step-num { border-color: var(--brand, #D4AF37); color: var(--brand, #D4AF37); background: rgba(212,175,55,0.08); }
  .msd-step.done .msd-step-num { border-color: #16A34A; color: #fff; background: #16A34A; }
  .msd-step-line { width: 40px; height: 2px; background: #E5E2DC; margin: 0 8px; }

  /* ── Membership cards ── */
  .msd-tier-card {
    display: flex;
    flex-direction: column;
    padding: 28px 24px;
    position: relative;
    overflow: hidden;
  }
  .msd-tier-card.recommended {
    border: 2px solid var(--brand, #D4AF37);
    box-shadow: 0 4px 24px rgba(212,175,55,0.12);
  }
  .msd-tier-rec-badge {
    position: absolute; top: 14px; right: -28px;
    background: var(--brand, #D4AF37); color: #fff;
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 4px 36px;
    transform: rotate(45deg);
  }
  .msd-tier-price {
    font-size: 42px; font-weight: 700;
    font-family: var(--font-display, serif);
  }
  .msd-tier-price span { font-size: 15px; font-weight: 400; color: #888; }
  .msd-tier-features { list-style: none; padding: 0; margin: 16px 0; }
  .msd-tier-features li {
    padding: 6px 0;
    font-size: 13.5px;
    color: #555;
    display: flex; align-items: center; gap: 8px;
  }
  .msd-tier-features li::before {
    content: '✓';
    color: var(--brand, #D4AF37);
    font-weight: 700;
    font-size: 13px;
  }
  .msd-check-card {
    display: flex; align-items: center; gap: 16px;
    padding: 18px 20px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .msd-check-card:hover { background: #FAFAF8; }
  .msd-status-not { background: #F1F5F9; color: #64748B; }
  .msd-status-checkedin { background: #DBEAFE; color: #1E40AF; }
  .msd-status-provider { background: #FEF3C7; color: #92400E; }
  .msd-status-complete { background: #DCFCE7; color: #166534; }

  /* ── Portal ── */
  .msd-portal-hero {
    background: linear-gradient(135deg, #111 0%, #1a1a1a 100%);
    color: #fff;
    padding: 32px;
    border-radius: 14px;
    margin-bottom: 20px;
  }
  .msd-portal-hero h2 {
    font-family: var(--font-display, serif);
    font-size: 24px;
    margin-bottom: 4px;
  }

  /* ── Revenue bar ── */
  .msd-revenue-bar {
    display: flex; gap: 20px; padding: 16px 20px;
    background: #fff; border-radius: 14px;
    border: 1px solid #E5E2DC;
    margin-bottom: 20px;
  }
  .msd-revenue-item {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px;
  }
  .msd-revenue-item strong {
    font-family: var(--font-display, serif);
    font-size: 18px;
  }

  /* Transitions */
  .msd-fade-in {
    animation: msdFadeIn 0.3s ease;
  }
  @keyframes msdFadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`

/* ═══════════════════════════════════════════════════════════════════════════
   HELPER COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function NavIcon({ d }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

function Avatar({ initials, size = 56, gradient }) {
  const bg = gradient || 'linear-gradient(135deg, var(--brand, #D4AF37), #8B5CF6)'
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.32, fontWeight: 700, color: '#fff', flexShrink: 0,
    }}>{initials}</div>
  )
}

function ProgressRing({ percent, size = 64, stroke = 5, color }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (percent / 100) * c
  return (
    <div className="msd-ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E2DC" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color || 'var(--brand, #D4AF37)'} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={offset}
          strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
      </svg>
      <div className="msd-ring-text">{percent}%</div>
    </div>
  )
}

function TierBadge({ tier }) {
  const cls = `msd-badge msd-badge-${tier.toLowerCase()}`
  return <span className={cls}>{tier}</span>
}

function StatusBadge({ status }) {
  const map = {
    'Confirmed': 'confirmed', 'Pending': 'pending', 'Checked In': 'checkedin',
    'Draft': 'draft', 'Signed': 'signed',
    'Not Arrived': 'not', 'With Provider': 'provider', 'Complete': 'complete',
  }
  const key = map[status] || 'confirmed'
  const statusCls = status === 'Not Arrived' ? 'msd-status-not'
    : status === 'Checked In' ? 'msd-status-checkedin'
    : status === 'With Provider' ? 'msd-status-provider'
    : status === 'Complete' ? 'msd-status-complete'
    : `msd-badge-${key}`
  return <span className={`msd-badge ${statusCls}`}>{status}</span>
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function DashboardPage() {
  const kpis = [
    { label: "Today's Appts", value: '8', icon: '📅', bg: '#EDE9FE' },
    { label: 'Monthly Revenue', value: '$47,200', icon: '💰', bg: '#D1FAE5' },
    { label: 'Active Patients', value: '142', icon: '👥', bg: '#DBEAFE' },
    { label: 'Retention Alerts', value: '5', icon: '🔔', bg: '#FEF3C7' },
  ]
  return (
    <div className="msd-fade-in">
      <div className="msd-page-title">Good morning, Dr. Kim</div>
      <div className="msd-page-sub">Tuesday, March 17 — Here's what's happening today.</div>

      <div className="msd-grid-4" style={{ marginBottom: 24 }}>
        {kpis.map((k, i) => (
          <div key={i} className="msd-card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="msd-kpi-icon" style={{ background: k.bg, fontSize: 20 }}>{k.icon}</div>
            <div>
              <div className="msd-kpi-value">{k.value}</div>
              <div className="msd-kpi-label">{k.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 2 }}>
          <div className="msd-section-title">Upcoming Appointments</div>
          <div className="msd-card" style={{ padding: 0 }}>
            {UPCOMING_APPTS.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 20px', borderBottom: i < UPCOMING_APPTS.length - 1 ? '1px solid #f0ede8' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar initials={a.patient.split(' ').map(n => n[0]).join('')} size={36} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>{a.patient}</div>
                    <div style={{ color: '#888', fontSize: 12 }}>{a.service}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 12, color: '#888' }}>{a.time}</span>
                  <StatusBadge status={a.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div className="msd-section-title">Quick Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['New Patient', 'Book Appointment', 'Send Email'].map((a, i) => (
              <button key={i} className="msd-btn msd-btn-outline" style={{ justifyContent: 'center', width: '100%', padding: '14px 18px' }}>
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SchedulePage() {
  const [view, setView] = useState('Day')
  const hours = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']
  const apptMap = {}
  SCHEDULE_APPTS.forEach(a => {
    const h = parseInt(a.time.split(':')[0])
    const label = h < 12 ? `${h}:00 AM` : h === 12 ? '12:00 PM' : `${h - 12}:00 PM`
    apptMap[label] = a
  })
  const [bookingSlot, setBookingSlot] = useState(null)

  return (
    <div className="msd-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div className="msd-page-title">Schedule</div>
          <div className="msd-page-sub">Manage your daily appointments.</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Day', 'Week', 'List'].map(v => (
            <button key={v} className={`msd-pill ${view === v ? 'active' : ''}`} onClick={() => setView(v)}>{v}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button className="msd-btn msd-btn-outline msd-btn-sm">←</button>
        <button className="msd-btn msd-btn-primary msd-btn-sm">Today</button>
        <button className="msd-btn msd-btn-outline msd-btn-sm">→</button>
        <span style={{ fontWeight: 600, fontSize: 15, marginLeft: 8 }}>Tuesday, March 17</span>
      </div>

      <div className="msd-schedule-grid">
        {hours.map((h, i) => {
          const appt = apptMap[h]
          return (
            <div key={i} className="msd-time-row" onClick={() => !appt && setBookingSlot(h)}>
              <div className="msd-time-label">{h}</div>
              {appt ? (
                <div className="msd-appt-block" style={{ background: appt.color }}>
                  <div>{appt.patient}</div>
                  <small>{appt.service} · {appt.duration} min</small>
                </div>
              ) : (
                bookingSlot === h ? (
                  <div style={{ margin: '4px 8px 4px 12px', padding: '8px 14px', background: 'rgba(212,175,55,0.08)', borderRadius: 10, border: '1.5px dashed var(--brand, #D4AF37)', fontSize: 13, color: 'var(--brand, #D4AF37)', fontWeight: 500 }}>
                    + Book Appointment at {h}
                  </div>
                ) : null
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PatientsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const tiers = ['All', 'Silver', 'Gold', 'Platinum']
  const gradients = [
    'linear-gradient(135deg, #8B5CF6, #EC4899)',
    'linear-gradient(135deg, #06B6D4, #10B981)',
    'linear-gradient(135deg, #F59E0B, #EF4444)',
    'linear-gradient(135deg, #6366F1, #8B5CF6)',
    'linear-gradient(135deg, #EC4899, #F59E0B)',
    'linear-gradient(135deg, #10B981, #06B6D4)',
    'linear-gradient(135deg, #EF4444, #6366F1)',
    'linear-gradient(135deg, #D4AF37, #8B5CF6)',
  ]
  const filtered = PATIENTS.filter(p => {
    if (filter !== 'All' && p.tier !== filter) return false
    if (search && !`${p.first} ${p.last}`.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="msd-fade-in">
      <div className="msd-page-title">Patients</div>
      <div className="msd-page-sub">{PATIENTS.length} active patients in your practice.</div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
        <input className="msd-input" placeholder="Search patients..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 300 }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {tiers.map(t => (
            <button key={t} className={`msd-pill ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
          ))}
        </div>
      </div>

      <div className="msd-grid-4">
        {filtered.map((p, i) => (
          <div key={p.id} className="msd-card msd-patient-card">
            <Avatar initials={p.first[0] + p.last[0]} size={56} gradient={gradients[i % gradients.length]} />
            <div className="msd-patient-name">{p.first} {p.last}</div>
            <div className="msd-patient-email">{p.email}</div>
            <TierBadge tier={p.tier} />
            <div className="msd-patient-stats">
              <div><strong>{p.visits}</strong> visits</div>
              <div><strong>${p.spent.toLocaleString()}</strong> spent</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function InboxPage() {
  const [activeConvo, setActiveConvo] = useState(1)
  const [replyText, setReplyText] = useState('')
  const [messages, setMessages] = useState(DM_THREAD)
  const [tab, setTab] = useState('inbox')
  const threadEnd = useRef(null)

  useEffect(() => {
    threadEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!replyText.trim()) return
    setMessages([...messages, { from: 'us', text: replyText, time: 'Just now' }])
    setReplyText('')
  }

  const platformColors = { IG: 'linear-gradient(135deg, #F58529, #DD2A7B)', FB: '#1877F2', TT: '#111' }

  return (
    <div className="msd-fade-in">
      <div className="msd-page-title">DM Inbox</div>
      <div className="msd-page-sub">Manage conversations across all platforms.</div>

      <div className="msd-revenue-bar">
        {[
          { platform: 'IG', label: 'Instagram', value: '$47,200' },
          { platform: 'FB', label: 'Facebook', value: '$18,600' },
          { platform: 'TT', label: 'TikTok', value: '$8,400' },
        ].map((r, i) => (
          <div key={i} className="msd-revenue-item">
            <span className={`msd-platform-badge msd-platform-${r.platform.toLowerCase()}`}>{r.platform}</span>
            <div>
              <div style={{ fontSize: 11, color: '#888' }}>{r.label} Revenue</div>
              <strong>{r.value}</strong>
            </div>
          </div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <button className={`msd-pill ${tab === 'inbox' ? 'active' : ''}`} onClick={() => setTab('inbox')}>Inbox</button>
          <button className={`msd-pill ${tab === 'leaderboard' ? 'active' : ''}`} onClick={() => setTab('leaderboard')}>Leaderboard</button>
        </div>
      </div>

      {tab === 'leaderboard' ? (
        <div className="msd-card">
          <div className="msd-section-title">Staff Leaderboard</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f0ede8' }}>
                {['Rank', 'Staff', 'Revenue', 'Conversations', 'Conversion'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono, monospace)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DM_LEADERBOARD.map((s, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f5f3f0' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: i === 0 ? 'var(--brand, #D4AF37)' : '#888' }}>#{i + 1}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 600 }}>{s.name}</td>
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--font-display, serif)', fontWeight: 600 }}>${s.revenue.toLocaleString()}</td>
                  <td style={{ padding: '14px 16px' }}>{s.convos}</td>
                  <td style={{ padding: '14px 16px' }}><span className="msd-badge msd-badge-confirmed">{s.conversion}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="msd-inbox-wrap" style={{ border: '1px solid #E5E2DC', borderRadius: 14 }}>
          <div className="msd-inbox-list">
            {DM_CONVERSATIONS.map(c => (
              <div key={c.id} className={`msd-convo-item ${activeConvo === c.id ? 'active' : ''}`} onClick={() => setActiveConvo(c.id)}>
                <div className="msd-convo-avatar" style={{ background: typeof platformColors[c.platform] === 'string' ? platformColors[c.platform] : undefined, backgroundImage: typeof platformColors[c.platform] !== 'string' ? platformColors[c.platform] : undefined }}>{c.avatar}</div>
                <div className="msd-convo-meta">
                  <div className="msd-convo-name">
                    {c.name}
                    <span className={`msd-platform-badge msd-platform-${c.platform.toLowerCase()}`}>{c.platform}</span>
                  </div>
                  <div className="msd-convo-preview">{c.lastMsg}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                  <span className="msd-convo-time">{c.time}</span>
                  {c.unread && <span className="msd-unread-dot" />}
                </div>
              </div>
            ))}
          </div>

          <div className="msd-inbox-thread">
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0ede8', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              {DM_CONVERSATIONS.find(c => c.id === activeConvo)?.name}
              <span className={`msd-platform-badge msd-platform-${DM_CONVERSATIONS.find(c => c.id === activeConvo)?.platform.toLowerCase()}`}>
                {DM_CONVERSATIONS.find(c => c.id === activeConvo)?.platform}
              </span>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column' }}>
              {messages.map((m, i) => (
                <div key={i} style={{ alignSelf: m.from === 'us' ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                  <div className={`msd-msg-bubble ${m.from === 'us' ? 'msd-msg-us' : 'msd-msg-them'}`}>{m.text}</div>
                  <div className="msd-msg-time" style={{ textAlign: m.from === 'us' ? 'right' : 'left' }}>{m.time}</div>
                </div>
              ))}
              <div ref={threadEnd} />
            </div>
            <div style={{ padding: '12px 16px', borderTop: '1px solid #f0ede8', display: 'flex', gap: 8 }}>
              <input className="msd-input" placeholder="Type a reply..." value={replyText} onChange={e => setReplyText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()} />
              <button className="msd-btn msd-btn-primary" onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ChartsPage() {
  const [selectedChart, setSelectedChart] = useState(null)
  const [activeZone, setActiveZone] = useState(null)

  const zoneDetails = {
    forehead: { label: 'Forehead', detail: '10 units Botox — superficial injection, 5 points' },
    glabella: { label: 'Glabella', detail: '14 units Botox — 5 point injection pattern' },
    leftCheek: { label: 'Left Cheek', detail: '1 syringe Juvederm Voluma — deep injection, 3 points' },
    rightCheek: { label: 'Right Cheek', detail: '1 syringe Juvederm Voluma — deep injection, 3 points' },
    lips: { label: 'Lips', detail: '1 syringe Juvederm Ultra — vermilion border + body' },
    fullFace: { label: 'Full Face', detail: 'VI Peel Precision Plus — 2 layers, 4 min application' },
  }

  if (selectedChart) {
    const chart = CHARTS.find(c => c.id === selectedChart)
    return (
      <div className="msd-fade-in">
        <button className="msd-btn msd-btn-outline msd-btn-sm" onClick={() => { setSelectedChart(null); setActiveZone(null) }} style={{ marginBottom: 16 }}>← Back to Charts</button>
        <div className="msd-page-title">{chart.patient} — {chart.service}</div>
        <div className="msd-page-sub">{chart.date} · {chart.provider} · <StatusBadge status={chart.status} /></div>

        <div style={{ display: 'flex', gap: 24 }}>
          <div className="msd-card" style={{ flex: 1 }}>
            <div className="msd-section-title">SOAP Notes</div>
            <div style={{ marginBottom: 16 }}>
              <div className="msd-label">Subjective</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#555' }}>Patient presents for {chart.service.toLowerCase()}. Reports desired outcome of natural-looking enhancement. No allergies to lidocaine. No history of adverse reactions to injectables.</p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div className="msd-label">Objective</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#555' }}>Skin assessment: good turgor, no active lesions. Treatment area clean and prepped with chlorhexidine. Topical lidocaine applied 15 minutes prior.</p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div className="msd-label">Assessment</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#555' }}>Treatment: {chart.units}. Procedure tolerated well. Minimal bruising noted. Symmetry achieved.</p>
            </div>
            <div>
              <div className="msd-label">Plan</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#555' }}>Follow up in 2 weeks for assessment. Avoid strenuous exercise 24h. Ice as needed for swelling. Return for touch-up if asymmetry noted at follow-up.</p>
            </div>
          </div>

          <div className="msd-card" style={{ width: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24 }}>
            <div className="msd-section-title" style={{ alignSelf: 'flex-start' }}>Injection Map</div>
            <svg viewBox="0 0 200 260" width="200" height="260" style={{ marginBottom: 16 }}>
              {/* Face outline */}
              <ellipse cx="100" cy="120" rx="70" ry="90" fill="#FAF8F5" stroke="#E5E2DC" strokeWidth="2" />
              {/* Eyes */}
              <ellipse cx="72" cy="105" rx="14" ry="7" fill="none" stroke="#ccc" strokeWidth="1.5" />
              <ellipse cx="128" cy="105" rx="14" ry="7" fill="none" stroke="#ccc" strokeWidth="1.5" />
              <circle cx="72" cy="105" r="4" fill="#ccc" />
              <circle cx="128" cy="105" r="4" fill="#ccc" />
              {/* Nose */}
              <path d="M100 95 L95 130 Q100 134 105 130 Z" fill="none" stroke="#ccc" strokeWidth="1.5" />
              {/* Mouth */}
              <path d="M80 150 Q100 164 120 150" fill="none" stroke="#ccc" strokeWidth="1.5" />
              {/* Eyebrows */}
              <path d="M55 88 Q72 80 90 88" fill="none" stroke="#ccc" strokeWidth="1.5" />
              <path d="M110 88 Q128 80 145 88" fill="none" stroke="#ccc" strokeWidth="1.5" />

              {/* Clickable zones */}
              {chart.zones.includes('forehead') && (
                <rect x="60" y="40" width="80" height="35" rx="8" fill={activeZone === 'forehead' ? 'rgba(212,175,55,0.35)' : 'rgba(212,175,55,0.15)'} stroke="var(--brand, #D4AF37)" strokeWidth="1.5" className="msd-face-zone" onClick={() => setActiveZone('forehead')} />
              )}
              {chart.zones.includes('glabella') && (
                <rect x="82" y="75" width="36" height="22" rx="6" fill={activeZone === 'glabella' ? 'rgba(139,92,246,0.35)' : 'rgba(139,92,246,0.15)'} stroke="#8B5CF6" strokeWidth="1.5" className="msd-face-zone" onClick={() => setActiveZone('glabella')} />
              )}
              {chart.zones.includes('leftCheek') && (
                <ellipse cx="60" cy="130" rx="18" ry="22" fill={activeZone === 'leftCheek' ? 'rgba(6,182,212,0.35)' : 'rgba(6,182,212,0.15)'} stroke="#06B6D4" strokeWidth="1.5" className="msd-face-zone" onClick={() => setActiveZone('leftCheek')} />
              )}
              {chart.zones.includes('rightCheek') && (
                <ellipse cx="140" cy="130" rx="18" ry="22" fill={activeZone === 'rightCheek' ? 'rgba(6,182,212,0.35)' : 'rgba(6,182,212,0.15)'} stroke="#06B6D4" strokeWidth="1.5" className="msd-face-zone" onClick={() => setActiveZone('rightCheek')} />
              )}
              {chart.zones.includes('lips') && (
                <ellipse cx="100" cy="154" rx="24" ry="14" fill={activeZone === 'lips' ? 'rgba(236,72,153,0.35)' : 'rgba(236,72,153,0.15)'} stroke="#EC4899" strokeWidth="1.5" className="msd-face-zone" onClick={() => setActiveZone('lips')} />
              )}
              {chart.zones.includes('fullFace') && (
                <ellipse cx="100" cy="120" rx="65" ry="85" fill={activeZone === 'fullFace' ? 'rgba(212,175,55,0.2)' : 'rgba(212,175,55,0.08)'} stroke="var(--brand, #D4AF37)" strokeWidth="1.5" strokeDasharray="6 3" className="msd-face-zone" onClick={() => setActiveZone('fullFace')} />
              )}
            </svg>

            {activeZone && zoneDetails[activeZone] && (
              <div style={{ background: '#F5F3F0', borderRadius: 10, padding: '12px 16px', width: '100%', fontSize: 13, lineHeight: 1.5 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{zoneDetails[activeZone].label}</div>
                <div style={{ color: '#666' }}>{zoneDetails[activeZone].detail}</div>
              </div>
            )}
            {!activeZone && <div style={{ fontSize: 12, color: '#aaa' }}>Click a zone to see details</div>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="msd-fade-in">
      <div className="msd-page-title">Clinical Charts</div>
      <div className="msd-page-sub">Treatment documentation and injection mapping.</div>

      <div className="msd-card" style={{ padding: 0 }}>
        {CHARTS.map((c, i) => (
          <div key={c.id} onClick={() => setSelectedChart(c.id)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 20px', borderBottom: i < CHARTS.length - 1 ? '1px solid #f0ede8' : 'none',
            cursor: 'pointer', transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#FAFAF8'}
          onMouseLeave={e => e.currentTarget.style.background = ''}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Avatar initials={c.patient.split(' ').map(n => n[0]).join('')} size={40} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{c.patient}</div>
                <div style={{ color: '#888', fontSize: 12.5 }}>{c.service}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 12.5, color: '#888' }}>{c.date}</span>
              <span style={{ fontSize: 12.5, color: '#888' }}>{c.provider}</span>
              <StatusBadge status={c.status} />
              <span style={{ color: '#ccc', fontSize: 18 }}>›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlansPage() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="msd-fade-in">
      <div className="msd-page-title">Treatment Plans</div>
      <div className="msd-page-sub">Track patient treatment progress and sessions.</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {TREATMENT_PLANS.map(plan => (
          <div key={plan.id} className="msd-card" style={{ cursor: 'pointer' }} onClick={() => setExpanded(expanded === plan.id ? null : plan.id)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <ProgressRing percent={plan.progress} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{plan.plan}</div>
                <div style={{ color: '#888', fontSize: 13 }}>{plan.patient} · {plan.provider}</div>
              </div>
              <span style={{ color: '#ccc', fontSize: 20, transform: expanded === plan.id ? 'rotate(90deg)' : '', transition: 'transform 0.2s' }}>›</span>
            </div>

            {expanded === plan.id && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f0ede8' }}>
                {plan.sessions.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < plan.sessions.length - 1 ? '1px solid #f8f6f3' : 'none' }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: s.done ? '#16A34A' : '#E5E2DC', color: '#fff', fontSize: 12, fontWeight: 700,
                    }}>{s.done ? '✓' : (i + 1)}</div>
                    <div style={{ flex: 1, fontWeight: 500, fontSize: 13.5, color: s.done ? '#1A1A1A' : '#888', textDecoration: s.done ? 'none' : 'none' }}>{s.name}</div>
                    <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11.5, color: '#aaa' }}>{s.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function BookingPage() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  const dates = [
    { day: 'Mon', date: '17', month: 'Mar' },
    { day: 'Tue', date: '18', month: 'Mar' },
    { day: 'Wed', date: '19', month: 'Mar' },
    { day: 'Thu', date: '20', month: 'Mar' },
    { day: 'Fri', date: '21', month: 'Mar' },
  ]
  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']

  return (
    <div className="msd-fade-in">
      <div className="msd-page-title">Book an Appointment</div>
      <div className="msd-page-sub">Select a service and choose your preferred time.</div>

      <div className="msd-booking-steps">
        <div className={`msd-step ${step === 1 ? 'active' : step > 1 ? 'done' : ''}`}>
          <div className="msd-step-num">{step > 1 ? '✓' : '1'}</div>
          <span>Service</span>
        </div>
        <div className="msd-step-line" />
        <div className={`msd-step ${step === 2 ? 'active' : step > 2 ? 'done' : ''}`}>
          <div className="msd-step-num">{step > 2 ? '✓' : '2'}</div>
          <span>Date & Time</span>
        </div>
        <div className="msd-step-line" />
        <div className={`msd-step ${step === 3 ? 'active' : ''}`}>
          <div className="msd-step-num">3</div>
          <span>Confirm</span>
        </div>
      </div>

      {step === 1 && (
        <div className="msd-grid-3">
          {BOOKING_SERVICES.map(s => (
            <div key={s.id} className="msd-card" style={{
              cursor: 'pointer', textAlign: 'center', padding: '28px 20px',
              border: selectedService === s.id ? '2px solid var(--brand, #D4AF37)' : '1px solid #E5E2DC',
              transition: 'all 0.2s',
            }} onClick={() => setSelectedService(s.id)}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{s.name}</div>
              <div style={{ color: '#888', fontSize: 12.5, marginBottom: 10 }}>{s.desc}</div>
              <div style={{ fontFamily: 'var(--font-display, serif)', fontSize: 22, fontWeight: 700 }}>
                ${s.price}<span style={{ fontSize: 13, fontWeight: 400, color: '#888' }}>{s.unit}</span>
              </div>
              <div style={{ fontSize: 11, color: '#aaa', marginTop: 4 }}>{s.duration}</div>
            </div>
          ))}
          {selectedService && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'right' }}>
              <button className="msd-btn msd-btn-primary" onClick={() => setStep(2)}>Continue →</button>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="msd-section-title">Select a Date</div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            {dates.map((d, i) => (
              <div key={i} onClick={() => setSelectedDate(i)} style={{
                padding: '14px 20px', borderRadius: 12, textAlign: 'center', cursor: 'pointer',
                background: selectedDate === i ? 'var(--brand, #D4AF37)' : '#fff',
                color: selectedDate === i ? '#fff' : '#1A1A1A',
                border: selectedDate === i ? 'none' : '1.5px solid #E5E2DC',
                transition: 'all 0.2s', minWidth: 80,
              }}>
                <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>{d.day}</div>
                <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display, serif)' }}>{d.date}</div>
                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{d.month}</div>
              </div>
            ))}
          </div>

          {selectedDate !== null && (
            <>
              <div className="msd-section-title">Select a Time</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                {times.map((t, i) => (
                  <button key={i} className={`msd-pill ${selectedTime === i ? 'active' : ''}`} onClick={() => setSelectedTime(i)} style={{ minWidth: 90 }}>{t}</button>
                ))}
              </div>
            </>
          )}

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="msd-btn msd-btn-outline" onClick={() => setStep(1)}>← Back</button>
            {selectedTime !== null && <button className="msd-btn msd-btn-primary" onClick={() => setStep(3)}>Continue →</button>}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="msd-card" style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
          <div style={{ fontFamily: 'var(--font-display, serif)', fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Booking Confirmed!</div>
          <div style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Your appointment has been scheduled.</div>
          <div style={{ background: '#F5F3F0', borderRadius: 12, padding: 20, textAlign: 'left', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span className="msd-label">Service</span>
              <span style={{ fontSize: 13.5, fontWeight: 500 }}>{BOOKING_SERVICES.find(s => s.id === selectedService)?.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span className="msd-label">Date</span>
              <span style={{ fontSize: 13.5, fontWeight: 500 }}>{dates[selectedDate]?.day}, {dates[selectedDate]?.month} {dates[selectedDate]?.date}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="msd-label">Time</span>
              <span style={{ fontSize: 13.5, fontWeight: 500 }}>{times[selectedTime]}</span>
            </div>
          </div>
          <button className="msd-btn msd-btn-primary" onClick={() => { setStep(1); setSelectedService(null); setSelectedDate(null); setSelectedTime(null) }}>Book Another</button>
        </div>
      )}
    </div>
  )
}

function PortalPage() {
  return (
    <div className="msd-fade-in">
      <div className="msd-portal-hero">
        <h2>Welcome back, Sophia</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Your next visit is just around the corner.</p>
      </div>

      <div className="msd-grid-2" style={{ marginBottom: 20 }}>
        <div className="msd-card">
          <div className="msd-label">Next Appointment</div>
          <div style={{ fontWeight: 600, fontSize: 16, marginTop: 6 }}>Botox Touch-up</div>
          <div style={{ color: '#888', fontSize: 13 }}>Wednesday, Mar 19 at 2:00 PM</div>
          <div style={{ color: '#888', fontSize: 12, marginTop: 4 }}>with Dr. Sarah Kim</div>
          <button className="msd-btn msd-btn-outline msd-btn-sm" style={{ marginTop: 14 }}>Reschedule</button>
        </div>
        <div className="msd-card">
          <div className="msd-label">Membership Status</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
            <TierBadge tier="Platinum" />
            <span style={{ fontWeight: 600, fontSize: 15 }}>Platinum Member</span>
          </div>
          <div style={{ color: '#888', fontSize: 13, marginTop: 4 }}>Member since January 2025</div>
          <div style={{ marginTop: 10, fontSize: 12.5, color: '#666' }}>20% off all treatments · 2 Hydrafacials/mo</div>
        </div>
      </div>

      <div className="msd-grid-2">
        <div className="msd-card">
          <div className="msd-label">Wallet Balance</div>
          <div style={{ fontFamily: 'var(--font-display, serif)', fontSize: 36, fontWeight: 700, marginTop: 6 }}>$420</div>
          <div style={{ color: '#888', fontSize: 13, marginTop: 4 }}>Available credit from rewards & referrals</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button className="msd-btn msd-btn-primary msd-btn-sm">Add Funds</button>
            <button className="msd-btn msd-btn-outline msd-btn-sm">View History</button>
          </div>
        </div>
        <div className="msd-card">
          <div className="msd-label">Refer a Friend</div>
          <div style={{ fontWeight: 600, fontSize: 16, marginTop: 6 }}>Give $50, Get $50</div>
          <div style={{ color: '#888', fontSize: 13, marginTop: 4 }}>Share your unique link and earn credit when friends book.</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14, alignItems: 'center' }}>
            <input className="msd-input" value="glow.clinic/ref/sophia-c" readOnly style={{ flex: 1, fontSize: 12.5 }} />
            <button className="msd-btn msd-btn-primary msd-btn-sm">Copy</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CheckInPage() {
  const [patients, setPatients] = useState(CHECKIN_PATIENTS)
  const statusOrder = ['Not Arrived', 'Checked In', 'With Provider', 'Complete']

  const advance = (id) => {
    setPatients(prev => prev.map(p => {
      if (p.id !== id) return p
      const idx = statusOrder.indexOf(p.status)
      if (idx < statusOrder.length - 1) return { ...p, status: statusOrder[idx + 1] }
      return p
    }))
  }

  return (
    <div className="msd-fade-in">
      <div className="msd-page-title">Check-In</div>
      <div className="msd-page-sub">Today's patients — click to advance status.</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div className="msd-card" style={{ padding: 0 }}>
          {patients.map((p, i) => (
            <div key={p.id} className="msd-check-card" onClick={() => advance(p.id)} style={{ borderBottom: i < patients.length - 1 ? '1px solid #f0ede8' : 'none' }}>
              <Avatar initials={p.name.split(' ').map(n => n[0]).join('')} size={42} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                <div style={{ color: '#888', fontSize: 12.5 }}>{p.service} · {p.time}</div>
              </div>
              <StatusBadge status={p.status} />
              {p.status !== 'Complete' && (
                <span style={{ color: '#ccc', fontSize: 11, marginLeft: 8 }}>click to advance →</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MembershipsPage() {
  return (
    <div className="msd-fade-in">
      <div className="msd-page-title">Memberships</div>
      <div className="msd-page-sub">Recurring membership tiers for your practice.</div>

      <div className="msd-grid-3">
        {MEMBERSHIP_TIERS.map(tier => (
          <div key={tier.name} className={`msd-card msd-tier-card ${tier.recommended ? 'recommended' : ''}`}>
            {tier.recommended && <div className="msd-tier-rec-badge">Recommended</div>}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: tier.color }} />
              <span style={{ fontWeight: 600, fontSize: 18 }}>{tier.name}</span>
            </div>
            <div className="msd-tier-price">${tier.price}<span>/mo</span></div>
            <ul className="msd-tier-features">
              {tier.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <div style={{ marginTop: 'auto', paddingTop: 16 }}>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>
                <strong style={{ color: '#1A1A1A' }}>{tier.members}</strong> active members
              </div>
              <button className={`msd-btn ${tier.recommended ? 'msd-btn-primary' : 'msd-btn-outline'}`} style={{ width: '100%', justifyContent: 'center' }}>
                View Members
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function MedSpaDemo() {
  const [page, setPage] = useState('dashboard')

  const pages = {
    dashboard: DashboardPage,
    schedule: SchedulePage,
    patients: PatientsPage,
    inbox: InboxPage,
    charts: ChartsPage,
    plans: PlansPage,
    booking: BookingPage,
    portal: PortalPage,
    checkin: CheckInPage,
    memberships: MembershipsPage,
  }

  const ActivePage = pages[page] || DashboardPage

  return (
    <>
      <style>{STYLES}</style>
      <div className="msd-wrap">
        {/* Sidebar */}
        <div className="msd-sidebar">
          <div className="msd-logo">
            glow<span>.clinic</span>
          </div>
          <div className="msd-nav">
            {NAV_ITEMS.map(item => (
              <div
                key={item.key}
                className={`msd-nav-item ${page === item.key ? 'active' : ''}`}
                onClick={() => setPage(item.key)}
              >
                <NavIcon d={item.icon} />
                {item.label}
              </div>
            ))}
          </div>
          <div className="msd-sidebar-footer">
            <div className="msd-avatar-sm">SK</div>
            <div>
              <div className="name">Dr. Sarah Kim</div>
              <div className="role">Owner · Admin</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="msd-content">
          <ActivePage key={page} />
        </div>
      </div>
    </>
  )
}
