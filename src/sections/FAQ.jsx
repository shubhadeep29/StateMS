import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function FAQ() {
  const [openId, setOpenId] = useState(null)
  const { t } = useLanguage()

  const faqData = [
    { id: 'faq1', question: t('faq.q1'), answer: t('faq.a1') },
    { id: 'faq2', question: t('faq.q2'), answer: t('faq.a2') },
    { id: 'faq3', question: t('faq.q3'), answer: t('faq.a3') },
    { id: 'faq4', question: t('faq.q4'), answer: t('faq.a4') },
    { id: 'faq5', question: t('faq.q5'), answer: t('faq.a5') }
  ]

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faq" className="bg-teal-light">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow"><i className="fa-solid fa-circle-question"></i> {t('faq.eyebrow')}</div>
          <h2>{t('faq.title1')} <span className="highlight">{t('faq.title2')}</span></h2>
          <p>{t('faq.subtitle')}</p>
        </div>
        
        <div className="faq-grid">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id
            return (
              <div key={faq.id} className="faq-card glass-card">
                <button 
                  className={`faq-header ${isOpen ? 'active' : ''}`}
                  aria-expanded={isOpen}
                  aria-controls={faq.id}
                  onClick={() => toggleFaq(faq.id)}
                >
                  {faq.question}
                  <i 
                    className="fa-solid fa-chevron-down faq-icon"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }}
                  ></i>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={faq.id}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="faq-body" style={{ display: 'block', maxHeight: 'none' }}>
                        <div className="faq-content">
                          {faq.id === 'faq4' ? (
                            // For doctor appointments FAQ, make sure standard phone links are clickable
                            t('language') === 'bn' ? (
                              <>
                                আপনি ডক্টরস সেকশনে সংশ্লিষ্ট ডাক্তারের কার্ডের নিচে থাকা 'হোয়াটসঅ্যাপে স্লট বুক করুন' বোতামে ক্লিক করে আমাদের সাথে যোগাযোগ করতে পারেন। অথবা সরাসরি আমাদের ফোন নম্বর <a href="tel:+918145555232">৮১৪৫৫ ৫৫২৩২</a> / <a href="tel:+917501482099">৭৫০১৪ ৮২০৯৯</a> নম্বরে কল করে স্লট বুক করতে পারেন।
                              </>
                            ) : (
                              <>
                                You can book by clicking 'Book Slot on WhatsApp' under the doctor's profile card in the schedule section, or by calling our direct helpline numbers (<a href="tel:+918145555232">+91 81455 55232</a> / <a href="tel:+917501482099">+91 75014 82099</a>) directly.
                              </>
                            )
                          ) : (
                            faq.answer
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
