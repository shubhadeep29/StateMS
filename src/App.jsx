import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { scheduleGA } from './utils/analytics'
import useSpotlight from './hooks/useSpotlight'
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
  useSpotlight()

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
