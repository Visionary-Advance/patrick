// Components/ServicesSection.js
'use client'

import { useState } from "react";

function ServiceTabs({ services }) {
  const [activeTab, setActiveTab] = useState(services[0]?.id || "");
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (serviceId, index) => {
    setActiveTab(serviceId);
    setActiveIndex(index);
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4">
        <div className="w-full">
          {/* Service Navigation */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-full max-w-6xl">
              <div className="grid grid-cols-2 md:grid-cols-6 w-full h-auto bg-transparent p-0">
                {services.map((service, index) => (
                  <button
                    key={service.id}
                    onClick={() => handleTabClick(service.id, index)}
                    className={`text-center p-4 md:p-6 h-auto relative text-base md:text-lg lg:text-xl whitespace-pre-line leading-tight transition-all duration-300
                      ${activeTab === service.id
                        ? 'text-black font-medium border-r border-l border-gray-300 first:border-l first:rounded-l-lg last:rounded-r-lg'
                        : 'text-gray-400 hover:text-gray-600'}`}
                    style={{ fontFamily: "Jomolhari, sans-serif" }}
                  >
                    <span className="block">{service.title}</span>
                  </button>
                ))}
              </div>
              
              <div 
                className="absolute bottom-0 h-0.5 bg-red-600 transition-all duration-500 ease-out"
                style={{
                  width: `${100 / services.length}%`,
                  left: `${(activeIndex * 100) / services.length}%`,
                }}
              />
              
              <div className="absolute left-0 bottom-0 w-full h-px bg-gray-300" />
            </div>
          </div>

          {/* Service Content */}
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`mt-0 ${activeTab === service.id ? 'block' : 'hidden'}`}
            >
              <div className="grid grid-cols-1 lg:w-9/12 mb-10 mx-auto lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-3">
                  <h2
                    className="text-3xl md:text-4xl font-normal text-black leading-tight"
                    style={{ fontFamily: "Jomolhari, sans-serif" }}
                  >
                    {service.shortTitle}
                  </h2>

                  <div className="w-24 md:w-32 h-1 bg-red-600"></div>

                  <p
                    className="text-lg md:text-xl font-normal text-black leading-relaxed"
                    style={{ fontFamily: "Jomolhari, sans-serif" }}
                  >
                    {service.fullDescription}
                  </p>
                </div>

                <div className="lg:order-last mx-auto">
                  <img
                    src={service.heroImage}
                    alt={service.shortTitle}
                    className="w-64 md:w-80 lg:w-96 object-cover bg-gray-300"
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

export default function ServicesSection({ services }) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[450px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Img/Service_Page_Header.jpg"
            alt="Fire suppression background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 h-full">
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
                Professional services you can trust
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceTabs services={services} />
      <div className="h-0.5 bg-gray-500/60 w-4/12 mx-auto mb-10"/>
    </div>
  );
}