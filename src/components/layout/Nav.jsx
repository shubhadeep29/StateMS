import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import ResponsiveImage from '../ResponsiveImage'
import Icon from '../Icon'

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

  const closeMenu = useCallback(() => {
    setIsMobileOpen(false)
    document.body.style.overflow = ''
  }, [])

  const toggleMobileMenu = () => {
    if (isMobileOpen) {
      closeMenu()
    } else {
      setIsMobileOpen(true)
      document.body.style.overflow = 'hidden'
    }
  }

  // Close the drawer on Escape and when the viewport grows past the mobile breakpoint
  useEffect(() => {
    if (!isMobileOpen) return
    const onKey = (e) => { if (e.key === 'Escape') closeMenu() }
    const mq = window.matchMedia('(min-width: 769px)')
    const onMq = (e) => { if (e.matches) closeMenu() }
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [isMobileOpen, closeMenu])

  const handleLinkClick = (e, id) => {
    e.preventDefault()
    closeMenu()

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

  const sections = ['home', 'about', 'services', 'order', 'doctors', 'faq', 'contact']
  const renderLinks = () =>
    sections.map((id) => (
      <a
        key={id}
        href={`#${id}`}
        className={activeSection === id ? 'active' : ''}
        aria-current={activeSection === id ? 'true' : undefined}
        onClick={(e) => handleLinkClick(e, `#${id}`)}
      >
        {t(`nav.${id}`)}
      </a>
    ))

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
        className={`header ${isShrunk ? 'shrunk' : ''}`}
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
            <ResponsiveImage
              name="logo-mark"
              widths={[64, 128]}
              sizes="48px"
              width={128}
              height={128}
              priority
              alt="M/S State Medicine Shop Logo"
              className="logo-img"
            />
            <div className="logo-text">
              <span className="logo-title">M/S STATE</span>
              <span className="logo-subtitle">MEDICINE SHOP</span>
            </div>
          </a>

          <nav className="nav" id="mainNavigation" aria-label="Main Navigation">
            {renderLinks()}
          </nav>

          <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="lang-switcher">
              <button
                onClick={() => setLanguage('bn')}
                className={`lang-btn ${language === 'bn' ? 'active' : ''}`}
                aria-pressed={language === 'bn'}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                aria-pressed={language === 'en'}
                lang="en"
              >
                EN
              </button>
            </div>

            <a href="tel:+917501482099" className="btn btn-primary btn-sm cta-btn" aria-label={t('nav.call')}>
              <Icon name="phone" /> <span className="cta-label">{t('nav.call')}</span>
            </a>
          </div>

          <button
            className="mobile-menu-btn"
            id="mobileMenuBtn"
            aria-label="Open menu"
            aria-expanded={isMobileOpen}
            aria-controls="mobileDrawer"
            onClick={toggleMobileMenu}
          >
            <Icon name="bars" />
          </button>
        </div>
      </header>

      <div
        className={`drawer-overlay ${isMobileOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <nav
        className={`mobile-drawer ${isMobileOpen ? 'open' : ''}`}
        id="mobileDrawer"
        aria-label="Mobile Navigation"
        aria-hidden={!isMobileOpen}
        inert={!isMobileOpen}
      >
        <button className="drawer-close" aria-label="Close menu" onClick={closeMenu}>
          <Icon name="xmark" />
        </button>
        <div className="drawer-links">{renderLinks()}</div>
        <div className="drawer-lang">
          <button
            onClick={() => { setLanguage('bn'); closeMenu() }}
            className={`drawer-lang-btn ${language === 'bn' ? 'active' : ''}`}
            aria-pressed={language === 'bn'}
          >
            বাংলা
          </button>
          <button
            onClick={() => { setLanguage('en'); closeMenu() }}
            className={`drawer-lang-btn ${language === 'en' ? 'active' : ''}`}
            aria-pressed={language === 'en'}
            lang="en"
          >
            English
          </button>
        </div>
      </nav>
    </>
  )
}
