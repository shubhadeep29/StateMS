import { useState, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function PrescriptionOrder() {
  const [file, setFile] = useState(null)
  const [patientName, setPatientName] = useState('')
  const [address, setAddress] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)
  const { language, t } = useLanguage()

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return
    const fileType = selectedFile.type.toLowerCase()
    const fileName = selectedFile.name.toLowerCase()
    
    const isImage = fileType.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|heic)$/i.test(fileName)
    const isPdf = fileType === 'application/pdf' || fileName.endsWith('.pdf')
    
    if (isImage || isPdf) {
      setFile(selectedFile)
    } else {
      alert(t('order.validation.invalidType'))
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setPatientName('')
    setAddress('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const triggerFileBrowser = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Generate WhatsApp Order Link
  const getWhatsAppLink = () => {
    const nameStr = patientName.trim() || (language === 'bn' ? 'উল্লেখ নেই' : 'Not specified')
    const addressStr = address.trim() || (language === 'bn' ? 'দোকান থেকে পিকআপ' : 'Pickup from Store')
    const fileStr = file ? file.name : (language === 'bn' ? 'প্রেসক্রিপশন' : 'Prescription')
    
    const message = language === 'bn' 
      ? `হ্যালো এম/এস স্টেট মেডিসিন শপ, আমি একটি প্রেসক্রিপশন আপলোড করে ওষুধ অর্ডার করতে চাই।\n\n*অর্ডারের বিবরণ*:\n- *রোগীর নাম:* ${nameStr}\n- *ডেলিভারি ঠিকানা:* ${addressStr}\n- *সংযুক্ত প্রেসক্রিপশন ফাইল:* ${fileStr}\n\n(আমি আমার প্রেসক্রিপশন ফাইলটি এই চ্যাটের সাথে পরবর্তীতে পাঠাচ্ছি আপনার যাচাই ও বিলিংয়ের জন্য।)`
      : `Hello M/S State Medicine Shop, I would like to order medicines by uploading a prescription.\n\n*Order Details*:\n- *Patient Name:* ${nameStr}\n- *Delivery Address:* ${addressStr}\n- *Prescription File Attached:* ${fileStr}\n\n(I am attaching the prescription file to this chat next for your review and billing verification.)`
      
    return `https://wa.me/917501482099?text=${encodeURIComponent(message)}`
  }

  const isPdf = file && file.type.includes('pdf')

  return (
    <section id="order" className="bg-teal-light bg-grid-pattern">
      {/* Floating background icon */}
      <div className="bg-floating-icon icon-4"><i className="fa-solid fa-notes-medical"></i></div>

      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow"><i className="fa-brands fa-whatsapp"></i> {t('order.eyebrow')}</div>
          <h2>{t('order.title1')} <span className="highlight">{t('order.title2')}</span></h2>
          <p>{t('order.subtitle')}</p>
        </div>
        
        <div className="prescription-container">
          <div className="prescription-info-text">
            <h3>{t('order.stepTitle')}</h3>
            <p>{t('order.stepDesc')}</p>
            
            <div className="upload-steps">
              <div className="step-item">
                <div className="step-num">1</div>
                <div className="step-text">{t('order.step1')}</div>
              </div>
              <div className="step-item">
                <div className="step-num">2</div>
                <div className="step-text">{t('order.step2')}</div>
              </div>
              <div className="step-item">
                <div className="step-num">3</div>
                <div className="step-text">{t('order.step3')}</div>
              </div>
            </div>
            
            <div className="info-pill" style={{ marginTop: '1rem', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
              <i className="fa-solid fa-circle-info" style={{ color: 'var(--accent)' }}></i>
              <span>{t('order.infoVerify')}</span>
            </div>
          </div>
          
          <div className="prescription-widget glass-card">
            {!file ? (
              <div 
                className={`dropzone ${isDragOver ? 'dragover' : ''}`} 
                id="prescriptionDropzone"
                onDragEnter={handleDragOver}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileBrowser}
                style={{ cursor: 'pointer' }}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  id="prescriptionFileInput" 
                  className="file-input" 
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <i className="fa-solid fa-cloud-arrow-up dropzone-icon"></i>
                <p>{t('order.dragText')}</p>
                <span>{t('order.fileNote')}</span>
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm" 
                  id="browseBtn"
                  onClick={(e) => {
                    e.stopPropagation()
                    triggerFileBrowser()
                  }}
                >
                  {language === 'bn' ? 'ফাইল সিলেক্ট করুন' : 'Browse File'}
                </button>
              </div>
            ) : (
              <div>
                <div className="file-preview-container" id="filePreviewContainer" style={{ display: 'block' }}>
                  <div className="file-item">
                    <div className="file-details">
                      <i 
                        className={`fa-regular ${isPdf ? 'fa-file-pdf' : 'fa-image'}`} 
                        id="fileIcon"
                        style={{ color: isPdf ? '#ef4444' : 'var(--primary)' }}
                      ></i>
                      <div>
                        <div className="file-name" id="fileName">{file.name}</div>
                        <div className="file-size" id="fileSize">{formatBytes(file.size)}</div>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      className="remove-file-btn" 
                      id="removeFileBtn" 
                      aria-label="Remove file"
                      onClick={handleRemoveFile}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>

                <div className="whatsapp-checkout-container" id="whatsappCheckoutContainer" style={{ display: 'block' }}>
                  <div className="form-group">
                    <label htmlFor="patientName" className="form-label">{t('order.fieldLabelName')}</label>
                    <input 
                      type="text" 
                      id="patientName" 
                      className="form-input" 
                      placeholder={t('order.fieldNamePlaceholder')} 
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="deliveryAddress" className="form-label">{t('order.fieldLabelAddress')}</label>
                    <textarea 
                      id="deliveryAddress" 
                      rows="2" 
                      className="form-textarea" 
                      placeholder={t('order.fieldAddressPlaceholder')}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                  </div>
                  
                  <a 
                    href={getWhatsAppLink()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp" 
                    id="sendWhatsAppOrderBtn" 
                    style={{ width: '100%', marginTop: '0.5rem' }}
                  >
                    <i className="fa-brands fa-whatsapp"></i> {t('order.btnSubmit')}
                  </a>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-light)', textAlign: 'center', marginTop: '0.65rem' }}>
                    {t('order.whatsappInfo')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
