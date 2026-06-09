import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import WhatsAppWidget from './components/layout/WhatsAppWidget'
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
        </motion.div>
      </LanguageProvider>
    </ThemeProvider>
  )
}
