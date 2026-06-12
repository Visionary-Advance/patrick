import ServiceCards from "@/Components/ServiceCards";
import { buildOpenGraph } from "@/lib/seo";

export const metadata = {
  title: 'Services | Patrick Environmental',
  description: 'Professional environmental services including wildland fire suppression, emergency response, brush trimming, consulting, and more.',
  alternates: {
    canonical: 'https://www.patrickfire.com/services',
  },
  openGraph: buildOpenGraph({ url: 'https://www.patrickfire.com/services' }),
};

export default function ServicesPage(){



    return(

        <>
        
        <div className="w-11/12 mx-auto mt-36 mb-20">
            <h1 className="jomol -mb-10 text-center text-3xl">Our Services</h1>
            <ServiceCards />
        </div>
        
        
        </>



    );
}