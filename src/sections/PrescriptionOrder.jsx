import { useState, useRef } from 'react'

export default function PrescriptionOrder() {
  const [file, setFile] = useState(null)
  const [patientName, setPatientName] = useState('')
  const [address, setAddress] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)

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
      alert("Invalid file format. Please upload only prescription images (JPG, PNG, WebP) or PDF documents.")
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
    const nameStr = patientName.trim() || 'Not specified'
    const addressStr = address.trim() || 'Pickup from Store'
    const fileStr = file ? file.name : 'Prescription'
    const message = `Hello M/S State Medicine Shop, I would like to order medicines by uploading a prescription.\n\n*Order Details*:\n- *Patient Name:* ${nameStr}\n- *Delivery Address:* ${addressStr}\n- *Prescription File Attached:* ${fileStr}\n\n(I am attaching the prescription file to this chat next for your review and billing verification.)`
    return `https://wa.me/917501482099?text=${encodeURIComponent(message)}`
  }

  const isPdf = file && file.type.includes('pdf')

  return (
    <section id="order" className="bg-teal-light">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow"><i className="fa-brands fa-whatsapp"></i> Online Ordering</div>
          <h2>Order via <span className="highlight">Prescription Upload</span></h2>
          <p>Have a hand-written doctor prescription? Simply take a photo, drag and drop it below, and click to complete your order directly on WhatsApp.</p>
        </div>
        
        <div className="prescription-container">
          <div className="prescription-info-text">
            <h3>Simple 3-Step WhatsApp Order</h3>
            <p>Ordering medications from State Medicine Shop has never been easier. Follow these steps to submit your order directly to our counter:</p>
            
            <div className="upload-steps">
              <div className="step-item">
                <div className="step-num">1</div>
                <div className="step-text">Select or drag in your prescription image.</div>
              </div>
              <div className="step-item">
                <div className="step-num">2</div>
                <div className="step-text">Confirm your contact number and home address details.</div>
              </div>
              <div className="step-item">
                <div className="step-num">3</div>
                <div className="step-text">Click "Submit Order" to open WhatsApp and attach the prescription image.</div>
              </div>
            </div>
            
            <div className="info-pill" style={{ marginTop: '1rem', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
              <i className="fa-solid fa-circle-info" style={{ color: 'var(--success)' }}></i>
              <span>All orders are hand-verified by a licensed pharmacist before dispensing.</span>
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
                <p>Drag & Drop Prescription</p>
                <span>or click to browse files (JPG, PNG, PDF)</span>
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm" 
                  id="browseBtn"
                  onClick={(e) => {
                    e.stopPropagation()
                    triggerFileBrowser()
                  }}
                >
                  Browse File
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
                    <label htmlFor="patientName" className="form-label">Patient Name</label>
                    <input 
                      type="text" 
                      id="patientName" 
                      className="form-input" 
                      placeholder="Enter patient name" 
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="deliveryAddress" className="form-label">Delivery Address (Kaliyaganj)</label>
                    <textarea 
                      id="deliveryAddress" 
                      rows="2" 
                      className="form-textarea" 
                      placeholder="Enter full address for home delivery"
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
                    <i className="fa-brands fa-whatsapp"></i> Send Order via WhatsApp
                  </a>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-light)', textAlign: 'center', marginTop: '0.65rem' }}>
                    Remember to attach the prescription image in WhatsApp after sending!
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
