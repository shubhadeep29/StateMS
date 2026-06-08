import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)

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
    <section id="contact" ref={sectionRef}>
      <div className="container">
        <div className="section-header gsap-reveal">
          <div className="section-eyebrow"><i className="fa-solid fa-map-location-dot"></i> Find Us</div>
          <h2>Pharmacy <span className="highlight">Location & Contact</span></h2>
          <p>Visit us in person or reach out directly for instant pharmacy support. We are located near the commercial center of Kaliyaganj.</p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-info-cards">
            <div className="contact-card glass-card gsap-reveal">
              <div className="card-icon"><i className="fa-solid fa-location-dot"></i></div>
              <div>
                <h3>Store Address</h3>
                <p>NS Road (Kaliyaganj Talkies Building)<br />Kaliyaganj, Uttar Dinajpur<br />West Bengal 733129</p>
                <a href="https://maps.google.com/?q=State+Medicine+Shop+Kaliyaganj" target="_blank" rel="noopener noreferrer" className="maps-link">
                  <i className="fa-solid fa-map-location-dot"></i> View on Google Maps
                </a>
              </div>
            </div>
            
            <div className="contact-card glass-card gsap-reveal">
              <div className="card-icon"><i className="fa-solid fa-phone"></i></div>
              <div>
                <h3>Direct Phone Contact</h3>
                <p>Call the pharmacy desk directly for orders or appointment bookings:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.5rem' }}>
                  <a href="tel:+918145555232" style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '1.1rem' }}>+91 81455 55232</a>
                  <a href="tel:+917501482099" style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '1.1rem' }}>+91 75014 82099</a>
                </div>
              </div>
            </div>
            
            <div className="contact-card glass-card gsap-reveal">
              <div className="card-icon"><i className="fa-solid fa-business-time"></i></div>
              <div>
                <h3>Store Operating Hours</h3>
                <p><strong>Open 7 Days a week</strong></p>
                <p>Pharmacy counter: 8:00 AM – 10:00 PM</p>
                <p>Clinic visits: Dependent on doctor schedules</p>
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
