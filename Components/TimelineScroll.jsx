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
      title: "PatRick Was Created",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna",
      image: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deac?w=500&h=300&fit=crop"
    },
    {
      year: "1975",
      title: "Contract Prescribed Burning",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque,",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop"
    },
    {
      year: "1980",
      title: "OR State Agreement",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque, sit amet lacinia nisi sodales. Vestibulum id orci velit. Vivamus sollicitudin viverra ipsum, non gravida libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididun",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop"
    },
    {
      year: "1989",
      title: "Pyrotech fire in Movie Always",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque.",
      image: "/Img/Always.jpg"
    },
    {
      year: "1991",
      title: "Creation of NWSA",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque.",
      image: "/Img/NWSA_Logo.jpg"
    },
    {
      year: "1993",
      title: "Water Handling Agreement",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque.",
      image: "/Img/NWSA_Logo.jpg"
    },
    {
      year: "1995",
      title: "National Contract",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque.",
      image: "/Img/NWSA_Logo.jpg"
    },
    {
      year: "1999",
      title: "Moved Headquarters to Redmond Built Headquarters Building",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque.",
      image: "/Img/NWSA_Logo.jpg"
    },
    {
      year: "1999",
      title: "Shuttle Investigation",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque.",
      image: "/Img/NWSA_Logo.jpg"
    },
    {
      year: "1999",
      title: "Shuttle investigation",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque.",
      image: "/Img/NWSA_Logo.jpg"
    },
    {
      year: "2003",
      title: "Rick met with President Bush",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque.",
      image: "/Img/NWSA_Logo.jpg"
    },
    {
      year: "2003",
      title: "Opened More Bases",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque.",
      image: "/Img/NWSA_Logo.jpg"
    },
    {
      year: "2003",
      title: "WA State Agreement",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque.",
      image: "/Img/NWSA_Logo.jpg"
    },
    {
      year: "2003",
      title: "First Hurricane Recovery",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque.",
      image: "/Img/NWSA_Logo.jpg"
    },
    {
      year: "2003",
      title: "Chippers and Mastication",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque.",
      image: "/Img/NWSA_Logo.jpg"
    },
    {
      year: "2003",
      title: "Idaho State agreement",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque.",
      image: "/Img/NWSA_Logo.jpg"
    },
    {
      year: "2003",
      title: "Rick Meets with Congress",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque.",
      image: "/Img/NWSA_Logo.jpg"
    },
    {
      year: "2003",
      title: "NC Flooding Rehab",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque.",
      image: "/Img/NWSA_Logo.jpg"
    },
    {
      year: "2025",
      title: "First time out of country firefighting - Canada",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque vehicula felis euismod arcu scelerisque.",
      image: "/Img/Canada.jpeg"
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states with smaller mobile transforms
      gsap.set(".timeline-item", { opacity: 0, y: 50 });
      gsap.set(".timeline-line", { scaleY: 0, transformOrigin: "top center" });
      gsap.set(".timeline-dot", { opacity: 0 });
      
      // Set initial states for year and content with smaller mobile transforms
      gsap.set(".year", { x: -15, opacity: 0 }); // Smaller initial offset
      gsap.set(".content", { x: 15, opacity: 0 }); // Smaller initial offset
      
      // Animate the timeline line and dot together
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 60%",
          end: "bottom 80%", // Changed from "bottom bottom" to give more space
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

        // Animate the year number with smaller transform
        gsap.to(item.querySelector(".year"), {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        });

        // Animate the content with smaller transform
        gsap.to(item.querySelector(".content"), {
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
        });

        // Animate the image
        gsap.fromTo(item.querySelector(".timeline-image"), 
          { scale: 0.9, opacity: 0 }, // Smaller scale change
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
    <div className=" pt-10">
      <div className="container mx-auto px-4 py-5 overflow-hidden">
        <div ref={timelineRef} className="relative overflow-visible">
          {/* Timeline line - responsive positioning */}
          <div 
            ref={lineRef}
            className="timeline-line absolute left-20 md:left-36 lg:left-40 top-0 w-1 bg-[#E84D2F] h-full z-10"
          ></div>
          
          {/* Moving dot - responsive positioning */}
          <div className="timeline-dot absolute left-20.5 md:left-36 lg:left-40.5 w-4 h-4 bg-[#E84D2F] rounded-full transform -translate-x-1/2 z-20" 
               style={{top: '100%', marginTop: '-8px'}}></div>
          
          {/* Timeline items */}
          <div className="space-y-24">
            {timelineData.map((item, index) => (
              <div key={index} className="timeline-item relative">
                <div className="flex items-start">
                  {/* Year - Left Side of the line - responsive width and padding */}
                  <div className="year w-24 md:w-40 jomol text-right pr-6 md:pr-14">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-800 mb-2">
                      {item.year}
                    </h2>
                  </div>
                  
                  {/* Content - Right Side of the line - responsive spacing */}
                  <div className="content flex-1 pl-2 md:pl-4 lg:pl-8">
                    <h3 className="text-xl md:text-2xl font-bold jomol text-gray-800 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 roboto text-base md:text-lg leading-relaxed mb-6">
                      {item.description}
                    </p>
                    
                    {/* Image - responsive sizing */}
                    <div className="timeline-image">
                      <img 
                        src={item.image} 
                        alt={`Timeline ${item.year}`}
                        className="w-full max-w-xs md:max-w-sm h-36 md:h-48 object-cover rounded-lg shadow-lg"
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