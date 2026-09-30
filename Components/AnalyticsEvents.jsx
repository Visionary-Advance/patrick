'use client'

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

// Site-wide link click tracking: phone, email, job applications, contact CTAs, service links.
export default function AnalyticsEvents() {
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href');
      // Only the page path is sent: no link text, numbers or addresses, so nothing GA treats as PII.
      const params = { page_path: window.location.pathname };

      if (href.startsWith('tel:')) {
        trackEvent('phone_click', params);
      } else if (href.startsWith('mailto:')) {
        trackEvent('email_click', params);
      } else if (href.includes('embera.co/job-application')) {
        trackEvent('job_application_click', params);
      } else if (href === '/contact' || href.startsWith('/contact?') || href.startsWith('/contact#')) {
        trackEvent('contact_cta_click', params);
      } else if (href.startsWith('/services/')) {
        trackEvent('service_select', { ...params, service_id: href.split('/')[2] });
      } else if (href === '/employment') {
        trackEvent('employment_cta_click', params);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
