import { useState, useRef } from 'react'
import { flushSync } from 'react-dom'
import { useLanguage } from '../context/LanguageContext'
import ResponsiveImage, { assetUrl } from '../components/ResponsiveImage'
import Icon from '../components/Icon'
import useReveal from '../hooks/useReveal'

export default function Doctors() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { language, t } = useLanguage()
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  // Morph cards between filters with the View Transitions API where supported
  const selectCategory = (id) => {
    if (id === activeCategory) return
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduced) {
      setActiveCategory(id)
      return
    }
    document.startViewTransition(() => {
      flushSync(() => setActiveCategory(id))
    })
  }

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
    },
    {
      name: "Dr. Anwesha Chakraborty",
      qualification: language === 'bn'
        ? "এমবিবিএস, এমএস (নীলরতন সরকার মেডিক্যাল কলেজ, কলকাতা), MRCOG-1 (লন্ডন), (অনার্স) (প্রসূতিবিদ্যা), রায়গঞ্জ গভঃ মেডিক্যাল কলেজ ও হাসপাতাল, রেজিঃ নং- ৮৭৬৬৬"
        : "MBBS, MS (NRS Medical College, Kol.), MRCOG-1 (LONDON), (Hons.) (Obgy), Raiganj Govt. Medical College & Hospital, Reg. No: 87666",
      specialty: language === 'bn'
        ? "পরামর্শদাতা চিকিৎসক, স্ত্রীরোগ ও প্রসূতিবিদ্যায় বিশেষজ্ঞ"
        : "Consultant Gynecologist & Obstetrician",
      schedule: language === 'bn'
        ? "বিস্তারিত জানতে যোগাযোগ করুন"
        : "Contact for details",
      fee: t('doctors.feeVal'),
      category: "gynae"
    },
    {
      name: "Dr. M.D. F. Kabir",
      qualification: language === 'bn'
        ? "এম.বি.বি.এস (ডাব্লুবিইউএইচএস), এম.এস (অর্থপেডিক্স), রেজি নং-৭৩৯৭৭"
        : "MBBS (WBUHS), MS (Orthopedics), Reg No-73977",
      specialty: language === 'bn'
        ? "অর্থপেডিক্স (অস্থি বিশেষজ্ঞ)"
        : "Orthopedics / Bone Specialist",
      schedule: language === 'bn'
        ? "বিস্তারিত জানতে যোগাযোগ করুন"
        : "Contact for details",
      fee: t('doctors.feeVal'),
      category: "orthopedics",
      posterUrl: assetUrl('dr_kabir_banner', 1600)
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
    { id: 'orthopedics', label: t('doctors.categories.orthopedics') },
  ]

  return (
    <section id="doctors" ref={sectionRef} className="bg-medical-pattern">


      <div className="container">
        <div className="section-header reveal">
          <div className="section-eyebrow"><Icon name="user-doctor" /> {t('doctors.eyebrow')}</div>
          <h2>{t('doctors.title1')} <span className="highlight">{t('doctors.title2')}</span></h2>
          <p>{t('doctors.subtitle')}</p>
        </div>

        <div className="doctor-widget reveal">
          <div className="doctor-tabs" role="tablist" aria-label="Doctor Specialties">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                role="tab"
                aria-selected={activeCategory === cat.id}
                aria-controls="doctorGrid"
                onClick={() => selectCategory(cat.id)}
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
                <div
                  key={doc.name}
                  className="doctor-card glass-card"
                  style={{ viewTransitionName: `doc-${doc.name.replace(/[^a-zA-Z0-9]/g, '')}` }}
                >
                  <div className="doc-info-header">
                    <div className="doc-avatar-large">
                      <Icon name="user-doctor" />
                    </div>
                    <div className="doc-meta">
                      <h3>{doc.name}</h3>
                      <span className="doc-qual">{doc.qualification}</span>
                      {doc.posterUrl && (
                        <a
                          href={doc.posterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="doc-poster-badge"
                          aria-label={`${t('doctors.viewPoster')}: ${doc.name}`}
                        >
                          <Icon name="image-regular" /> {t('doctors.viewPoster')}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="doc-details-list">
                    <div className="doc-detail-item">
                      <Icon name="stethoscope" />
                      <span>{language === 'bn' ? 'বিশেষত্ব:' : 'Specialty:'} <strong>{doc.specialty}</strong></span>
                    </div>
                    <div className="doc-detail-item">
                      <Icon name="calendar-check-regular" />
                      <span>{language === 'bn' ? 'সময়সূচী:' : 'Timings:'} <strong>{doc.schedule}</strong></span>
                    </div>
                    <div className="doc-detail-item">
                      <Icon name="receipt" />
                      <span>{t('doctors.labelFee')}: <strong>{doc.fee}</strong></span>
                    </div>
                  </div>
                  <div className="doc-card-actions">
                    <span className="clinic-visit-badge"><Icon name="circle-check-regular" /> {t('doctors.badgeActive')}</span>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                      <Icon name="whatsapp" /> {language === 'bn' ? 'অ্যাপয়েন্টমেন্ট বুক করুন' : 'Book Appointment'}
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Dedicated Spotlight Section for Dr. M.D. F. Kabir */}
        <div id="dr-kabir-spotlight" className="doctor-spotlight-section reveal">
          <div className="spotlight-card glass-card">
            <div className="spotlight-poster-wrapper">
              <a
                href={assetUrl('dr_kabir_banner', 1600)}
                target="_blank"
                rel="noopener noreferrer"
                className="spotlight-poster-link"
                aria-label={language === 'bn' ? 'ডাঃ কবিরের চেম্বার পোস্টার বড় করে দেখুন' : "View Dr. Kabir's visiting poster in full size"}
              >
                <ResponsiveImage
                  name="dr_kabir_banner"
                  widths={[800, 1600]}
                  sizes="(max-width: 992px) 92vw, 560px"
                  width={1600}
                  height={959}
                  alt="Dr. M.D. F. Kabir Orthopedic Specialist Visiting Banner"
                  className="spotlight-poster-img"
                />
                <span className="spotlight-poster-zoom">
                  <Icon name="image-regular" /> {t('doctors.viewPoster')}
                </span>
              </a>
            </div>

            <div className="spotlight-info">
              <div className="spotlight-eyebrow">
                <Icon name="notes-medical" />
                <span>{language === 'bn' ? 'বিশেষ ওপিডি স্পটলাইট' : 'Featured Specialist Spotlight'}</span>
              </div>
              <h3>{language === 'bn' ? 'ডাঃ এম.ডি. এফ. কবির' : 'Dr. M.D. F. Kabir'}</h3>
              <p className="spotlight-qual">
                {language === 'bn'
                  ? 'এম.বি.বি.এস (ডাব্লুবিইউএইচএস), এম.এস (অর্থপেডিক্স) | রেজি নং- ৭৩৯৭৭'
                  : 'MBBS (WBUHS), MS (Orthopedics) | Reg No: 73977'}
              </p>
              <p className="spotlight-desc">
                {language === 'bn'
                  ? 'হাড়ের ব্যথা, বাত, জয়েন্টের সমস্যা, স্পন্ডিলোসিস ও ফ্র্যাকচারের বিশেষজ্ঞ চিকিৎসার জন্য কালিয়াগঞ্জেই পরামর্শ নিন অভিজ্ঞ অর্থপেডিক বিশেষজ্ঞের।'
                  : 'Specialized clinical consultation for bone & joint pains, arthritis, spondylosis, fractures, and musculoskeletal care in Kaliyaganj.'}
              </p>

              <div className="spotlight-highlights">
                <span className="spotlight-tag">
                  <Icon name="stethoscope" /> {language === 'bn' ? 'অস্থি ও জয়েন্ট বিশেষজ্ঞ' : 'Bone & Joint Specialist'}
                </span>
                <span className="spotlight-tag">
                  <Icon name="circle-check-regular" /> {language === 'bn' ? 'রেজিস্টার্ড বিশেষজ্ঞ' : 'Registered Specialist'}
                </span>
                <span className="spotlight-tag">
                  <Icon name="calendar-check-regular" /> {language === 'bn' ? 'ভিজিটিং চেম্বার শিডিউল' : 'Visiting OPD Clinic'}
                </span>
              </div>

              <div className="spotlight-actions">
                <a
                  href={`https://wa.me/917501482099?text=${encodeURIComponent(
                    language === 'bn'
                      ? 'হ্যালো এম/এস স্টেট মেডিসিন শপ, আমি ডাঃ এম.ডি. এফ. কবির (অর্থপেডিক্স)-এর চেম্বারে দেখানোর জন্য একটি বুকিং স্লট পেতে চাই। অনুগ্রহ করে পরবর্তী উপলব্ধ তারিখ ও সময় জানান।'
                      : 'Hello M/S State Medicine Shop, I would like to book a clinic consultation slot for Dr. M.D. F. Kabir (Orthopedics). Please inform me about the next available timing.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <Icon name="whatsapp" /> {language === 'bn' ? 'অ্যাপয়েন্টমেন্ট বুক করুন' : "Book Appointment"}
                </a>
                <a
                  href={assetUrl('dr_kabir_banner', 1600)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Icon name="image-regular" /> {t('doctors.viewPoster')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
