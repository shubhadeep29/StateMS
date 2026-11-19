import { useEffect } from 'react'

// Fades/slides `.reveal` descendants of `ref` into view once (adds `.is-visible`).
// Content is shown immediately when IntersectionObserver is unavailable or the user prefers reduced motion.
export default function useReveal(ref) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const items = [...root.querySelectorAll('.reveal')]
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (!('IntersectionObserver' in window) || reduced) {
      items.forEach((el) => el.classList.add('is-visible'))
      return
    }

    let batch = 0
    let batchTimer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          el.style.transitionDelay = `${Math.min(batch * 120, 600)}ms`
          batch += 1
          el.classList.add('is-visible')
          observer.unobserve(el)
        })
        clearTimeout(batchTimer)
        batchTimer = setTimeout(() => { batch = 0 }, 100)
      },
      { rootMargin: '0px 0px -10% 0px' }
    )
    items.forEach((el) => observer.observe(el))
    return () => {
      observer.disconnect()
      clearTimeout(batchTimer)
    }
  }, [ref])
}
