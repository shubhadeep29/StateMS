import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  const handleOrderClick = (e) => {
    e.preventDefault()
    const targetElement = document.querySelector('#order')
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
    <section id="home" className="hero bg-medical-pattern">
      {/* Floating background decorations */}
      <div className="bg-floating-icon icon-1"><i className="fa-solid fa-plus"></i></div>
      <div className="bg-floating-icon icon-2"><i className="fa-solid fa-prescription-bottle-medical"></i></div>
      <div className="bg-floating-icon icon-3"><i className="fa-solid fa-heart-pulse"></i></div>

      {/* Bottom Wave Divider */}
      <svg className="section-divider divider-bottom divider-teal-light" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,0 C320,40 420,40 720,20 C1020,0 1120,0 1440,30 L1440,74 L0,74 Z" fill="currentColor"></path>
      </svg>

      <div className="container hero-container">
        <div className="hero-text">
          <div className="hero-badge">
            <i className="fa-solid fa-shield-halved"></i> {t('hero.badge')}
          </div>
          <h1>{t('hero.title1')} <br />{t('hero.title2')}</h1>
          <p className="hero-desc">
            {t('hero.desc')}
          </p>
          
          <div className="quick-info-pills">
            <span className="info-pill"><i className="fa-solid fa-location-dot"></i> {t('hero.pillAddress')}</span>
            <span className="info-pill"><i className="fa-regular fa-clock"></i> {t('hero.pillTime')}</span>
            <span className="info-pill"><i className="fa-solid fa-truck-fast"></i> {t('hero.pillDelivery')}</span>
          </div>

          <div className="hero-buttons">
            <a href="#order" className="btn btn-primary btn-large" onClick={handleOrderClick}>
              <i className="fa-solid fa-file-prescription"></i> {t('hero.btnOrder')}
            </a>
            <a href="tel:+917501482099" className="btn btn-secondary btn-large">
              <i className="fa-solid fa-phone"></i> {t('hero.btnCall')}
            </a>
            <a href="https://wa.me/917501482099" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-large">
              <i className="fa-brands fa-whatsapp"></i> {t('hero.btnWhatsapp')}
            </a>
          </div>
          
          <div className="trust-indicators">
            <div className="trust-item"><i className="fa-solid fa-circle-check"></i> {t('hero.trustGenuine')}</div>
            <div className="trust-item"><i className="fa-solid fa-circle-check"></i> {t('hero.trustPharmacist')}</div>
            <div className="trust-item"><i className="fa-solid fa-circle-check"></i> {t('hero.trustPayments')}</div>
            <div className="trust-item"><i className="fa-solid fa-circle-check"></i> {t('hero.trustDoctors')}</div>
          </div>
        </div>
        
        <div className="hero-image-wrapper">
          <div className="hero-image-glow"></div>
          <img 
            src={`${import.meta.env.BASE_URL}assets/pharmacy_hero.png`} 
            alt="State Medicine Shop Interior Storefront" 
            className="hero-image" 
            id="heroImage" 
          />
        </div>
      </div>
    </section>
  )
}
