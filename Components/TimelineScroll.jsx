'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TimelineScrollAnimation = () => {
  const timelineRef = useRef(null);
  const lineRef = useRef(null);

  const timelineData = [
    {
      year: "1971",
      title: "The Beginning",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna",
      image: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deac?w=500&h=300&fit=crop"
    },
    {
      year: "1980",
      title: "Expansion Era",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque,",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop"
    },
    {
      year: "2005",
      title: "Modern Development",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque, sit amet lacinia nisi sodales. Vestibulum id orci velit. Vivamus sollicitudin viverra ipsum, non gravida libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididun",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop"
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque.",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=300&fit=crop"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".timeline-item", { opacity: 0, y: 50 });
      gsap.set(".timeline-line", { scaleY: 0, transformOrigin: "top center" });
      gsap.set(".timeline-dot", { opacity: 0 });
      
      // Animate the timeline line and dot together
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom bottom",
          scrub: 1,
        }
      });
      
      tl.to(".timeline-line", {
        scaleY: 1,
        duration: 1,
        ease: "none",
      })
      .to(".timeline-dot", {
        opacity: 1,
        duration: 0.1,
        ease: "none",
      }, 0.1);

      // Animate each timeline item
      gsap.utils.toArray(".timeline-item").forEach((item, index) => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          }
        });

        // Animate the year number (from left)
        gsap.fromTo(item.querySelector(".year"), 
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Animate the content (from right)
        gsap.fromTo(item.querySelector(".content"), 
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Animate the image
        gsap.fromTo(item.querySelector(".timeline-image"), 
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto">
        <div ref={timelineRef} className="relative">
          {/* Timeline line positioned more to the left */}
          <div 
            ref={lineRef}
            className="timeline-line absolute left-36 lg:left-48 top-0 w-1 bg-red-500 h-full z-10"
          ></div>
          
          {/* Moving dot at the end of the line */}
          <div className="timeline-dot absolute left-36.5 lg:left-48.5 w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 z-20" 
               style={{top: '100%', marginTop: '-8px'}}></div>
          
          {/* Timeline items */}
          <div className="space-y-24">
            {timelineData.map((item, index) => (
              <div key={index} className="timeline-item relative">
                <div className="flex items-start">
                  {/* Year - Left Side of the line */}
                  <div className="year w-40 jomol text-right pr-14">
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-2">
                      {item.year}
                    </h2>
                  </div>
                  
                  {/* Content - Right Side of the line */}
                  <div className="content lg:ms-7 flex-1 pl-2 lg:pl-8">
                    <h3 className="text-2xl font-bold jomol text-gray-800 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 roboto text-lg leading-relaxed mb-6">
                      {item.description}
                    </p>
                    
                    {/* Image */}
                    <div className="timeline-image">
                      <img 
                        src={item.image} 
                        alt={`Timeline ${item.year}`}
                        className="w-full max-w-md h-48 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineScrollAnimation;