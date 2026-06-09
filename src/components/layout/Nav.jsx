import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'

export default function Nav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isShrunk, setIsShrunk] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      // Shrink header on scroll
      if (window.scrollY > 50) {
        setIsShrunk(true)
      } else {
        setIsShrunk(false)
      }

      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        const scrolled = (window.scrollY / totalScroll) * 100
        setScrollProgress(scrolled)
      } else {
        setScrollProgress(0)
      }

      // Check bottom scroll limit first (Contact section)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection('contact')
        return
      }

      // Find which section is currently active
      const sectionIds = ['home', 'about', 'services', 'order', 'doctors', 'faq', 'contact']
      const scrollPosition = window.scrollY + 100 // Header offset buffer

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Run initial check
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen)
    if (!isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  const handleLinkClick = (e, id) => {
    e.preventDefault()
    setIsMobileOpen(false)
    document.body.style.overflow = ''

    const targetElement = document.querySelector(id)
    if (targetElement) {
      const headerOffset = 64
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      // Update active section state immediately on click
      setActiveSection(id.replace('#', ''))

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <div 
        className="scroll-progress-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          backgroundColor: 'var(--accent)',
          zIndex: 1005,
          transform: `scaleX(${scrollProgress / 100})`,
          transformOrigin: 'left',
          willChange: 'transform',
          transition: 'transform 0.1s cubic-bezier(0.1, 0.8, 0.3, 1)'
        }}
      />
      <header 
        className="header" 
        style={{
          backgroundColor: isShrunk ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.75)',
          boxShadow: isShrunk ? 'var(--shadow-sm)' : 'none',
          borderBottom: '1px solid var(--border-color)',
          transition: 'all 0.3s ease'
        }}
      >
        <div 
          className="container header-content" 
          style={{
            height: isShrunk ? '64px' : '84px',
            transition: 'height 0.3s ease'
          }}
        >
          <a href="#" className="logo" id="logoLink" onClick={(e) => handleLinkClick(e, '#home')}>
            <img 
              src={`${import.meta.env.BASE_URL}assets/pharmacy_logo.png`} 
              alt="M/S State Medicine Shop Logo" 
              style={{ width: '44px', height: '44px', objectFit: 'contain', marginRight: '0.25rem' }}
            />
            <div className="logo-text">
              <span className="logo-title">M/S STATE</span>
              <span className="logo-subtitle">MEDICINE SHOP</span>
            </div>
          </a>

          <nav className={`nav ${isMobileOpen ? 'active' : ''}`} id="mainNavigation" aria-label="Main Navigation">
            <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={(e) => handleLinkClick(e, '#home')}>{t('nav.home')}</a>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => handleLinkClick(e, '#about')}>{t('nav.about')}</a>
            <a href="#services" className={activeSection === 'services' ? 'active' : ''} onClick={(e) => handleLinkClick(e, '#services')}>{t('nav.services')}</a>
            <a href="#order" className={activeSection === 'order' ? 'active' : ''} onClick={(e) => handleLinkClick(e, '#order')}>{t('nav.order')}</a>
            <a href="#doctors" className={activeSection === 'doctors' ? 'active' : ''} onClick={(e) => handleLinkClick(e, '#doctors')}>{t('nav.doctors')}</a>
            <a href="#faq" className={activeSection === 'faq' ? 'active' : ''} onClick={(e) => handleLinkClick(e, '#faq')}>{t('nav.faq')}</a>
            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={(e) => handleLinkClick(e, '#contact')}>{t('nav.contact')}</a>
            
            {/* Mobile Language Toggle */}
            <div className="mobile-lang-switcher">
              <button 
                onClick={() => { setLanguage('bn'); setIsMobileOpen(false); document.body.style.overflow = ''; }}
                className={`lang-btn ${language === 'bn' ? 'active' : ''}`}
              >
                বাংলা
              </button>
              <button 
                onClick={() => { setLanguage('en'); setIsMobileOpen(false); document.body.style.overflow = ''; }}
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              >
                EN
              </button>
            </div>
          </nav>

          <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Desktop Language Toggle */}
            <div className="lang-switcher">
              <button 
                onClick={() => setLanguage('bn')}
                className={`lang-btn ${language === 'bn' ? 'active' : ''}`}
              >
                বাংলা
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              >
                EN
              </button>
            </div>

            <a href="tel:+917501482099" className="btn btn-primary btn-sm cta-btn">
              <i className="fa-solid fa-phone"></i> {t('nav.call')}
            </a>
          </div>

          <button 
            className="mobile-menu-btn" 
            id="mobileMenuBtn" 
            aria-label="Toggle menu" 
            aria-expanded={isMobileOpen}
            onClick={toggleMobileMenu}
          >
            <i className={`fa-solid ${isMobileOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </header>
    </>
  )
}
