import { useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import ResponsiveImage from '../components/ResponsiveImage'
import Icon from '../components/Icon'
import useReveal from '../hooks/useReveal'
import CountUp from '../components/CountUp'

export default function About() {
  const sectionRef = useRef(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const { t } = useLanguage()

  const galleryImages = [
    {
      src: 'shop_counter',
      alt: 'Medicine Dispensation Counter',
      label: t('about.gallery.counter'),
      badge: t('about.badges.counter')
    },
    {
      src: 'shop_shelves',
      alt: 'Authentic Medicine Inventory Shelves',
      label: t('about.gallery.inventory'),
      badge: t('about.badges.inventory')
    },
    {
      src: 'waiting_area',
      alt: 'OPD Clinic Patient Waiting Lounge',
      label: t('about.gallery.waiting'),
      badge: t('about.badges.waiting')
    },
    {
      src: 'consultation_room',
      alt: 'Doctor Consultation Chamber',
      label: t('about.gallery.chamber'),
      badge: t('about.badges.chamber')
    },
    {
      src: 'pharmacy_hero',
      alt: 'M/S State Medicine Shop Storefront',
      label: t('about.gallery.storeFront'),
      badge: t('about.badges.storeFront')
    }
  ]

  useReveal(sectionRef)

  return (
    <section id="about" ref={sectionRef} className="about bg-teal-light">
      {/* Blurred background orb */}
      <div className="bg-blur-orb orb-1"></div>

      {/* Bottom Wave Divider */}
      <svg className="section-divider divider-bottom divider-white" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,40 C320,70 640,70 960,40 C1280,10 1360,10 1440,30 L1440,74 L0,74 Z" fill="currentColor"></path>
      </svg>

      <div className="container about-container">
        <div className="about-image-wrapper reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <ResponsiveImage
              key={galleryImages[activeImageIndex].src}
              name={galleryImages[activeImageIndex].src}
              widths={[640, 1024]}
              sizes="(max-width: 992px) 100vw, 560px"
              width={1024}
              height={416}
              alt={galleryImages[activeImageIndex].alt}
              className="about-image parallax-soft"
            />
            <div className="floating-card">
              <div className="expert-icon"><Icon name="camera" /></div>
              <div className="expert-text">{galleryImages[activeImageIndex].badge}</div>
            </div>
          </div>
          
          <div className="about-gallery-controls">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                className={`gallery-dot-btn ${activeImageIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveImageIndex(idx)}
                title={img.label}
                aria-label={`View ${img.label}`}
              >
                {img.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="about-text">
          <h2 className="reveal">{t('about.eyebrow')} <span className="highlight">{t('about.title2')}</span></h2>
          <p className="lead-text reveal">
            {t('about.lead')}
          </p>
          <p className="reveal">
            {t('about.p1')}
          </p>
          <p className="reveal">
            {t('about.p2')}
          </p>
          
          <div className="stats-grid">
            <div className="stat-box glass-card reveal">
              <Icon name="business-time" />
              <h3><CountUp text={t('about.stats.years')} /></h3>
              <p>{t('about.stats.yearsSub')}</p>
            </div>
            <div className="stat-box glass-card reveal">
              <Icon name="heart-pulse" />
              <h3><CountUp text={t('about.stats.authentic')} /></h3>
              <p>{t('about.stats.authenticSub')}</p>
            </div>
            <div className="stat-box glass-card reveal">
              <Icon name="users" />
              <h3><CountUp text={t('about.stats.patients')} /></h3>
              <p>{t('about.stats.patientsSub')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
