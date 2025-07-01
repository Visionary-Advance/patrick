'use client'

import { useState } from "react";


const services = [
  {
    id: "wildland-fire",
    title: "Wildland Fire\nSuppression",
    content: {
      heading: "Wildland Fire Suppression",
      description:
        "PatRick Environmental specializes in wildland fire suppression, deploying highly trained crews and advanced equipment to protect forests, communities, and critical infrastructure. Our teams are experienced in initial attack, extended attack, and large fire support, working alongside federal, state, and local agencies. From remote wilderness areas to urban interfaces, we respond quickly and effectively, using proven strategies and real-time decision-making to contain and control fires. Our commitment to safety, teamwork, and operational excellence ensures we're ready to meet the toughest challenges the wildfire season brings.",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a111d247ef91bacd3a49ec479c0702e50729aab6?width=1152",
      imageAlt: "Fire suppression crew in action",
    },
  },
  {
    id: "emergency-services",
    title: "Emergency Services",
    content: {
      heading: "Emergency Services",
      description:
        "Our emergency response team provides rapid deployment for various critical situations. We maintain 24/7 readiness to respond to natural disasters, environmental emergencies, and urgent safety situations across multiple sectors.",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2c389bbe86bf96e483047811905a6aac41f097a2?width=1160",
      imageAlt: "Emergency response team",
    },
  },
  {
    id: "brush-trimming",
    title: "Brush Trimming",
    content: {
      heading: "Brush Trimming",
      description:
        "Professional vegetation management and brush trimming services to reduce fire risk and maintain safe clearances around properties and infrastructure.",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a111d247ef91bacd3a49ec479c0702e50729aab6?width=1152",
      imageAlt: "Brush trimming operation",
    },
  },
  {
    id: "consulting",
    title: "Consulting",
    content: {
      heading: "Consulting",
      description:
        "Expert environmental consulting services providing strategic guidance for fire risk assessment, emergency planning, and environmental compliance.",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2c389bbe86bf96e483047811905a6aac41f097a2?width=1160",
      imageAlt: "Consulting meeting",
    },
  },
  {
    id: "video-pyrotechnics",
    title: "Video Pyrotechnics",
    content: {
      heading: "Video Pyrotechnics",
      description:
        "Specialized pyrotechnics services for film, television, and entertainment industry with full safety protocols and professional execution.",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a111d247ef91bacd3a49ec479c0702e50729aab6?width=1152",
      imageAlt: "Video pyrotechnics setup",
    },
  },
  {
    id: "snow-removal",
    title: "Snow Removal",
    content: {
      heading: "Snow Removal",
      description:
        "Professional snow removal services for commercial and residential properties, ensuring safe access during winter weather conditions.",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2c389bbe86bf96e483047811905a6aac41f097a2?width=1160",
      imageAlt: "Snow removal operation",
    },
  },
];

function ServiceTabs() {
  const [activeTab, setActiveTab] = useState("wildland-fire");
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (serviceId, index) => {
    setActiveTab(serviceId);
    setActiveIndex(index);
  };

  return (
    <section className="bg-white ">
      <div className="container mx-auto px-4">
        <div className="w-full">
          {/* Service Navigation */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-full max-w-6xl">
              {/* Tab buttons container */}
              <div className="grid grid-cols-2 md:grid-cols-6 w-full h-auto bg-transparent p-0">
                {services.map((service, index) => (
                  <button
                    key={service.id}
                    onClick={() => handleTabClick(service.id, index)}
                    className={`text-center p-4 md:p-6 h-auto relative text-base md:text-lg lg:text-xl whitespace-pre-line leading-tight transition-all duration-300
  ${activeTab === service.id
    ? 'text-black font-medium border-r border-l border-gray-300 first:border-l first:rounded-l-lg last:rounded-r-lg'
    : 'text-gray-400 hover:text-gray-600'}
  `}

                    style={{ fontFamily: "Jomolhari, sans-serif" }}
                  >
                    <span className="block">{service.title}</span>
                  </button>
                ))}
              </div>
              
              {/* Sliding underline */}
              <div 
                className="absolute bottom-0 h-0.5 bg-red-600 transition-all duration-500 ease-out"
                style={{
                  width: `${100 / services.length}%`,
                  left: `${(activeIndex * 100) / services.length}%`,
                }}
              />
              
              {/* Bottom border */}
              <div className="absolute left-0 bottom-0 w-full h-px bg-gray-300 " />
            </div>
          </div>

          {/* Service Content */}
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`mt-0 ${activeTab === service.id ? 'block' : 'hidden'}`}
            >
              <div className="grid grid-cols-1 lg:w-9/12 mb-10 mx-auto lg:grid-cols-2 gap-8 items-start">
                {/* Text Content */}
                <div className="space-y-3">
                  <h2
                    className="text-3xl md:text-4xl  font-normal text-black leading-tight"
                    style={{ fontFamily: "Jomolhari, sans-serif" }}
                  >
                    {service.content.heading}
                  </h2>

                  <div className="w-24 md:w-32 h-1 bg-red-600"></div>

                  <p
                    className="text-lg md:text-xl  font-normal text-black leading-relaxed"
                    style={{ fontFamily: "Jomolhari, sans-serif" }}
                  >
                    {service.content.description}
                  </p>
                </div>

                {/* Image */}
                <div className="lg:order-last mx-auto">
                  <img
                    src={service.content.image}
                    alt={service.content.imageAlt}
                    className=" w-64 md:w-80 lg:w-96 object-cover bg-gray-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesSection() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[450px] overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          <img
            src="/Img/Service_Page_Header.jpg"
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
                Our Services
              </h1>
              <p
                className="text-white text-lg md:text-2xl font-normal leading-relaxed max-w-xl"
                style={{ fontFamily: "Jomolhari, sans-serif" }}
              >
                This is something that will let the user know we mean business
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Tabs */}
      <ServiceTabs />

      <div className="h-0.5 bg-gray-500/60 w-4/12 mx-auto mb-10"/>

      
    </div>
  );
}