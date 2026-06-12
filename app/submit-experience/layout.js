import { buildOpenGraph } from '@/lib/seo';

export const metadata = {
  title: 'Submit Experience | Patrick Environmental',
  description: 'Share your story of working with or alongside Patrick Environmental. Submit your experience and photos to help us honor our crews and their legacy.',
  alternates: {
    canonical: 'https://www.patrickfire.com/submit-experience',
  },
  openGraph: buildOpenGraph({ url: 'https://www.patrickfire.com/submit-experience' }),
};

export default function SubmitExperienceLayout({ children }) {
  return children;
}
