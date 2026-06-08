export default function Hero() {
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
      <div className="container hero-container">
        <div className="hero-text">
          <div className="hero-badge">
            <i className="fa-solid fa-shield-halved"></i> Trusted Local Healthcare Partner in Kaliyaganj
          </div>
          <h1>Your Health, <br />Our <span className="gradient-text">Primary Mission</span></h1>
          <p className="hero-desc">
            State Medicine Shop provides genuine prescription drugs, baby care essentials, and specialized doctor consultations for Kaliyaganj and surrounding communities.
          </p>
          
          <div className="quick-info-pills">
            <span className="info-pill"><i className="fa-solid fa-location-dot"></i> NS Road (Talkies Building)</span>
            <span className="info-pill"><i className="fa-regular fa-clock"></i> Open Daily: 8 AM – 10 PM</span>
            <span className="info-pill"><i className="fa-solid fa-truck-fast"></i> Home Delivery Available</span>
          </div>

          <div className="hero-buttons">
            <a href="#order" className="btn btn-primary btn-large" onClick={handleOrderClick}>
              <i className="fa-solid fa-file-prescription"></i> Order Online
            </a>
            <a href="tel:+917501482099" className="btn btn-secondary btn-large">
              <i className="fa-solid fa-phone"></i> Call Pharmacy
            </a>
            <a href="https://wa.me/917501482099" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-large">
              <i className="fa-brands fa-whatsapp"></i> WhatsApp Order
            </a>
          </div>
          
          <div className="trust-indicators">
            <div className="trust-item"><i className="fa-solid fa-circle-check"></i> 100% Genuine Medicines</div>
            <div className="trust-item"><i className="fa-solid fa-circle-check"></i> Trained Pharmacists</div>
            <div className="trust-item"><i className="fa-solid fa-circle-check"></i> UPI & Online Payments</div>
            <div className="trust-item"><i className="fa-solid fa-circle-check"></i> In-Clinic Doctors</div>
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
