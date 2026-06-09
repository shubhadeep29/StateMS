import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import WhatsAppWidget from './components/layout/WhatsAppWidget'
import ShareWidget from './components/layout/ShareWidget'
import ScrollToTop from './components/layout/ScrollToTop'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import PrescriptionOrder from './sections/PrescriptionOrder'
import Doctors from './sections/Doctors'
import FAQ from './sections/FAQ'
import Contact from './sections/Contact'

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger once DOM layout has settled and images might have loaded
    const refreshTriggers = () => {
      ScrollTrigger.refresh()
    }
    
    window.addEventListener('load', refreshTriggers)

    // Run refreshes at intervals to handle delayed layout shifts
    const t1 = setTimeout(refreshTriggers, 200)
    const t2 = setTimeout(refreshTriggers, 800)
    const t3 = setTimeout(refreshTriggers, 2000)

    return () => {
      window.removeEventListener('load', refreshTriggers)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  useEffect(() => {
    let frameId
    const handleMouseMove = (e) => {
      frameId = requestAnimationFrame(() => {
        const icons = document.querySelectorAll('.bg-floating-icon')
        const x = (window.innerWidth / 2 - e.clientX) / 25
        const y = (window.innerHeight / 2 - e.clientY) / 25
        icons.forEach((icon, index) => {
          const factor = (index % 3 + 1) * 0.45
          icon.style.setProperty('--mx', `${x * factor}px`)
          icon.style.setProperty('--my', `${y * factor}px`)
        })
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <ThemeProvider>
      <LanguageProvider>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Nav />
          <main>
            <Hero />
            <About />
            <Services />
            <PrescriptionOrder />
            <Doctors />
            <FAQ />
            <Contact />
          </main>
          <motion.div>
            <Footer />
          </motion.div>
          <WhatsAppWidget />
          <ShareWidget />
          <ScrollToTop />
        </motion.div>
      </LanguageProvider>
    </ThemeProvider>
  )
}
