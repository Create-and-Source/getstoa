import { useState, useCallback } from 'react'
import './App.css'
import Stars from './components/Stars'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import EditHighlight from './components/EditHighlight'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import EventsPage from './pages/EventsPage'
import DashboardPage from './pages/DashboardPage'
import DesignStudioPage from './pages/DesignStudioPage'
import EmailPage from './pages/EmailPage'
import MembershipPage from './pages/MembershipPage'

const PAGES = [
  { id: 'home', label: 'Home', icon: '◈', section: 'storefront' },
  { id: 'shop', label: 'Shop', icon: '⬡', section: 'storefront' },
  { id: 'events', label: 'Events', icon: '◎', section: 'storefront' },
  { id: 'membership', label: 'Membership', icon: '★', section: 'storefront' },
  { id: 'dashboard', label: 'Dashboard', icon: '▦', section: 'admin' },
  { id: 'design', label: 'AI Design Studio', icon: '◇', section: 'admin' },
  { id: 'emails', label: 'Email Campaigns', icon: '✉', section: 'admin' },
]

export default function App() {
  const [page, setPage] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [highlightEditable, setHighlightEditable] = useState(false)

  const currentPage = PAGES.find(p => p.id === page)
  const isAdmin = currentPage?.section === 'admin'

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage editMode={editMode} />
      case 'shop': return <ShopPage />
      case 'events': return <EventsPage />
      case 'membership': return <MembershipPage />
      case 'dashboard': return <DashboardPage />
      case 'design': return <DesignStudioPage />
      case 'emails': return <EmailPage />
      default: return <HomePage editMode={editMode} />
    }
  }

  return (
    <div style={styles.app}>
      {!isAdmin && <Stars />}
      <Sidebar
        pages={PAGES}
        active={page}
        onNavigate={(id) => { setPage(id); setSidebarOpen(false) }}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div style={styles.main}>
        <TopBar
          page={currentPage}
          onMenu={() => setSidebarOpen(true)}
          editMode={editMode}
          onEditToggle={() => setEditMode(!editMode)}
          isAdmin={isAdmin}
        />

        <div style={{ ...styles.content, background: isAdmin ? '#FAFAF8' : '#000' }}>
          {renderPage()}
        </div>

        {/* "What can I edit?" floating button */}
        <EditHighlight
          active={highlightEditable}
          onToggle={() => setHighlightEditable(!highlightEditable)}
          editMode={editMode}
        />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />}
    </div>
  )
}

const styles = {
  app: {
    display: 'flex',
    minHeight: '100dvh',
    background: '#000',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100dvh',
    minWidth: 0,
  },
  content: {
    flex: 1,
    overflowY: 'auto',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    zIndex: 40,
  },
}
