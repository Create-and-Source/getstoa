import { useState, useCallback, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Builder from './pages/Builder'
import Preview from './pages/Preview'

/* ── Theme helper: apply brand color as CSS variable ── */
function applyBrand(color) {
  const r = document.documentElement
  r.style.setProperty('--brand', color)
  // Generate glow / hover / dim variants
  r.style.setProperty('--brand-glow', color + '40')
  r.style.setProperty('--brand-hover', color + 'cc')
}

export default function App() {
  const [config, setConfig] = useState(() => {
    const saved = sessionStorage.getItem('stoa_config')
    return saved ? JSON.parse(saved) : null
  })

  const startBuild = useCallback((cfg) => {
    setConfig(cfg)
    sessionStorage.setItem('stoa_config', JSON.stringify(cfg))
    applyBrand(cfg.color)
  }, [])

  const resetDemo = useCallback(() => {
    setConfig(null)
    sessionStorage.removeItem('stoa_config')
    sessionStorage.removeItem('stoa_selections')
    document.documentElement.style.removeProperty('--brand')
    document.documentElement.style.removeProperty('--brand-glow')
    document.documentElement.style.removeProperty('--brand-hover')
  }, [])

  // Re-apply brand color on mount if config exists
  useEffect(() => {
    if (config?.color) applyBrand(config.color)
  }, [config])

  return (
    <Routes>
      <Route path="/" element={
        config ? <Builder config={config} onReset={resetDemo} /> : <Landing onStart={startBuild} />
      } />
      <Route path="/preview" element={<Preview config={config} onReset={resetDemo} />} />
      <Route path="*" element={
        config ? <Builder config={config} onReset={resetDemo} /> : <Landing onStart={startBuild} />
      } />
    </Routes>
  )
}
