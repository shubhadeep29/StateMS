import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '../context/LanguageContext'
import { trackEvent } from '../utils/analytics'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
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
        start: 'top 95%',
      },
    })
  }, { scope: sectionRef })

  return (
    <section id="contact" ref={sectionRef} className="bg-grid-pattern">
      {/* Blurred background orb */}
      <div className="bg-blur-orb orb-2" style={{ top: '10%', right: '15%' }}></div>

      {/* Floating background decorations */}
      <div className="bg-floating-icon icon-4" style={{ top: '15%', left: '42%', opacity: 0.03 }}><i className="fa-solid fa-map-location-dot"></i></div>
      <div className="bg-floating-icon icon-2" style={{ bottom: '15%', left: '8%', opacity: 0.03 }}><i className="fa-solid fa-envelope-open-text"></i></div>

      <div className="container">
        <div className="section-header gsap-reveal">
          <div className="section-eyebrow"><i className="fa-solid fa-map-location-dot"></i> {t('contact.eyebrow')}</div>
          <h2>{t('contact.title1')} <span className="highlight">{t('contact.title2')}</span></h2>
          <p>{t('contact.subtitle')}</p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-info-cards">
            <div className="contact-card glass-card gsap-reveal">
              <div className="card-icon"><i className="fa-solid fa-location-dot"></i></div>
              <div>
                <h3>{t('contact.addressTitle')}</h3>
                <p style={{ whiteSpace: 'pre-line' }}>
                  {t('contact.addressVal')}
                </p>
                <a 
                  href="https://maps.google.com/?q=State+Medicine+Shop+Kaliyaganj" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="maps-link"
                  onClick={() => trackEvent('maps_click', { event_category: 'Contact', event_label: 'Contact Section' })}
                >
                  <i className="fa-solid fa-map-location-dot"></i> {t('contact.mapsBtn')}
                </a>
              </div>
            </div>
            
            <div className="contact-card glass-card gsap-reveal">
              <div className="card-icon"><i className="fa-solid fa-phone"></i></div>
              <div>
                <h3>{t('contact.phoneTitle')}</h3>
                <p>{t('contact.phoneDesc')}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.5rem' }}>
                  <a 
                    href="tel:+918145555232" 
                    style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '1.1rem' }}
                    onClick={() => trackEvent('phone_click', { event_category: 'Contact', event_label: 'Contact Section', phone_number: '+918145555232' })}
                  >
                    +91 81455 55232
                  </a>
                  <a 
                    href="tel:+917501482099" 
                    style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '1.1rem' }}
                    onClick={() => trackEvent('phone_click', { event_category: 'Contact', event_label: 'Contact Section', phone_number: '+917501482099' })}
                  >
                    +91 75014 82099
                  </a>
                </div>

              </div>
            </div>
            
            <div className="contact-card glass-card gsap-reveal">
              <div className="card-icon"><i className="fa-solid fa-business-time"></i></div>
              <div>
                <h3>{t('contact.hoursTitle')}</h3>
                <p><strong>{t('contact.hoursSubtitle')}</strong></p>
                <p>{t('contact.hoursCounter')}</p>
                <p>{t('contact.hoursClinic')}</p>
              </div>
            </div>
          </div>
          
          <div className="map-container gsap-reveal" style={{ overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3596.173062334005!2d88.32875537538234!3d25.64008847743141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDM4JzI0LjMiTiA4OMKwMTknNTIuOCJF!5e0!3m2!1sen!2sin!4v1717758364713!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="State Medicine Shop Google Maps Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
