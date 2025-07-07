'use client'

import { useState, useRef, useEffect } from 'react';

export default function Careers() {
 

  const jobLocations = [
    "Wildland Firefighter - Springfield, OR",
    "Wildland Firefighter - Boise, ID",
    "Wildland Firefighter - Redmond, OR",
    "Wildland Firefighter - Ellensburg, WA",
  ];
  const [faqVisibility, setFaqVisibility] = useState({});
  
    
    const faqRefs = useRef([]);
  
 
  

  
    useEffect(() => {
      Object.keys(faqVisibility).forEach((key) => {
        if (faqVisibility[key]) {
          faqRefs.current[key].style.maxHeight = `${faqRefs.current[key].scrollHeight}px`;
        } else {
          faqRefs.current[key].style.maxHeight = "0px";
        }
      });
    }, [faqVisibility]);
  
    const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
    };
  
    const toggleFaq = (index) => {
      setFaqVisibility((prevState) => ({
        ...prevState,
        [index]: !prevState[index],
      }));
    };

  const faqs = [
    {
      question: "How Much do Wildland Firefighters make?",
      answer:
        "Starting Wage: $28.73 per hour plus $4.93 health and welfare for first 40 hours. Most crews earn between 20-50 hours of overtime a week which means more money on your paycheck!",
    },
    {
      question: "What training is provided?",
      answer:
        "We provide comprehensive training for all new firefighters. No experience is required as training is provided on-site.",
    },
    {
      question: "What equipment is provided?",
      answer:
        "We provide all your gear except boots and a personal bag. All safety equipment and tools are supplied by PatRick Corp.",
    },
    {
      question: "How long are deployment periods?",
      answer:
        "You can be gone 14-30 days at a time working 10-16 hour shifts. This varies based on fire conditions and crew needs.",
    },
    {
      question: "Do I need to be available year-round?",
      answer:
        "This is a call when needed position. You must be able to answer your phone quickly for dispatch and be available during fire season.",
    },
  ];

  

  return (
    <div className=" ">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-56 py-16 ">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-5xl jomol font-bold text-black leading-tight">
              Ready To Make a Difference?
            </h1>
            <p className="text-xl roboto lg:text-xl text-black leading-relaxed">
              It takes a special kind of person to go head to head with a raging
              forest fire! Exciting outdoor job includes travel, expenses, and
              an experience of a lifetime. No experience required, training
              provided. We provide all your gear except boots and a personal
              bag. Must be 18yrs old EEO Fill out online job application by
              clicking on the button below. Call us at: 1-800-782-4119
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg rounded-lg transition-colors duration-200 font-medium">
              View
            </button>
          </div>
          <div className="flex justify-center h-96">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fcf3eb36c953942aabcbb2405ca711ac1%2Fe44864085ed84b379c9a81a511c6f153?format=webp&width=800"
              alt="Wildland firefighter in action"
              className="w-full max-w-lg  rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-red-600 text-white py-16 jomol ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">About</h2>
          <p className="text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mb-12">
            PatRick Environmental Inc. dba PatRick Corp. was established in 1971
            by Rick Dice as a partner. In 1974, PatRick Corp. was incorporated.
            Rick Dice has held the position as President since that time. Today,
            PatRick Corp. continues to send emergency service crews and engines
            throughout the nation. PatRick Corp. is a leader in the private
            sector industry in both fire and fuels contracting. Rick Dice
            created PatRick's motto "Where experience and professionalism makes
            the difference, Since 1972". PatRick has continually requested
            higher standards and more compliance with existing agreements and or
            contracts. Today PatRick Corp. is a family run business with five
            offices and between 200-350 employees every year during fire season.
          </p>
          <button className="bg-white text-black border-2 border-white hover:bg-gray-100 px-8 py-3 text-lg rounded-lg transition-colors duration-200 font-medium">
            Apply Now
          </button>
        </div>
      </section>

      {/* Firefighters Needed Section */}
      <section className="container max-w-5xl mx-auto px-4 jomol py-16 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-8">
            Wildland Firefighters Needed
          </h2>
          <p className="text-xl  text-black leading-relaxed max-w-5xl mx-auto">
            We are excited to get the 2025 fire season underway. All bases will
            be hosting a REFRESHER training in January for returning
            firefighters who are ready and available to start fighting fire. If
            you qualify for those criteria, please fill out an application. For
            all other RETURNING firefighters, please wait until you are
            available to work before filling out an application. Applications
            are only valid for 60 days. For NEW potential firefighters, our
            basic training will begin at each base starting in January and
            continuing every month until fire season is over. You are welcome to
            check back for dates and fill out an application at that time.
            Again, applications are only valid for 60 days. We will not be
            scheduling interviews until that time. Look forward to expanding our
            PatRick family.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl lg:text-3xl font-bold text-black mb-6">
            Requirements:
          </h3>
          <div className="text-lg lg:text-xl text-black leading-relaxed space-y-2">
            <p>• All applicants must be 18+</p>
            <p>
              • This is a call when needed position. Must answer your phone asap
              for a dispatch!
            </p>
            <p>• Must be able to travel out of state.</p>
            <p>• Need to be located 2-3 hours from a base for dispatch.</p>
            <p>
              • Can be gone 14 - 30 days at a time working 10 - 16 hour shifts.
            </p>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4 mb-16 jomol">
          {jobLocations.map((location, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-between p-6">
                <h3 className="text-xl lg:text-2xl font-medium text-black">
                  {location}
                </h3>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <img
            src="/Img/Classroom.jpg"
            alt="New Crew learning fire saftey"
            className="w-full h-80 object-cover rounded-lg shadow-lg"
          />
          <img
            src="/Img/Redmond_Trucks.jpg"
            alt="Truck Lined up"
            className="w-full h-80 object-cover rounded-lg shadow-lg"
          />
          <img
            src="/Img/Redmond_Packing.jpg"
            alt="Crews packing in Redmond"
            className="w-full h-80 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Employee Experiences */}
      <section className="container mx-auto px-4 py-16 lg:py-24 jomol">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-12">
            Employee Experiences
          </h2>
          <div className="relative max-w-6xl mx-auto">
            <div className="text-red-600 text-8xl lg:text-9xl font-bold absolute -top-8 -left-4 lg:-left-8">
              "
            </div>
            <p className="text-2xl  text-black leading-relaxed italic px-8 lg:px-16">
              This is hands down my favorite job. I woke up every morning
              excited for the adventure that awaited me. We were always fed well
              and throughout our adventures through dense forests my coworkers
              and I bonded like brothers. I learned so many valuable lessons
              that I can apply to any aspect of my life.
            </p>
            <div className="text-red-600 text-8xl lg:text-9xl font-bold absolute -bottom-8 -right-4 lg:-right-8">
              "
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-5xl jomol mx-auto mt-10 mb-20">
        <h2 className="text-4xl font-bold mb-5">Frequently Asked Questions</h2>
        <div className="faq-section">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border-b pb-4">
              <button
                onClick={() => toggleFaq(index)}
                className="cursor-pointer font-semibold text-xl w-full text-left hover:text-[#E31131] transition-colors py-2"
              >
                {faq.question}
              </button>
              <div
                ref={(el) => (faqRefs.current[index] = el)}
                className="overflow-hidden transition-max-height duration-500 ease-in-out"
                style={{ maxHeight: faqVisibility[index] ? faqRefs.current[index]?.scrollHeight : 0 }}
              >
                <p className="mt-2 text-gray-700 text-lg p-4 rounded">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}