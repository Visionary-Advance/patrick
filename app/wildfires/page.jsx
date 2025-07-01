import Button from "@/Components/Button";
import Link from "next/link";




export default function WildfirePage(){

    const cardData = [
  {
    id: 1,
    title: "Facebook Updates",
    image: "/Img/Updates.jpg",
    alt: "Facebook Updates Picture",
    buttonText: "View",
    buttonColor: "bg-[#E32121] text-white px-5",
    href:"https://www.facebook.com/PatRickWildfire/"
  },
  {
    id: 2,
    title: "Wildfire Map",
    image: "/Img/WildfireMap.png",
    alt: "Wildfire Map Picture",
    buttonText: "View Map",
    buttonColor: "bg-[#E32121] text-white px-5",
    href:"/wildfires/map"
  }
];


    return(

        <>
        
        <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[450px] overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          <img
            src="/Img/WildFire_Img.png"
            alt="Fire suppression background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 h-full ">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl absolute bottom-5 left-5">
              <h1
                className="text-white text-3xl md:text-4xl font-normal mb-4 md:mb-2"
                style={{ fontFamily: "Jomolhari, sans-serif" }}
              >
                Wildfire Updates
              </h1>
              <p
                className="text-white text-lg md:text-2xl font-normal leading-relaxed max-w-xl"
                style={{ fontFamily: "Jomolhari, sans-serif" }}
              >
                Take a look at our wildfire map or checkout our Facebook to get current updates
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 py-12 w-full max-w-4xl mx-auto px-4">
    {cardData.map((card) => (
        <Link target="_blank" rel="noopener noreferrer" key={card.id} href={card.href}>
      <div  className="w-full max-w-sm mx-auto bg-white border border-black shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img 
          className="w-full h-48 sm:h-56 md:h-64 object-cover" 
          alt={card.alt} 
          src={card.image}
        />
        <div className="p-3 md:p-4">
          <h3 className="jomol text-xl md:text-2xl mb-2 md:mb-3 text-gray-800">
            {card.title}
          </h3>
          <Button 
            text={card.buttonText} 
            color={card.buttonColor} 
          />
        </div>
      </div>
      </Link>
    ))}
  </div>
        
        
        </>

    );
}