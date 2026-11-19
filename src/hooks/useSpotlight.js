import { useEffect } from 'react'

// Feeds the pointer position into --sx/--sy on the hovered `.glass-card`, which
// CSS turns into a soft spotlight. Mouse/trackpad only; skipped for reduced motion.
export default function useSpotlight() {
  useEffect(() => {
    const fine = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    let frame
    const onMove = (e) => {
      const card = e.target.closest?.('.glass-card')
      if (!card) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect()
        card.style.setProperty('--sx', `${e.clientX - r.left}px`)
        card.style.setProperty('--sy', `${e.clientY - r.top}px`)
      })
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])
}
