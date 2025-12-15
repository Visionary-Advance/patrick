// File: /app/services/[id]/page.js
'use client'

import { servicesData } from '@/lib/servicesData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState, useRef, use } from 'react';
import FirstSteps from '@/Components/FirstSteps';

function ServiceStats({ stats }) {
  const statsRef = useRef([]);
  const linesRef = useRef([]);
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const animateNumbers = () => {
    statsRef.current.forEach((el, index) => {
      if (el) {
        const targetNumber = stats[index].number;
        const suffix = stats[index].suffix;
        
        const counter = { value: 0 };
        const animDuration = 2000;
        const animStartTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - animStartTime;
          const progress = Math.min(elapsed / animDuration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          counter.value = Math.floor(targetNumber * easeOut);
          
          el.textContent = counter.value + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = targetNumber + suffix;
          }
        };
        
        animate();
      }
    });

    // Animate the red lines
    linesRef.current.forEach((line) => {
      if (line) {
        line.style.width = '1px';
        
        const lineDuration = 2000;
        const lineStartTime = Date.now();
        const targetWidth = 65;
        
        const animateLine = () => {
          const elapsed = Date.now() - lineStartTime;
          const progress = Math.min(elapsed / lineDuration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentWidth = 1 + ((targetWidth - 1) * easeOut);
          
          line.style.width = Math.floor(currentWidth) + 'px';
          
          if (progress < 1) {
            requestAnimationFrame(animateLine);
          } else {
            line.style.width = targetWidth + 'px';
          }
        };
        
        setTimeout(() => {
          animateLine();
        }, 10);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateNumbers();
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div className="max-w-7xl mx-auto mt-16 mb-16" ref={containerRef}>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="text-left">
              <h3 
                ref={el => statsRef.current[index] = el}
                className="text-[#E32121] text-5xl jomol"
              >
                0{stat.suffix}
              </h3>
              <p className="jomol -mt-1">{stat.label}</p>
              <div 
                ref={el => linesRef.current[index] = el}
                className="bg-[#E32121] h-0.5"
                style={{ width: '1px', minHeight: '2px' }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServicePage({ params }) {
  const resolvedParams = use(params);
  const service = servicesData.find(s => s.id === resolvedParams.id);
  const currentIndex = servicesData.findIndex(s => s.id === resolvedParams.id);
  const tabsContainerRef = useRef(null);
  const underlineRef = useRef(null);

  if (!service) {
    notFound();
  }

  // Update sliding underline position
  const updateUnderlinePosition = () => {
    if (tabsContainerRef.current && underlineRef.current) {
      const activeTab = tabsContainerRef.current.children[currentIndex];
      if (activeTab) {
        const tabRect = activeTab.getBoundingClientRect();
        const containerRect = tabsContainerRef.current.getBoundingClientRect();

        // Calculate position relative to container
        const leftPosition = activeTab.offsetLeft;
        const width = tabRect.width;

        underlineRef.current.style.width = `${width}px`;
        underlineRef.current.style.transform = `translateX(${leftPosition}px)`;
      }
    }
  };

  // Auto-scroll active tab into view on mobile and update underline
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeTab = tabsContainerRef.current.children[currentIndex];
      if (activeTab && window.innerWidth < 768) {
        activeTab.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }

    // Small delay to ensure DOM is ready
    setTimeout(updateUnderlinePosition, 50);
  }, [currentIndex]);

  // Update underline on window resize
  useEffect(() => {
    updateUnderlinePosition();

    const handleResize = () => {
      updateUnderlinePosition();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

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
                Take a look at how we can best serve your needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Tabs */}
      <section className="bg-white ">
        <div className="container mx-auto px-4">
          <div className="w-full">
            {/* Service Navigation */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-full max-w-6xl">
                {/* Tab buttons container - Horizontal scroll on mobile, grid on desktop */}
                <div ref={tabsContainerRef} className="md:grid md:grid-cols-6 flex overflow-x-auto scrollbar-hide w-full h-auto bg-transparent p-0 snap-x snap-mandatory relative border-b border-gray-300">
                  {servicesData.map((serviceItem, index) => (
                    <Link
                      key={serviceItem.id}
                      href={`/services/${serviceItem.id}`}
                      className={`flex items-center justify-center p-4 md:p-6 h-auto relative text-base md:text-lg lg:text-xl whitespace-pre-line leading-tight transition-all duration-300 flex-shrink-0 min-w-[140px] md:min-w-0 snap-start
        ${service.id === serviceItem.id
          ? 'text-black font-medium border-r border-l border-gray-300 md:first:border-l md:first:rounded-l-lg md:last:rounded-r-lg'
          : 'text-gray-400 hover:text-gray-600'}
        `}
                      style={{ fontFamily: "Jomolhari, sans-serif" }}
                    >
                      <span className="text-center block">{serviceItem.title}</span>
                    </Link>
                  ))}

                  {/* Single sliding underline */}
                  <div
                    ref={underlineRef}
                    className="absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-500 ease-out"
                    style={{ width: '0px', transform: 'translateX(0px)' }}
                  />
                </div>
              </div>
            </div>

            {/* Service Content */}
            <div className="mt-0">
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
          </div>
        </div>
      </section>
<div className="h-0.5 bg-gray-500/60 w-4/12 mx-auto mb-2"/>
      {/* Service-specific Stats */}
      {service.stats && (
        <section className=" py-2">
          <div className="container mx-auto px-4">
            <ServiceStats stats={service.stats} />
          </div>
        </section>
      )}

      <FirstSteps />
    </div>
  );
}