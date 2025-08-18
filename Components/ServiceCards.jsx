'use client'

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { servicesData } from '@/lib/servicesData';

export default function ServiceCards(){

const cards = servicesData.map(service => ({
  image: service.content.image,
  title: service.shortTitle,
  shortDesc: service.shortDesc,
  id: service.id
}));

  const bordersRef = useRef([]);
    const containerRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);
  
    
  
    const animateBorders = () => {
      bordersRef.current.forEach((border) => {
        if (border) {
          // Start with 1px height so the border is visible from the beginning
          border.style.height = '1px';
          
          const duration = 2000;
          const startTime = Date.now();
          const targetHeight = border.parentElement.offsetHeight; // Full height of the card
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentHeight = 1 + ((targetHeight - 1) * easeOut);
            
            border.style.height = Math.floor(currentHeight) + 'px';
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              border.style.height = targetHeight + 'px';
            }
          };
          
          // Start with a small delay for staggered effect
          setTimeout(() => {
            animate();
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
              animateBorders();
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
    
    return(
        <>
        <div className="lg:grid-cols-3 grid gap-y-20 gap-x-10 md:grid-cols-2 grid-cols-1 mt-20 justify-items-center" ref={containerRef}>
  {cards.map((service, index) => (
    <Link key={index} href={`/services/${service.id}`}>
      <div className="w-full max-w-[500px] aspect-[500/380] col-span-1 relative">
        <div className='overflow-hidden w-full h-full'>
          <img 
            className="w-full h-full hover:scale-110 object-cover transition-transform duration-700 ease-out" 
            src={service.image} 
            alt={service.title} 
          />
        </div>
        <div className="bg-white p-4 left-1/2 -translate-x-1/2 absolute w-10/12 lg:w-8/12 -bottom-7 shadow-black shadow">
          <div 
            ref={el => bordersRef.current[index] = el}
            className="bg-[#E84D2F] absolute left-0 top-0 w-[3px]"
            style={{ height: '1px' }}
          ></div>
          <h4 className="jomol text-2xl">{service.title}</h4>
          <p className="roboto text-sm w-10/12">{service.shortDesc}</p>
        </div>
      </div>
    </Link>
  ))}
</div>
        </>
    );
}