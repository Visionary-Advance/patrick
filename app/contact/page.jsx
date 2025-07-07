'use client'

import Button from "@/Components/Button";
import ContactForm from "@/Components/ContactForm";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { FaPhoneAlt, FaArrowAltCircleDown } from "react-icons/fa";
import { IoMailOpen } from "react-icons/io5";

export default function Contact() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  

  const dropdownRef = useRef(null);


 
  useEffect(() => {
    if (isDropdownVisible) {
      dropdownRef.current.style.maxHeight = `${dropdownRef.current.scrollHeight}px`;
    } else {
      dropdownRef.current.style.maxHeight = "0px";
    }
  }, [isDropdownVisible]);

  
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };


   const offices = [
    {
      id: 1,
      name: "Redmond Office",
      image: "/Img/Redmond_Office.jpg",
      address: "1199 NE Hemlock Ave,<br/>Redmond, OR 97756",
      phone: "541-923-0703",
      imageRight: false
    },
    {
      id: 2,
      name: "Springfield Office", 
      image: "/Img/Springfield_Office.jpg",
      address: "1322 N 30th <br/> Springfield, OR 97478",
      phone: "541-746-7528",
      imageRight: true
    },
    {
      id: 3,
      name: "Boise Office",
      image: "/Img/Boise_Office.jpg", 
      address: "2049 W. Commerce Ave. <br/> Boise, ID 83705",
      phone: "208-376-2667",
      imageRight: false
    },
    {
      id: 4,
      name: "Ellensburg Office",
      image: "/Img/Ellensburg_Office.jpg",
      address: "1043 W. University Way <br/> Ellensburg, WA 98926", 
      phone: "509-925-1300",
      imageRight: true
    },
    {
      id: 5,
      name: "Leicester Office",
      image: "/Img/Asheville_Office.jpg",
      address: "3187 New Leicester Hwy <br/> Leicester, NC 28748",
      phone: "828-683-2182", 
      imageRight: false
    }
  ];
  

  return (
    <>
      {/* Hero Section Container - This wraps both the background and the cards */}
      <div className="relative">
        {/* Background Section */}
        <section className="relative h-96 md:h-[450px] overflow-hidden">
          {/* Background Images */}
          <div className="absolute inset-0">
            <img
              src="/Img/Contact_Header.jpg"
              alt="Fire suppression background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="relative z-10 h-full">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl pt-32">
                <h1
                  className="text-white text-3xl md:text-4xl font-normal mb-4 md:mb-2"
                  style={{ fontFamily: "Jomolhari, sans-serif" }}
                >
                  Contact Us
                </h1>
                <p
                  className="text-white text-lg md:text-2xl font-normal leading-relaxed max-w-xl"
                  style={{ fontFamily: "Jomolhari, sans-serif" }}
                >
                  Get in touch with us with any questions or comments
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section - Positioned absolutely relative to the container */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-10/12 lg:translate-y-1/2 w-4/5 z-20">
          <div className="grid gap-y-3 lg:grid-cols-2 grid-cols-1 gap-x-6">
            {/* CARD 1 */}
            <div className="bg-white shadow-xl grid grid-cols-1 rounded-md relative">
              <div className="text-center py-8">
                <h2 className="flex justify-center pb-3 text-4xl">
                  <FaPhoneAlt />
                </h2>
                <h2 className="text-md font-bold">Give Us a Call</h2>
              </div>
              <div className="text-center pb-10 mx-5 underline">
                <a className="text-lg" href="tel:+1-5419230703">
                  541-923-0703
                </a>
              </div>
              <div className="mb-3 mx-auto">
                <Link href={"tel:541-923-0703"}>
                <Button text={"Call Now"} color={"bg-[#E32121] text-white px-5"}/>
                </Link>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-white shadow-xl grid grid-cols-1 rounded-md relative">
              <div className="text-center py-8">
                <h2 className="flex justify-center pb-3 text-4xl">
                  <IoMailOpen />
                </h2>
                <h2 className="text-md font-bold">Email Us</h2>
              </div>
              <div className="text-center underline pb-10 mx-5">
                <Link href={"mailto:info@patrickfire.com"} >
                <p className="text-lg">Info@patrickfire.com</p>
                </Link>
              </div>
              <div className="text-center mb-3 underline">
                <button className="text-2xl" onClick={toggleDropdown}>
                  <FaArrowAltCircleDown />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to account for the overlapping cards */}
      <div className="mt-[450px] lg:mt-36"></div>

      {/* Dropdown Section */}
      <div
        ref={dropdownRef}
        className="overflow-hidden  duration-500 ease-in-out"
        style={{ maxHeight: isDropdownVisible ? dropdownRef.current?.scrollHeight : 0 }}
      >
        <div className="w-full mx-auto p-4 bg-white rounded shadow-lg">
         <ContactForm />
        </div>
      </div>

      {/* Offices Section */}
       <div>
      {offices.map((office, index) => (
        <div 
          key={office.id}
          className={`w-4/5 lg:w-7/12 grid grid-cols-1 lg:grid-cols-2 mx-auto mt-10 ${
            index === offices.length - 1 ? 'mb-20' : 'mb-10'
          }`}
        >
          {/* Image */}
          <div className={office.imageRight ? 'lg:order-2' : ''}>
            <img 
              className={office.imageRight ? 'lg:ms-4' : ''} 
              src={office.image} 
              alt={office.name} 
            />
          </div>
          
          {/* Content */}
          <div className={`lg:ms-4 col-span-1 ${office.imageRight ? 'text-right' : ''}`}>
            <h3 className="jomol lg:text-4xl text-3xl text-black">
              {office.name}
            </h3>
            <p 
              className="jomol mt-3 lg:text-xl text-lg text-black"
              dangerouslySetInnerHTML={{ __html: office.address }}
            />
            <p className="jomol mt-3 lg:text-xl text-lg text-black">
              Phone: <Link href={`tel:${office.phone}`}>{office.phone}</Link>
            </p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}