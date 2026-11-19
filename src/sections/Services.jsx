import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import Icon from '../components/Icon'
import useReveal from '../hooks/useReveal'

export default function Services() {
  const sectionRef = useRef(null)
  const { t } = useLanguage()

  useReveal(sectionRef)

  const renderServiceItem = (key) => {
    const text = t(key)
    const colonIndex = text.indexOf(':')
    if (colonIndex !== -1) {
      const boldPart = text.substring(0, colonIndex + 1)
      const normalPart = text.substring(colonIndex + 1)
      return (
        <li>
          <Icon name="circle-check" />
          <div><strong>{boldPart}</strong>{normalPart}</div>
        </li>
      )
    }
    return (
      <li>
        <Icon name="circle-check" />
        <div>{text}</div>
      </li>
    )
  }

  return (
    <section id="services" ref={sectionRef} className="services bg-grid-pattern">
      {/* Blurred background orb */}
      <div className="bg-blur-orb orb-2"></div>

      {/* Bottom Wave Divider */}
      <svg className="section-divider divider-bottom divider-teal-light" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,30 C480,70 960,10 1440,40 L1440,74 L0,74 Z" fill="currentColor"></path>
      </svg>

      <div className="container">
        <div className="section-header reveal">
          <div className="section-eyebrow"><Icon name="heart-pulse" /> {t('services.eyebrow')}</div>
          <h2>{t('services.title1')} <span className="highlight">{t('services.title2')}</span></h2>
          <p>{t('services.desc')}</p>
        </div>
        
        <div className="services-grid">
          {/* Card 1: Medicines & OTC */}
          <div className="service-card glass-card reveal">
            <div className="service-card-header">
              <div className="service-card-icon"><Icon name="pills" /></div>
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
          <div className="service-card glass-card reveal">
            <div className="service-card-header">
              <div className="service-card-icon"><Icon name="stethoscope" /></div>
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
          <div className="service-card glass-card reveal">
            <div className="service-card-header">
              <div className="service-card-icon"><Icon name="truck-fast" /></div>
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
