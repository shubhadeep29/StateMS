import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
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
        start: 'top 90%',
      },
    })
  }, { scope: sectionRef })

  return (
    <section id="services" ref={sectionRef} className="services">
      <div className="container">
        <div className="section-header gsap-reveal">
          <div className="section-eyebrow"><i className="fa-solid fa-heart-pulse"></i> What We Offer</div>
          <h2>Comprehensive <span className="highlight">Healthcare Services</span></h2>
          <p>We are more than just a medicine store. We provide complete clinical consultations and premium pharmaceutical care under one roof.</p>
        </div>
        
        <div className="services-grid">
          {/* Card 1: Medicines & OTC */}
          <div className="service-card glass-card gsap-reveal">
            <div className="service-card-header">
              <div className="service-card-icon"><i className="fa-solid fa-pills"></i></div>
              <h3>Pharmacy Retail</h3>
            </div>
            <ul className="service-card-list">
              <li><i className="fa-solid fa-circle-check"></i> <div><strong>Prescription Meds:</strong> Authentic chronic & acute medications.</div></li>
              <li><i className="fa-solid fa-circle-check"></i> <div><strong>OTC Products:</strong> Everyday pain, cold, and digestion remedies.</div></li>
              <li><i className="fa-solid fa-circle-check"></i> <div><strong>Baby Care Essentials:</strong> Formula, baby food, diapers, and health products.</div></li>
              <li><i className="fa-solid fa-circle-check"></i> <div><strong>Wellness & Vitamins:</strong> Multivitamins, protein powders, & tonics.</div></li>
            </ul>
          </div>

          {/* Card 2: Clinical Care */}
          <div className="service-card glass-card gsap-reveal">
            <div className="service-card-header">
              <div className="service-card-icon"><i className="fa-solid fa-stethoscope"></i></div>
              <h3>OPD Clinic Facility</h3>
            </div>
            <ul className="service-card-list">
              <li><i className="fa-solid fa-circle-check"></i> <div><strong>Specialist Visits:</strong> Consultations with visiting MD physicians & surgeons.</div></li>
              <li><i className="fa-solid fa-circle-check"></i> <div><strong>Appointment Booking:</strong> Pre-book visiting slots via call or WhatsApp.</div></li>
              <li><i className="fa-solid fa-circle-check"></i> <div><strong>Health Screening:</strong> In-store blood pressure and blood sugar checks.</div></li>
              <li><i className="fa-solid fa-circle-check"></i> <div><strong>Medical Records:</strong> Systematic prescription logging for follow-ups.</div></li>
            </ul>
          </div>

          {/* Card 3: Support Services */}
          <div className="service-card glass-card gsap-reveal">
            <div className="service-card-header">
              <div className="service-card-icon"><i className="fa-solid fa-truck-fast"></i></div>
              <h3>Delivery & Support</h3>
            </div>
            <ul className="service-card-list">
              <li><i className="fa-solid fa-circle-check"></i> <div><strong>Home Delivery:</strong> Direct home delivery within Kaliyaganj town.</div></li>
              <li><i className="fa-solid fa-circle-check"></i> <div><strong>24-Hour Procurement:</strong> Non-stock medicines sourced within 24 hours.</div></li>
              <li><i className="fa-solid fa-circle-check"></i> <div><strong>WhatsApp Ordering:</strong> Send prescriptions and order items via chat.</div></li>
              <li><i className="fa-solid fa-circle-check"></i> <div><strong>Genuine Drug Guarantee:</strong> 100% authentic batches from licensed suppliers.</div></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
