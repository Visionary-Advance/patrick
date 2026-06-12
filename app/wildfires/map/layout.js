import { buildOpenGraph } from '@/lib/seo';

export const metadata = {
  title: 'Wildfire Map | Patrick Environmental',
  description: "Explore Patrick Environmental's interactive wildfire map showing active fire data, hotspots, and incidents across the United States, updated from NASA FIRMS.",
  alternates: {
    canonical: 'https://www.patrickfire.com/wildfires/map',
  },
  openGraph: buildOpenGraph({ url: 'https://www.patrickfire.com/wildfires/map' }),
};

export default function WildfireMapLayout({ children }) {
  return children;
}
