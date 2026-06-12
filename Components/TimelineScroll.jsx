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
      image: "/Img/Grandpa.jpg"
    },
    {
      year: "1971",
      title: "First fire crew agreement with the Douglas Forest Protective Association",
      description: "DFPA",
      
    },
    {
      year: "1972",
      title: "Contract Prescribed Burning",
     
    },
    {
      year: "1973",
      title: "Springfield, OR Base/Office Opened",
      image:"/Img/Rick_and_Norma.JPG"
      
    },
    {
      year: "1988",
      title: "Oregon state fire suppression agreement with Oregon Department of Forestry ODF",
      image: "/Img/BlackButte.JPG"

    },
    {
      year: "1988",
      title: `Pyrotech fire in the Movie "Always" `,
      image: "/Img/Always.jpg"
    },
    {
      year: "1988",
      title: "Opened branch in Redmond, OR",
    },
    {
      year: "1988",
      title: "Concept of National Wildfire Suppression Association",
    },
    {
      year: "1990",
      title: "Created NWSA",
      image:"/Img/NWSA_Logo.jpg",
      description:'Rick Dice was involved in the creation of NWSA and later became President for 30 years.'
    },
    {
      year: "90's",
      title: "Rick Dice started meeting with congress about fire policies and contracts and continues today.",
      image:"/Img/Rick_in_Congress.JPG"
    },
    {
      year: "1992",
      title: "Moved to New Springfield Base",
      image:"/Img/Springfield_Office.jpg"
    },
    {
      year: "1996-2002",
      title: "Created the first 'Wildland Firefighter Magazine'",
      description: "Coined the word 'Wildland Firefighter'",
      image: "/Img/Wildland_Magazine.JPG"
    },
    {
      year: "2001",
      title: "Opened a base in Ellensburg, WA",
      image: "/Img/Ellensburg_Office.jpg"
    },
    {
      year: "2002",
      title: "Opened a base in Boise, ID",
      image: "/Img/Boise_Office.jpg"
    },
    {
      year: "2002",
      title: "Opened a base in Asheville, NC",
      image: "/Img/Asheville_Office.jpg"
    },
    {
      year: "2002",
      title: "First National Type 2IA Contract",
      description: "Rick Dice helped create",
      image: "/Img/National_2IA.JPG"
    },
    {
      year: "2003",
      title: "National Headquarters building built in Redmond, OR",
      image: "/Img/Redmond_Close.jpg"
    },
    {
      year: "2003",
      title: "Columbia Shuttle Recovery",
      image: "/Img/Columbia_Shuttle.JPG"
    },
    {
      year: "2004",
      title: "Rick Dice met with President Bush",
      image: "/Img/Rick_and_Bush.jpg"
    },
    {
      year: "2004",
      title: "First Hurricane Ivan Recovery and continues today when needed.",
      image: "/Img/Flood.jpg"
    },
    {
      year: "2017",
      title: "First Ice/Snow Storm Cleanup in Oregon",
      image: "/Img/Ice_Cleanup.JPG"
    },
    {
      year: "2020",
      title: "Growing and Improving",
      description: "We continue growing and keep improving with technology, equipment, safey, organization that apply to state and private fire agreements and prescribed fire contracts for crews, engines, tenders, chippers, mastication and excavator equipment",
      image:"/Img/Continue.JPG",
      motto: '"Where Experience and Professionalism Make the Difference" Since 1971.'

    },
    {
      year: "2023",
      title: "First International Crew to Canada ",
      image: "/Img/Canada.jpeg"
    },
    
    
  ];

  useEffect(() => {
    let ctx = null;

    const initializeTimeline = () => {
      ctx = gsap.context(() => {
        // Set initial states with smaller mobile transforms
        gsap.set(".timeline-item", { opacity: 0, y: 50 });
        gsap.set(".timeline-line", { scaleY: 0, transformOrigin: "top center" });
        gsap.set(".timeline-dot", { opacity: 0 });

        // Set initial states for year and content with smaller mobile transforms
        gsap.set(".year", { x: -15, opacity: 0 }); // Smaller initial offset
        gsap.set(".content", { x: 15, opacity: 0 }); // Smaller initial offset

        // Animate the timeline line and dot together
        // The line grows from top to bottom, with the bottom edge staying at 50vh (middle of screen)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 50%", // Start when timeline reaches middle of viewport
            end: "bottom bottom", // End when bottom of timeline reaches bottom of viewport - much longer scroll distance
            scrub: 2, // Increased scrub for smoother, slower growth
            invalidateOnRefresh: true, // Force recalculation on refresh
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
    };

    // Wait for all images to load
    const images = Array.from(timelineRef.current?.querySelectorAll('img') || []);
    const imageLoadPromises = images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve);
      });
    });

    // Wait for fonts and images, then initialize
    Promise.all([
      document.fonts.ready,
      ...imageLoadPromises
    ]).then(() => {
      // Add a small delay to ensure all layout calculations are complete
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initializeTimeline();
          ScrollTrigger.refresh();
        });
      });
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div className=" pt-10">
      <div className="container mx-auto px-4 py-5 overflow-hidden">
        <div ref={timelineRef} className="relative overflow-visible">
          {/* Timeline line - responsive positioning - initially hidden */}
          <div
            ref={lineRef}
            className="timeline-line absolute left-20 md:left-36 lg:left-40 top-0 w-1 bg-[#E84D2F] h-full z-10"
            style={{ transform: 'scaleY(0)', transformOrigin: 'top center' }}
          ></div>

          {/* Moving dot - responsive positioning - initially hidden */}
          <div className="timeline-dot absolute left-[5.12rem] md:left-36 lg:left-40.5 w-4 h-4 bg-[#E84D2F] rounded-full transform -translate-x-1/2 z-20 opacity-0"
               style={{top: '100%', marginTop: '-8px'}}></div>

          {/* Timeline items */}
          <div className="space-y-24">
            {timelineData.map((item, index) => (
              <div key={index} className="timeline-item relative opacity-0" style={{ transform: 'translateY(50px)' }}>
                <div className="flex items-start">
                  {/* Year - Left Side of the line - responsive width and padding - initially hidden */}
                  <div className="year w-24 md:w-40 jomol text-right pr-6 md:pr-14 opacity-0" style={{ transform: 'translateX(-15px)' }}>
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-800 mb-2">
                      {item.year}
                    </h2>
                  </div>

                  {/* Content - Right Side of the line - responsive spacing - initially hidden */}
                  <div className={`content flex-1 pl-2 md:pl-4 lg:pl-8 ${!item.image ? 'pb-16' : ''} opacity-0`} style={{ transform: 'translateX(15px)' }}>
                    <h3 className="text-xl md:text-2xl font-bold jomol text-gray-800 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 roboto text-base md:text-lg leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Image - responsive sizing - initially hidden */}
                    {item.image && (
                      <div className="timeline-image opacity-0" style={{ transform: 'scale(0.9)' }}>
                        <img
                          src={item.image}
                          alt={`Timeline ${item.year}`}
                          className="w-full max-w-xs md:max-w-sm h-full object-cover rounded-lg shadow-lg"
                        />
                      </div>
                    )}

                    {/* Motto - only for specific entries */}
                    {item.motto && (
                      <p className="text-gray-800 roboto text-base md:text-lg font-bold mt-4">
                        {item.motto}
                      </p>
                    )}
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