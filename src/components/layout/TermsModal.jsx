import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { termsData } from '../../data/termsData'

export default function TermsModal({ isOpen, onClose, initialTab = 'terms' }) {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState(initialTab)
  const data = termsData[language] || termsData['en']

  // Reset tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab)
      // Prevent background scrolling
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, initialTab])

  if (!isOpen) return null

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 350 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 10,
      transition: { duration: 0.2 }
    }
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="terms-modal-overlay"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div 
          className="terms-modal-content glass-card"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="terms-modal-header">
            <h3>{data.title}</h3>
            <button 
              type="button" 
              className="terms-modal-close" 
              onClick={onClose}
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Tab buttons */}
          <div className="terms-modal-tabs">
            <button 
              type="button"
              className={`tab-btn ${activeTab === 'terms' ? 'active' : ''}`}
              onClick={() => setActiveTab('terms')}
            >
              {data.tabs.terms}
              {activeTab === 'terms' && (
                <motion.div className="tab-indicator" layoutId="modalTabIndicator" />
              )}
            </button>
            <button 
              type="button"
              className={`tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveTab('privacy')}
            >
              {data.tabs.privacy}
              {activeTab === 'privacy' && (
                <motion.div className="tab-indicator" layoutId="modalTabIndicator" />
              )}
            </button>
          </div>

          {/* Tab content area */}
          <div className="terms-modal-body">
            {activeTab === 'terms' ? (
              <div className="terms-section">
                {Object.values(data.termsContent).map((section, idx) => (
                  <div key={idx} className="terms-paragraph">
                    <h4>{section.title}</h4>
                    <p>{section.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="terms-section">
                {Object.values(data.privacyContent).map((section, idx) => (
                  <div key={idx} className="terms-paragraph">
                    <h4>{section.title}</h4>
                    <p>{section.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="terms-modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary btn-sm" 
              onClick={onClose}
            >
              {data.closeBtn}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
