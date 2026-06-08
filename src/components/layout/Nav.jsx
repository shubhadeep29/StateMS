import { useState, useEffect } from 'react'

export default function Nav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isShrunk, setIsShrunk] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsShrunk(true)
      } else {
        setIsShrunk(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
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

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
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
          <i className="fa-solid fa-prescription-bottle-medical logo-icon"></i>
          <div className="logo-text">
            <span className="logo-title">M/S STATE</span>
            <span className="logo-subtitle">MEDICINE SHOP</span>
          </div>
        </a>

        <nav className={`nav ${isMobileOpen ? 'active' : ''}`} id="mainNavigation" aria-label="Main Navigation">
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')}>Home</a>
          <a href="#about" onClick={(e) => handleLinkClick(e, '#about')}>About</a>
          <a href="#services" onClick={(e) => handleLinkClick(e, '#services')}>Services</a>
          <a href="#order" onClick={(e) => handleLinkClick(e, '#order')}>Order Online</a>
          <a href="#doctors" onClick={(e) => handleLinkClick(e, '#doctors')}>Doctor Schedule</a>
          <a href="#faq" onClick={(e) => handleLinkClick(e, '#faq')}>FAQ</a>
          <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')}>Contact</a>
        </nav>

        <div className="header-actions">
          <a href="tel:+917501482099" className="btn btn-primary btn-sm cta-btn">
            <i className="fa-solid fa-phone"></i> Call Pharmacy
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
  )
}
