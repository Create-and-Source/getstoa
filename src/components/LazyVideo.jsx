import { useEffect, useRef, useState } from 'react'

export default function LazyVideo({ src, style = {}, ...props }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [srcActive, setSrcActive] = useState(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSrcActive(src); obs.disconnect() } },
      { rootMargin: '200px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [src])

  return (
    <video
      ref={ref}
      style={{ ...style, opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}
      src={srcActive}
      onLoadedData={() => setLoaded(true)}
      {...props}
    />
  )
}
