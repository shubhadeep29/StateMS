// Analytics utility for Google Analytics 4 (GA4)

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const IS_DEV = import.meta.env.DEV;

/**
 * Dynamically injects the Google Analytics gtag.js script and initializes it.
 */
export const initGA = () => {
  if (!MEASUREMENT_ID) {
    if (IS_DEV) {
      console.warn("Analytics Warning: VITE_GA_MEASUREMENT_ID is not defined. Google Analytics will run in simulation mode.");
    }
    return;
  }

  // Prevent multiple injections
  if (document.getElementById('google-analytics-script')) return;

  try {
    // 1. Inject the script tag
    const script = document.createElement('script');
    script.id = 'google-analytics-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // 2. Setup gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    // 3. Configure GA
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, {
      send_page_view: true, // Auto-tracks initial page view
      anonymize_ip: true,   // Privacy/Compliance setting
    });

    if (IS_DEV) {
      console.log(`Analytics Success: GA4 initialized with ID ${MEASUREMENT_ID}`);
    }
  } catch (error) {
    console.error("Analytics Error: Failed to load Google Analytics", error);
  }
};

/**
 * Tracks a custom event in Google Analytics.
 * @param {string} eventName - Name of the event (e.g. 'whatsapp_click')
 * @param {object} eventParams - Optional parameters for the event
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
    if (IS_DEV) {
      console.log(`[GA4 Event] ${eventName}`, eventParams);
    }
  } else if (IS_DEV) {
    // Simulate event tracking in dev if GA is not loaded
    console.log(`[GA4 Simulation Event] ${eventName}`, eventParams);
  }
};
