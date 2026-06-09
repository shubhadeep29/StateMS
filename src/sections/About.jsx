import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '../context/LanguageContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const { t } = useLanguage()

  const galleryImages = [
    {
      src: 'pharmacy_hero.png',
      alt: 'M/S State Medicine Shop Storefront',
      label: t('about.gallery.storeFront'),
      badge: t('about.badges.storeFront')
    },
    {
      src: 'shop_counter.png',
      alt: 'Medicine Dispensation Counter',
      label: t('about.gallery.counter'),
      badge: t('about.badges.counter')
    },
    {
      src: 'shop_shelves.png',
      alt: 'Authentic Medicine Inventory Shelves',
      label: t('about.gallery.inventory'),
      badge: t('about.badges.inventory')
    },
    {
      src: 'waiting_area.png',
      alt: 'OPD Clinic Patient Waiting Lounge',
      label: t('about.gallery.waiting'),
      badge: t('about.badges.waiting')
    },
    {
      src: 'consultation_room.png',
      alt: 'Doctor Consultation Chamber',
      label: t('about.gallery.chamber'),
      badge: t('about.badges.chamber')
    }
  ]

  useGSAP(() => {
    gsap.from('.gsap-reveal', {
      opacity: 0,
      y: 28,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%',
      },
    })
  }, { scope: sectionRef })

  return (
    <section id="about" ref={sectionRef} className="about bg-teal-light bg-grid-pattern">
      {/* Blurred background orb */}
      <div className="bg-blur-orb orb-1"></div>

      {/* Bottom Wave Divider */}
      <svg className="section-divider divider-bottom divider-white" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,40 C320,70 640,70 960,40 C1280,10 1360,10 1440,30 L1440,74 L0,74 Z" fill="currentColor"></path>
      </svg>

      <div className="container about-container">
        <div className="about-image-wrapper gsap-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <img 
              src={`${import.meta.env.BASE_URL}assets/${galleryImages[activeImageIndex].src}`} 
              alt={galleryImages[activeImageIndex].alt} 
              className="about-image" 
            />
            <div className="floating-card">
              <div className="expert-icon"><i className="fa-solid fa-camera"></i></div>
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
          <h2 className="gsap-reveal">{t('about.eyebrow')} <span className="highlight">{t('about.title2')}</span></h2>
          <p className="lead-text gsap-reveal">
            {t('about.lead')}
          </p>
          <p className="gsap-reveal">
            {t('about.p1')}
          </p>
          <p className="gsap-reveal">
            {t('about.p2')}
          </p>
          
          <div className="stats-grid">
            <div className="stat-box glass-card gsap-reveal">
              <i className="fa-solid fa-business-time"></i>
              <h4>{t('about.stats.years')}</h4>
              <p>{t('about.stats.yearsSub')}</p>
            </div>
            <div className="stat-box glass-card gsap-reveal">
              <i className="fa-solid fa-heart-pulse"></i>
              <h4>{t('about.stats.authentic')}</h4>
              <p>{t('about.stats.authenticSub')}</p>
            </div>
            <div className="stat-box glass-card gsap-reveal">
              <i className="fa-solid fa-users"></i>
              <h4>{t('about.stats.patients')}</h4>
              <p>{t('about.stats.patientsSub')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
