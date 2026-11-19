import { useEffect, useRef, useState } from 'react'

const BN_DIGITS = '০১২৩৪৫৬৭৮৯'

// Splits "১০,০০০+ রোগী" / "10k+" into { prefix, value, suffix, bengali, grouped }.
function parse(text) {
  const match = text.match(/[0-9০-৯][0-9০-৯,]*/)
  if (!match) return null
  const raw = match[0]
  const bengali = /[০-৯]/.test(raw)
  const latin = raw.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d))).replace(/,/g, '')
  return {
    prefix: text.slice(0, match.index),
    suffix: text.slice(match.index + raw.length),
    value: Number(latin),
    bengali,
    grouped: raw.includes(','),
  }
}

function format(n, { bengali, grouped }) {
  let s = grouped ? n.toLocaleString('en-IN') : String(n)
  if (bengali) s = s.replace(/[0-9]/g, (d) => BN_DIGITS[d])
  return s
}

// Counts the first number in `text` up from 0 when it scrolls into view, keeping
// the original digit system (Bengali/Latin), thousands separator, prefix and suffix.
export default function CountUp({ text, duration = 1400 }) {
  const ref = useRef(null)
  const parsed = parse(text)
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    const el = ref.current
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!el || !parsed || reduced || !('IntersectionObserver' in window)) return
    let raf
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setCurrent(Math.round(parsed.value * eased))
        if (p < 1) raf = requestAnimationFrame(tick)
        else setCurrent(null)
      }
      setCurrent(0)
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
    // Restart when the text (language) changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  const shown = parsed && current !== null
    ? `${parsed.prefix}${format(current, parsed)}${parsed.suffix}`
    : text

  return (
    <span ref={ref} className="count-up">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  )
}
