import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import ResponsiveImage from '../components/ResponsiveImage'
import Icon from '../components/Icon'

export default function Hero() {
  const { t } = useLanguage()

  const heroImages = [
    { name: 'pharmacy_hero', widths: [640, 1024], width: 1024, height: 416, fit: 'cover' },
    { name: 'dr_kabir_banner', widths: [800, 1600], width: 1600, height: 959, fit: 'contain' },
  ]
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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
    <section id="home" className="hero">
      <div className="hero-mesh" aria-hidden="true">
        <span className="mesh-blob mesh-a" />
        <span className="mesh-blob mesh-b" />
        <span className="mesh-blob mesh-c" />
      </div>

      {/* Bottom Wave Divider */}
      <svg className="section-divider divider-bottom divider-teal-light" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,0 C320,40 420,40 720,20 C1020,0 1120,0 1440,30 L1440,74 L0,74 Z" fill="currentColor"></path>
      </svg>

      <div className="container hero-container">
        <div className="hero-text">
          <div className="hero-badge">
            <Icon name="shield-halved" /> {t('hero.badge')}
          </div>
          <h1 className="hero-title">
            <span className="hero-line">{t('hero.title1')}</span>{' '}
            <span className="hero-line">{t('hero.title2')}</span>
          </h1>
          <p className="hero-desc">
            {t('hero.desc')}
          </p>

          <div className="quick-info-pills">
            <span className="info-pill"><Icon name="location-dot" /> {t('hero.pillAddress')}</span>
            <span className="info-pill"><Icon name="clock-regular" /> {t('hero.pillTime')}</span>
            <span className="info-pill"><Icon name="truck-fast" /> {t('hero.pillDelivery')}</span>
          </div>

          <div className="hero-buttons">
            <a href="#order" className="btn btn-primary btn-large" onClick={handleOrderClick}>
              <Icon name="file-prescription" /> {t('hero.btnOrder')}
            </a>
            <a href="tel:+917501482099" className="btn btn-secondary btn-large">
              <Icon name="phone" /> {t('hero.btnCall')}
            </a>
            <a href="https://wa.me/917501482099" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-large">
              <Icon name="whatsapp" /> {t('hero.btnWhatsapp')}
            </a>
          </div>

          <div className="trust-indicators">
            <div className="trust-item"><Icon name="circle-check" /> {t('hero.trustGenuine')}</div>
            <div className="trust-item"><Icon name="circle-check" /> {t('hero.trustPharmacist')}</div>
            <div className="trust-item"><Icon name="circle-check" /> {t('hero.trustPayments')}</div>
            <div className="trust-item"><Icon name="circle-check" /> {t('hero.trustDoctors')}</div>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-glow"></div>
          <div className="hero-slider" style={{ display: 'grid', alignItems: 'center', justifyItems: 'center' }}>
            {heroImages.map((img, idx) => (
              <ResponsiveImage
                key={img.name}
                name={img.name}
                widths={img.widths}
                sizes="(max-width: 992px) 100vw, 560px"
                width={img.width}
                height={img.height}
                priority={idx === 0}
                alt="State Medicine Shop"
                className="hero-image"
                id={idx === 0 ? 'heroImage' : undefined}
                style={{
                  gridArea: '1 / 1',
                  opacity: idx === currentImgIndex ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out',
                  width: '100%',
                  height: img.fit === 'cover' ? '100%' : 'auto',
                  objectFit: img.fit,
                  backgroundColor: 'transparent'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
