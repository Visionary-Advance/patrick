'use client'


import { useEffect, useRef, useState } from 'react';

export default function StatsGroup() {
  const statsRef = useRef([]);
  const linesRef = useRef([]);
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const stats = [
    {
      number: 52,
      suffix: "+",
      label: "Years Experience",
      type: "normal"
    },
    {
      number: 1,
      suffix: "M+",
      label: "Acres Fought",
      type: "normal"
    },
    {
      number: 300,
      suffix: "+",
      label: "Employees",
      type: "normal"
    },
    {
      number: 20,
      suffix: "+",
      label: "States Served",
      type: "normal"
    }
  ];

  const animateNumbers = () => {
    statsRef.current.forEach((el, index) => {
      if (el) {
        const targetNumber = stats[index].number;
        const suffix = stats[index].suffix;
        const type = stats[index].type;
        
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

    // Animate the red lines (loading bar effect)
    linesRef.current.forEach((line) => {
      if (line) {
        // Start with 1px width so the bar is visible from the beginning
        line.style.width = '1px';
        
        const lineDuration = 2000;
        const lineStartTime = Date.now();
        const targetWidth = 65;
        
        const animateLine = () => {
          const elapsed = Date.now() - lineStartTime;
          const progress = Math.min(elapsed / lineDuration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentWidth = 1 + ((targetWidth - 1) * easeOut); // Start from 1px, animate to 40px
          
          line.style.width = Math.floor(currentWidth) + 'px';
          
          if (progress < 1) {
            requestAnimationFrame(animateLine);
          } else {
            line.style.width = targetWidth + 'px';
          }
        };
        
        // Start line animation with a delay
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
    <div className="max-w-7xl mx-auto mt-10" ref={containerRef}>
      <div className="flex flex-col  sm:flex-row justify-between items-start gap-8">
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