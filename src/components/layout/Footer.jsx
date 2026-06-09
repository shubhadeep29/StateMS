import { useLanguage } from '../../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const handleLinkClick = (e, id) => {
    e.preventDefault()
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
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <a href="#" className="logo footer-logo" onClick={(e) => handleLinkClick(e, '#home')}>
            <img 
              src={`${import.meta.env.BASE_URL}assets/pharmacy_logo.png`} 
              alt="M/S State Medicine Shop Logo" 
              style={{ width: '40px', height: '40px', objectFit: 'contain', marginRight: '0.45rem' }}
            />
            <div className="logo-text">
              <span className="logo-title">STATE</span>
              <span className="logo-subtitle" style={{ color: 'var(--primary-light)' }}>MEDICINE SHOP</span>
            </div>
          </a>
          <p className="footer-desc">
            {t('footer.desc')}
          </p>
          <div className="social-links">
            <a href="https://www.facebook.com/SMEDICINESHOP22?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook Page">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://wa.me/917501482099" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="WhatsApp Instant Chat" style={{ background: '#25D366', color: 'white' }}>
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>{t('footer.contact')}</h4>
          <ul className="contact-list">
            <li>
              <i className="fa-solid fa-location-dot"></i>
              <span>{t('contact.addressVal')}</span>
            </li>
            <li>
              <i className="fa-solid fa-phone"></i>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <a href="tel:+918145555232">+91 81455 55232</a>
                <a href="tel:+917501482099">+91 75014 82099</a>
              </div>
            </li>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <span>statemedicineshop@gmail.com</span>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t('footer.links')}</h4>
          <ul className="footer-links">
            <li><a href="#home" onClick={(e) => handleLinkClick(e, '#home')}>{t('nav.home')}</a></li>
            <li><a href="#about" onClick={(e) => handleLinkClick(e, '#about')}>{t('nav.about')}</a></li>
            <li><a href="#services" onClick={(e) => handleLinkClick(e, '#services')}>{t('nav.services')}</a></li>
            <li><a href="#order" onClick={(e) => handleLinkClick(e, '#order')}>{t('nav.order')}</a></li>
            <li><a href="#doctors" onClick={(e) => handleLinkClick(e, '#doctors')}>{t('nav.doctors')}</a></li>
            <li><a href="#faq" onClick={(e) => handleLinkClick(e, '#faq')}>{t('nav.faq')}</a></li>
            <li><a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')}>{t('nav.contact')}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <p>{t('footer.copyright')}</p>
          <p style={{ fontSize: '0.84rem', color: '#6b8296' }}>
            {t('language') === 'bn' ? (
              <>
                🤖 সহযোগে তৈরি করেছেন <strong><a href="https://shubhadeep29.github.io/Portfolio/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} className="footer-portfolio-link">শুভদীপ চৌধুরী</a></strong>
              </>
            ) : (
              <>
                Developed with 🤖 by <strong><a href="https://shubhadeep29.github.io/Portfolio/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} className="footer-portfolio-link">Shubhadeep Chowdhury</a></strong>
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}
