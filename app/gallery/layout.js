import { buildOpenGraph } from '@/lib/seo';

export const metadata = {
  title: 'Gallery | Patrick Environmental',
  description: 'Photo gallery showcasing Patrick Environmental wildfire suppression and environmental services in action.',
  alternates: {
    canonical: 'https://www.patrickfire.com/gallery',
  },
  openGraph: buildOpenGraph({ url: 'https://www.patrickfire.com/gallery' }),
};

export default function GalleryLayout({ children }) {
  return children;
}
