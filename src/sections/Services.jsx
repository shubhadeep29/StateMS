import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '../context/LanguageContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const sectionRef = useRef(null)
  const { t } = useLanguage()

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

  const renderServiceItem = (key) => {
    const text = t(key)
    const colonIndex = text.indexOf(':')
    if (colonIndex !== -1) {
      const boldPart = text.substring(0, colonIndex + 1)
      const normalPart = text.substring(colonIndex + 1)
      return (
        <li>
          <i className="fa-solid fa-circle-check"></i>
          <div><strong>{boldPart}</strong>{normalPart}</div>
        </li>
      )
    }
    return (
      <li>
        <i className="fa-solid fa-circle-check"></i>
        <div>{text}</div>
      </li>
    )
  }

  return (
    <section id="services" ref={sectionRef} className="services bg-grid-pattern">
      {/* Blurred background orb */}
      <div className="bg-blur-orb orb-2"></div>

      <div className="container">
        <div className="section-header gsap-reveal">
          <div className="section-eyebrow"><i className="fa-solid fa-heart-pulse"></i> {t('services.eyebrow')}</div>
          <h2>{t('services.title1')} <span className="highlight">{t('services.title2')}</span></h2>
          <p>{t('services.desc')}</p>
        </div>
        
        <div className="services-grid">
          {/* Card 1: Medicines & OTC */}
          <div className="service-card glass-card gsap-reveal">
            <div className="service-card-header">
              <div className="service-card-icon"><i className="fa-solid fa-pills"></i></div>
              <h3>{t('services.card1.title')}</h3>
            </div>
            <ul className="service-card-list">
              {renderServiceItem('services.card1.i1')}
              {renderServiceItem('services.card1.i2')}
              {renderServiceItem('services.card1.i3')}
              {renderServiceItem('services.card1.i4')}
            </ul>
          </div>

          {/* Card 2: Clinical Care */}
          <div className="service-card glass-card gsap-reveal">
            <div className="service-card-header">
              <div className="service-card-icon"><i className="fa-solid fa-stethoscope"></i></div>
              <h3>{t('services.card2.title')}</h3>
            </div>
            <ul className="service-card-list">
              {renderServiceItem('services.card2.i1')}
              {renderServiceItem('services.card2.i2')}
              {renderServiceItem('services.card2.i3')}
              {renderServiceItem('services.card2.i4')}
            </ul>
          </div>

          {/* Card 3: Support Services */}
          <div className="service-card glass-card gsap-reveal">
            <div className="service-card-header">
              <div className="service-card-icon"><i className="fa-solid fa-truck-fast"></i></div>
              <h3>{t('services.card3.title')}</h3>
            </div>
            <ul className="service-card-list">
              {renderServiceItem('services.card3.i1')}
              {renderServiceItem('services.card3.i2')}
              {renderServiceItem('services.card3.i3')}
              {renderServiceItem('services.card3.i4')}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
