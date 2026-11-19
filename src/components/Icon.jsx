// Inline SVG icons built from Font Awesome icon data (tree-shaken; no icon font download).
import {
  faBars,
  faBusinessTime,
  faCamera,
  faChevronDown,
  faChevronUp,
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faCircleQuestion,
  faCloudArrowUp,
  faComments,
  faEnvelope,
  faEnvelopeOpenText,
  faFilePrescription,
  faHeartPulse,
  faLocationDot,
  faMapLocationDot,
  faNotesMedical,
  faPhone,
  faPills,
  faPlus,
  faPrescriptionBottleMedical,
  faReceipt,
  faShareNodes,
  faShieldHalved,
  faStethoscope,
  faTrashCan,
  faTruckFast,
  faUserDoctor,
  faUsers,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import {
  faCalendarCheck as faCalendarCheckRegular,
  faCircleCheck as faCircleCheckRegular,
  faClock as faClockRegular,
  faFilePdf as faFilePdfRegular,
  faImage as faImageRegular,
} from '@fortawesome/free-regular-svg-icons'
import {
  faFacebookF,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'

const ICONS = {
  'facebook-f': faFacebookF,
  'whatsapp': faWhatsapp,
  'calendar-check-regular': faCalendarCheckRegular,
  'circle-check-regular': faCircleCheckRegular,
  'clock-regular': faClockRegular,
  'file-pdf-regular': faFilePdfRegular,
  'image-regular': faImageRegular,
  'bars': faBars,
  'business-time': faBusinessTime,
  'camera': faCamera,
  'chevron-down': faChevronDown,
  'chevron-up': faChevronUp,
  'circle-check': faCircleCheck,
  'circle-exclamation': faCircleExclamation,
  'circle-info': faCircleInfo,
  'circle-question': faCircleQuestion,
  'cloud-arrow-up': faCloudArrowUp,
  'comments': faComments,
  'envelope': faEnvelope,
  'envelope-open-text': faEnvelopeOpenText,
  'file-prescription': faFilePrescription,
  'heart-pulse': faHeartPulse,
  'location-dot': faLocationDot,
  'map-location-dot': faMapLocationDot,
  'notes-medical': faNotesMedical,
  'phone': faPhone,
  'pills': faPills,
  'plus': faPlus,
  'prescription-bottle-medical': faPrescriptionBottleMedical,
  'receipt': faReceipt,
  'share-nodes': faShareNodes,
  'shield-halved': faShieldHalved,
  'stethoscope': faStethoscope,
  'trash-can': faTrashCan,
  'truck-fast': faTruckFast,
  'user-doctor': faUserDoctor,
  'users': faUsers,
  'xmark': faXmark,
}

// <i> wrapper is kept so existing CSS rules targeting `... i` still size and colour the icon.
export default function Icon({ name, className = '', ...rest }) {
  const def = ICONS[name]
  if (!def) {
    if (import.meta.env.DEV) console.warn(`Icon: unknown name "${name}"`)
    return null
  }
  const [width, height, , , path] = def.icon
  return (
    <i className={`icon ${className}`.trim()} aria-hidden="true" {...rest}>
      <svg viewBox={`0 0 ${width} ${height}`} fill="currentColor" focusable="false">
        {Array.isArray(path) ? path.map((d) => <path key={d} d={d} />) : <path d={path} />}
      </svg>
    </i>
  )
}
