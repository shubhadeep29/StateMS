import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqData = [
  {
    id: 'faq1',
    question: 'Do you deliver medicines at home in Kaliyaganj?',
    answer: 'Yes, we offer home delivery inside Kaliyaganj town and nearby local sectors (within a 3km radius). Orders submitted by 6 PM are delivered on the same day. Standard delivery is free for orders above ₹500. For urgent local orders, a small convenience fee may apply.'
  },
  {
    id: 'faq2',
    question: 'How do I order online using WhatsApp?',
    answer: 'Simply click our "Order Online" section, browse/upload a picture of your prescription or type the medicine name, fill in the patient name and address, and click "Send Order details". You will be redirected to WhatsApp to send the details. Make sure to attach the photo of the prescription in the WhatsApp chat.'
  },
  {
    id: 'faq3',
    question: 'Do you accept UPI payments like GPay, PhonePe, or Paytm?',
    answer: 'Yes, we accept all digital payment methods including Google Pay, PhonePe, Paytm, BHIM UPI, as well as credit/debit cards and cash at our counter. For home deliveries, you can pay online via UPI once we share the bill estimate.'
  },
  {
    id: 'faq4',
    question: 'Is a doctor\'s prescription mandatory to buy medicines?',
    answer: 'A valid doctor\'s prescription is legally mandatory for Scheduled drugs (like antibiotics, psychiatric medicine, and strong pain relievers). General healthcare products, vitamins, cosmetics, baby care, and certain Over-The-Counter (OTC) remedies do not require a prescription.'
  },
  {
    id: 'faq5',
    question: 'How can I book an appointment with a visiting doctor?',
    answer: 'You can book appointment slots by calling our counter directly at 81455 55232 or 75014 82099 or clicking the "Book Appointment" button on the doctor\'s card, which starts a WhatsApp inquiry thread. We suggest booking 1-2 days in advance as visitor slots are limited.'
  }
]

export default function FAQ() {
  const [openId, setOpenId] = useState(null)

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faq" className="bg-teal-light">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow"><i className="fa-solid fa-circle-question"></i> Got Questions?</div>
          <h2>Frequently Asked <span className="highlight">Questions</span></h2>
          <p>Get answers to common queries regarding pharmacy timings, local medicine orders, home delivery, and consultation bookings.</p>
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
                          {faq.id === 'faq5' ? (
                            <>
                              You can book appointment slots by calling our counter directly at{' '}
                              <a href="tel:+918145555232">81455 55232</a> or <a href="tel:+917501482099">75014 82099</a> or clicking the "Book Appointment" button on the doctor's card, which starts a WhatsApp inquiry thread. We suggest booking 1-2 days in advance as visitor slots are limited.
                            </>
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
