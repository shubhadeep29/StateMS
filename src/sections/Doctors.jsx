import { useState } from 'react'

const doctorsDatabase = [
  {
    name: "Dr. Anisha Banerjee",
    qualification: "MBBS (Hons), MD, DVL (Dermatologist & Cosmetologist)",
    specialty: "Dermatology / Skin & Cosmetology",
    schedule: "Every Saturday",
    fee: "Contact Counter",
    category: "dermatology"
  },
  {
    name: "Dr. Kingshuk Das",
    qualification: "MBBS (General Physician), Ex-House Staff in Medicine (Raiganj MC&H), Reg No: 87860 (WBMC)",
    specialty: "General Medicine / Physician",
    schedule: "Daily, 6:00 PM onwards",
    fee: "Contact Counter",
    category: "medicine"
  },
  {
    name: "Dr. Rehatun Nehar",
    qualification: "MBBS (WBUHS), Medical Officer (Hemtabad Rural Hospital)",
    specialty: "General Physician & Gynecology Specialist",
    schedule: "Daily, 5:00 PM onwards",
    fee: "Contact Counter",
    category: "gynae"
  }
]

export default function Doctors() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredDoctors = activeCategory === 'all'
    ? doctorsDatabase
    : doctorsDatabase.filter(doc => doc.category === activeCategory)

  const categories = [
    { id: 'all', label: 'All Specialties' },
    { id: 'medicine', label: 'General Medicine' },
    { id: 'gynae', label: 'Gynecology' },
    { id: 'dermatology', label: 'Dermatology' },
  ]

  return (
    <section id="doctors">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow"><i className="fa-solid fa-user-doctor"></i> OPD Clinic</div>
          <h2>Visiting <span className="highlight">Doctors Schedule</span></h2>
          <p>Consult with expert clinicians from top regional hospitals without leaving Kaliyaganj. Select a specialty to view visiting schedules and fee details.</p>
        </div>

        <div className="doctor-widget">
          <div className="doctor-tabs" role="tablist" aria-label="Doctor Specialties">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                role="tab"
                aria-selected={activeCategory === cat.id}
                aria-controls="doctorGrid"
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="doctor-cards-grid" id="doctorGrid" role="tabpanel">
            {filteredDoctors.map((doc, index) => {
              const bookingMsg = encodeURIComponent(`Hello M/S State Medicine Shop, I would like to book a clinic consultation slot for Dr. ${doc.name} (${doc.specialty}). Please inform me about the next available timing.`)
              const whatsappLink = `https://wa.me/917501482099?text=${bookingMsg}`

              return (
                <div key={index} className="doctor-card glass-card">
                  <div className="doc-info-header">
                    <div className="doc-avatar-large">
                      <i className="fa-solid fa-user-doctor"></i>
                    </div>
                    <div className="doc-meta">
                      <h3>{doc.name}</h3>
                      <span className="doc-qual">{doc.qualification}</span>
                    </div>
                  </div>
                  <div className="doc-details-list">
                    <div className="doc-detail-item">
                      <i className="fa-solid fa-stethoscope"></i>
                      <span>Specialty: <strong>{doc.specialty}</strong></span>
                    </div>
                    <div className="doc-detail-item">
                      <i className="fa-regular fa-calendar-check"></i>
                      <span>Timings: <strong>{doc.schedule}</strong></span>
                    </div>
                    <div className="doc-detail-item">
                      <i className="fa-solid fa-receipt"></i>
                      <span>Consultation Fee: <strong>{doc.fee}</strong></span>
                    </div>
                  </div>
                  <div className="doc-card-actions">
                    <span className="clinic-visit-badge"><i className="fa-regular fa-circle-check"></i> Active Schedule</span>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                      <i className="fa-brands fa-whatsapp"></i> Book Appointment
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
