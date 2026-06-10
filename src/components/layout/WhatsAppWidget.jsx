import { trackEvent } from '../../utils/analytics'

export default function WhatsAppWidget() {
  const handleClick = () => {
    trackEvent('floating_whatsapp_click', {
      event_category: 'Contact',
      event_label: 'Floating WhatsApp Widget'
    })
  }

  return (
    <a 
      href="https://wa.me/917501482099?text=Hello%20State%20Medicine%20Shop%2C%20I%20have%20an%20inquiry%20regarding%20medicines." 
      target="_blank" 
      rel="noopener noreferrer" 
      className="floating-whatsapp" 
      aria-label="Chat with Pharmacist on WhatsApp"
      onClick={handleClick}
    >
      <i className="fa-brands fa-whatsapp"></i>
    </a>
  )
}
