import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { scheduleGA } from './utils/analytics'
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
import TermsModal from './components/layout/TermsModal'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTab, setModalTab] = useState('terms')

  useEffect(() => {
    scheduleGA()
  }, [])

  useEffect(() => {
    const handleOpenModal = (e) => {
      setModalTab(e.detail?.tab || 'terms')
      setModalOpen(true)
    }
    window.addEventListener('open-terms-modal', handleOpenModal)
    return () => window.removeEventListener('open-terms-modal', handleOpenModal)
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
        <>
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
          <Footer />
          <WhatsAppWidget />
          <ShareWidget />
          <ScrollToTop />
          <TermsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} initialTab={modalTab} />
        </>
      </LanguageProvider>
    </ThemeProvider>
  )
}
