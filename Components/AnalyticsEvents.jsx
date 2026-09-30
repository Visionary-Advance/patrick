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
      const params = {
        page_path: window.location.pathname,
        link_text: link.textContent.trim().slice(0, 100),
      };

      if (href.startsWith('tel:')) {
        trackEvent('phone_click', { ...params, phone_number: href.replace('tel:', '') });
      } else if (href.startsWith('mailto:')) {
        trackEvent('email_click', { ...params, email_address: href.replace('mailto:', '').split('?')[0] });
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
