import { servicesData } from '@/lib/servicesData';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = servicesData.find((s) => s.id === id);
  const title = service ? service.content.heading : 'Services';
  return {
    title: `${title} | PatRick Environmental Services`,
    description: service ? service.shortDesc : 'Professional environmental services including wildland fire suppression, emergency response, brush trimming, consulting, and more.',
    alternates: {
      canonical: `https://www.patrickfire.com/services/${id}`,
    },
    openGraph: {
      url: `https://www.patrickfire.com/services/${id}`,
    },
  };
}

export default function ServicesLayout({ children }) {
  return children;
}