import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import Icon from '../Icon'

export default function ShareWidget({ variant = 'floating' }) {
  const [copied, setCopied] = useState(false)
  const { language } = useLanguage()

  const handleShare = async (e) => {
    e.preventDefault()
    
    // Check if translation keys exist, else fallback to standard English
    const shareTitle = 'M/S State Medicine Shop'
    const shareText = language === 'bn' 
      ? 'এম/এস স্টেট মেডিসিন শপ - কালিয়াগঞ্জে আসল ওষুধ অর্ডার করুন এবং ডাক্তার দেখান।'
      : 'Order genuine prescription medicines and consult specialist doctors at State Medicine Shop, Kaliyaganj.'
    
    const shareData = {
      title: shareTitle,
      text: shareText,
      url: window.location.href
    }

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Web Share failed or cancelled:', err)
      }
    } else {
      // Fallback: Copy URL to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      } catch (err) {
        console.error('Failed to copy text to clipboard:', err)
      }
    }
  }

  const toast = copied && (
    <div className="share-toast" role="status">
      {language === 'bn' ? 'লিঙ্ক কপি হয়েছে!' : 'Link Copied!'}
    </div>
  )

  if (variant === 'inline') {
    return (
      <div className="share-inline">
        <button onClick={handleShare} className="social-btn" aria-label="Share website link">
          <Icon name="share-nodes" />
        </button>
        {toast}
      </div>
    )
  }

  return (
    <div className="share-widget-container">
      <button
        onClick={handleShare}
        className="floating-share"
        aria-label="Share website link"
      >
        <Icon name="share-nodes" />
      </button>
      {toast}
    </div>
  )
}
