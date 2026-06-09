import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Doctors() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { language, t } = useLanguage()

  const doctorsDatabase = [
    {
      name: "Dr. Anisha Banerjee",
      qualification: language === 'bn' 
        ? "এমবিবিএস (অনার্স), এমডি, ডিভিএল (ত্বক ও চর্মরোগ বিশেষজ্ঞ)"
        : "MBBS (Hons), MD, DVL (Dermatologist & Cosmetologist)",
      specialty: language === 'bn'
        ? "চর্মরোগ ও কসমেটোলজি"
        : "Dermatology / Skin & Cosmetology",
      schedule: language === 'bn'
        ? "প্রতি শনিবার"
        : "Every Saturday",
      fee: t('doctors.feeVal'),
      category: "dermatology"
    },
    {
      name: "Dr. Kingshuk Das",
      qualification: language === 'bn'
        ? "এমবিবিএস (জেনারেল ফিজিশিয়ান), প্রাক্তন হাউস স্টাফ মেডিসিন (রায়গঞ্জ এমসিঅ্যান্ডএইচ), রেজিস্টার্ড নং: ৮৭৮৬০ (ডাব্লুবিএমসি)"
        : "MBBS (General Physician), Ex-House Staff in Medicine (Raiganj MC&H), Reg No: 87860 (WBMC)",
      specialty: language === 'bn'
        ? "জেনারেল মেডিসিন / ফিজিশিয়ান"
        : "General Medicine / Physician",
      schedule: language === 'bn'
        ? "প্রতিদিন, সন্ধ্যা ৬:০০ টা থেকে"
        : "Daily, 6:00 PM onwards",
      fee: t('doctors.feeVal'),
      category: "medicine"
    },
    {
      name: "Dr. Rehatun Nehar",
      qualification: language === 'bn'
        ? "এমবিবিএস (ডাব্লুবিইউএইচএস), মেডিকেল অফিসার (হেমতাবাদ গ্রামীণ হাসপাতাল)"
        : "MBBS (WBUHS), Medical Officer (Hemtabad Rural Hospital)",
      specialty: language === 'bn'
        ? "জেনারেল ফিজিশিয়ান ও স্ত্রীরোগ বিশেষজ্ঞ"
        : "General Physician & Gynecology Specialist",
      schedule: language === 'bn'
        ? "প্রতিদিন, বিকেল ৫:০০ টা থেকে"
        : "Daily, 5:00 PM onwards",
      fee: t('doctors.feeVal'),
      category: "gynae"
    }
  ]

  const filteredDoctors = activeCategory === 'all'
    ? doctorsDatabase
    : doctorsDatabase.filter(doc => doc.category === activeCategory)

  const categories = [
    { id: 'all', label: t('doctors.categories.all') },
    { id: 'medicine', label: t('doctors.categories.medicine') },
    { id: 'gynae', label: t('doctors.categories.gynae') },
    { id: 'dermatology', label: t('doctors.categories.dermatology') },
  ]

  return (
    <section id="doctors" className="bg-medical-pattern">
      {/* Floating background icon */}
      <div className="bg-floating-icon icon-5"><i className="fa-solid fa-stethoscope"></i></div>

      {/* Bottom Wave Divider */}
      <svg className="section-divider divider-bottom divider-teal-light" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,20 C480,60 960,10 1440,40 L1440,74 L0,74 Z" fill="currentColor"></path>
      </svg>

      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow"><i className="fa-solid fa-user-doctor"></i> {t('doctors.eyebrow')}</div>
          <h2>{t('doctors.title1')} <span className="highlight">{t('doctors.title2')}</span></h2>
          <p>{t('doctors.subtitle')}</p>
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
              const bookingMsg = language === 'bn'
                ? `হ্যালো এম/এস স্টেট মেডিসিন শপ, আমি ডাক্তার ${doc.name} (${doc.specialty})-এর চেম্বারে দেখানোর জন্য একটি বুকিং স্লট পেতে চাই। অনুগ্রহ করে আমাকে পরবর্তী উপলব্ধ সময় জানান।`
                : `Hello M/S State Medicine Shop, I would like to book a clinic consultation slot for Dr. ${doc.name} (${doc.specialty}). Please inform me about the next available timing.`
              
              const whatsappLink = `https://wa.me/917501482099?text=${encodeURIComponent(bookingMsg)}`

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
                      <span>{language === 'bn' ? 'বিশেষত্ব:' : 'Specialty:'} <strong>{doc.specialty}</strong></span>
                    </div>
                    <div className="doc-detail-item">
                      <i className="fa-regular fa-calendar-check"></i>
                      <span>{language === 'bn' ? 'সময়সূচী:' : 'Timings:'} <strong>{doc.schedule}</strong></span>
                    </div>
                    <div className="doc-detail-item">
                      <i className="fa-solid fa-receipt"></i>
                      <span>{t('doctors.labelFee')}: <strong>{doc.fee}</strong></span>
                    </div>
                  </div>
                  <div className="doc-card-actions">
                    <span className="clinic-visit-badge"><i className="fa-regular fa-circle-check"></i> {t('doctors.badgeActive')}</span>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                      <i className="fa-brands fa-whatsapp"></i> {language === 'bn' ? 'অ্যাপয়েন্টমেন্ট বুক করুন' : 'Book Appointment'}
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
