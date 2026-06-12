import { buildOpenGraph } from '@/lib/seo';

export const metadata = {
  title: 'Employment | Patrick Environmental',
  description: 'Join Patrick Environmental. Apply for wildland firefighting, emergency response, and environmental services positions.',
  alternates: {
    canonical: 'https://www.patrickfire.com/employment',
  },
  openGraph: buildOpenGraph({ url: 'https://www.patrickfire.com/employment' }),
};

export default function EmploymentLayout({ children }) {
  return children;
}
