import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  {
    src: 'pharmacy_hero.png',
    alt: 'M/S State Medicine Shop Storefront',
    label: 'Store Front',
    badge: 'Actual Store Front'
  },
  {
    src: 'shop_counter.png',
    alt: 'Medicine Dispensation Counter',
    label: 'Dispensing Counter',
    badge: 'Shop Service Counter'
  },
  {
    src: 'shop_shelves.png',
    alt: 'Authentic Medicine Inventory Shelves',
    label: 'Medicine Inventory',
    badge: '100% Genuine Stocks'
  },
  {
    src: 'waiting_area.png',
    alt: 'OPD Clinic Patient Waiting Lounge',
    label: 'Waiting Area',
    badge: 'OPD Waiting Lounge'
  },
  {
    src: 'consultation_room.png',
    alt: 'Doctor Consultation Chamber',
    label: 'Doctor Chamber',
    badge: 'Doctor Consultation Chamber'
  }
]

export default function About() {
  const sectionRef = useRef(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

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
    <section id="about" ref={sectionRef} className="about bg-teal-light">
      <div className="container about-container">
        <div className="about-image-wrapper gsap-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <img 
              src={`${import.meta.env.BASE_URL}assets/${galleryImages[activeImageIndex].src}`} 
              alt={galleryImages[activeImageIndex].alt} 
              className="about-image" 
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', objectFit: 'cover', height: '280px' }}
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
          <h2 className="gsap-reveal">About <span className="highlight">State Medicine Shop</span></h2>
          <p className="lead-text gsap-reveal">
            Serving Kaliyaganj, Uttar Dinajpur, and surrounding areas with pharmacy excellence and reliable healthcare advice.
          </p>
          <p className="gsap-reveal">
            We are a dedicated local retail pharmacy that acts as a single-point destination for all your family's health requirements. From prescription drugs, chronic disease management (diabetes, blood pressure, cardiac care), to general wellness supplements and child care products, we stock all essential items from verified manufacturers.
          </p>
          <p className="gsap-reveal">
            We also feature an attached outpatient clinic hosting top visiting specialist doctors to ensure the local community does not have to travel long distances for expert medical opinions.
          </p>
          
          <div className="stats-grid">
            <div className="stat-box glass-card gsap-reveal">
              <i className="fa-solid fa-business-time"></i>
              <h4>5+ Years</h4>
              <p>Serving Kaliyaganj</p>
            </div>
            <div className="stat-box glass-card gsap-reveal">
              <i className="fa-solid fa-heart-pulse"></i>
              <h4>100%</h4>
              <p>Authentic Stock</p>
            </div>
            <div className="stat-box glass-card gsap-reveal">
              <i className="fa-solid fa-users"></i>
              <h4>10k+</h4>
              <p>Satisfied Patients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
