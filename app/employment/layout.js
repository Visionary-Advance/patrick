import { buildOpenGraph } from '@/lib/seo';
import { jsonLd, jobPostingSchema } from '@/lib/schema';

export const metadata = {
  title: 'Wildland Firefighter Jobs | PatRick Environmental',
  description: 'Wildland firefighter jobs at PatRick Environmental. $33–$40/hour, no experience required, training provided. Now hiring for the 2026 fire season.',
  alternates: {
    canonical: 'https://www.patrickfire.com/employment',
  },
  openGraph: buildOpenGraph({ url: 'https://www.patrickfire.com/employment' }),
};

export default function EmploymentLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(jobPostingSchema()) }}
      />
      {children}
    </>
  );
}
