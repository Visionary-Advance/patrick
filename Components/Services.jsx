'use client'



import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';


export default function Services() {

      const services = [
    {
      image: "/Img/Flame.png",
      title: "Wildland Fire Fighting",
      description: "Trained crews fighting wildfires to protect land and homes."
    },
    {
      image: "/Img/Trees.png",
      title: "Brush Trimming",
      description: "Clearing brush to reduce wildfire risks and improve safety."
    },
    {
      image: "/Img/24_Hour.png",
      title: "Wildland Fire Fighting",
      description: "Fast-response teams ready for wildfires and natural disasters."
    },
    {
      image: "/Img/Consulting.png",
      title: "Consulting",
      description: "Expert advice for wildfire management and fuel reduction plans."
    },
    
  ];


  const cards = [
    {
      image: "/Img/Services_Pic.jpg",
      title: "Wildland Fire Fighting",
      description: "Trained crews fighting wildfires to protect land and homes."
    },
    {
      image: "/Img/Brush.jpg",
      title: "Brush Trimming",
      description: "Clearing brush to reduce wildfire risks and improve safety."
    },
    {
      image: "/Img/Consult_Img.JPG",
      title: "Consulting",
      description: "Expert advice for wildfire management and fuel plans."
    },
    {
      image: "/Img/Emergency.jpg",
      title: "Emergency Services",
      description: "Fast-response teams ready for wildfires and natural disasters."
    },
    {
      image: "/Img/Services_Pic.jpg",
      title: "Snow Removal",
      description: "Clearing snow to keep roads, lots, and properties safe in winter."
    },
    {
      image: "/Img/Services_Pic.jpg",
      title: "Video Pyrotechnics",
      description: "Safe, controlled fire effects for film, TV, and media projects."
    },
    
  ];

  


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
  return (
    <>
      <div className="max-w-[100rem] w-[90%] mx-auto mt-7">
        <h3 className="text-[#E32121] jomol text-4xl">Our Services</h3>
        <div className="bg-gray-400 h-0.5 w-12 mt-2  "></div>
        
        <p className="lg:w-1/3 my-2 roboto">
          Patrick Environmental specializes in wildfire suppression,
          brush removal, and land clearing. We help reduce fire risks with
          effective, eco-friendly solutions.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
            <div className="col-span-1">
                <img className=" " src="/Img/Services_Pic.jpg"/>
            </div>
           

             <div className="grid lg:mt-0 mt-5 lg:ms-10 grid-cols-1 md:grid-cols-2">
      {services.map((service, index) => (
        <div key={index} className="col-span-1">
          <img className="w-1/6" src={service.image} alt={service.title} />
          <h4 className="jomol text-[27px] my-1">{service.title}</h4>
          <p className="roboto w-10/12">{service.description}</p>
        </div>
      ))}
    </div>

        
        </div>

        {/* Services Card */}

    <div className="lg:grid-cols-3 grid gap-y-20 gap-x-10 md:grid-cols-2 grid-cols-1 mt-20 justify-items-center" ref={containerRef}>
  {cards.map((service, index) => (
    <Link key={index} href={"#"}>
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
            className="bg-[#E32121] absolute left-0 top-0 w-[3px]"
            style={{ height: '1px' }}
          ></div>
          <h4 className="jomol text-2xl">{service.title}</h4>
          <p className="roboto text-sm w-10/12">{service.description}</p>
        </div>
      </div>
    </Link>
  ))}
</div>
      </div>
    </>
  );
}
