'use client'

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Careers() {

  const faqs = [
    {
      question: "How Much do Wildland Firefighters make?",
      answer:
        "Starting Pay: $33.00–$40.00/hour (includes $4.93 Health & Welfare for first 40 regular hours; H/W is not paid on OT). Most crews earn between 20-50+ hours of overtime a week which means more money on your paycheck!",
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

  const toggleFaq = (index) => {
    setFaqVisibility((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative container mx-auto px-4 pt-36 lg:pt-56 py-16 ">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-5xl jomol font-bold text-black leading-tight">
              Ready To Make a Difference?
            </h1>
            <p className="text-xl roboto lg:text-xl text-black leading-relaxed">
              It takes a special kind of person to go head to head with a raging
              forest fire! Exciting outdoor job includes travel, expenses, and
              an experience of a lifetime. No experience required, training
              provided. We provide all your gear except boots, gloves and a sleeping bag. Must be 18yrs old. EEO. For more information about this position, please review the hiring details below before selecting the “Apply Now” button. A resume and relevant certifications are required to complete your application.
            </p>
             
          </div>
          <div className="flex justify-center h-96">
            <img
              src="/Img/Difference.jpg"
              alt="Wildland firefighter in action"
              className="w-full max-w-lg object-fill rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-[#E84D2F] text-white py-16 jomol ">
        <div className="container mx-auto px-4 lg:text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">About</h2>
          <p className="text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mb-12">
            PatRick Environmental Inc. dba PatRick Corp. was established in 1971
            by Rick Dice as a partner. In 1974, PatRick Corp. was incorporated.
            Rick Dice has held the position as President since that time. Today,
            PatRick Corp. continues to send emergency service crews and engines
            throughout the nation. PatRick Corp. is a leader in the private
            sector industry in both fire and fuels contracting. Rick Dice
            created PatRick's motto "Where experience and professionalism make
            the difference" Since 1972. PatRick has continually requested
            higher standards and more compliance with existing agreements and or
            contracts. Today PatRick Corp. is a family run business with five
            offices and between 300-400 employees every year during fire season.
          </p>
          
        </div>
      </section>

      {/* Firefighters Needed Section */}
      <section className="relative jomol py-16 lg:py-24">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle flame shapes on the sides */}
          <svg className="absolute -left-16 top-20 w-64 h-64 opacity-[0.04]" viewBox="0 0 200 200" fill="#E84D2F">
            <path d="M100 10 C100 10 140 60 140 110 C140 140 122 170 100 170 C78 170 60 140 60 110 C60 60 100 10 100 10Z" />
            <path d="M100 50 C100 50 120 80 120 110 C120 130 112 145 100 145 C88 145 80 130 80 110 C80 80 100 50 100 50Z" fill="#FF6B35" />
          </svg>
          <svg className="absolute -right-12 top-[600px] w-48 h-48 opacity-[0.04]" viewBox="0 0 200 200" fill="#E84D2F">
            <path d="M100 10 C100 10 150 70 150 120 C150 155 128 180 100 180 C72 180 50 155 50 120 C50 70 100 10 100 10Z" />
          </svg>
          <svg className="absolute -left-8 top-[1200px] w-40 h-40 opacity-[0.04]" viewBox="0 0 200 200" fill="#E84D2F">
            <path d="M100 20 C100 20 145 75 145 115 C145 148 125 170 100 170 C75 170 55 148 55 115 C55 75 100 20 100 20Z" />
          </svg>
          <svg className="absolute -right-16 top-[1900px] w-56 h-56 opacity-[0.04]" viewBox="0 0 200 200" fill="#E84D2F">
            <path d="M100 10 C100 10 140 60 140 110 C140 140 122 170 100 170 C78 170 60 140 60 110 C60 60 100 10 100 10Z" />
          </svg>
          {/* Scattered ember dots */}
          <div className="absolute top-32 right-24 w-2 h-2 rounded-full bg-[#E84D2F] opacity-10"></div>
          <div className="absolute top-64 left-16 w-3 h-3 rounded-full bg-orange-400 opacity-10"></div>
          <div className="absolute top-[500px] right-32 w-2.5 h-2.5 rounded-full bg-[#E84D2F] opacity-10"></div>
          <div className="absolute top-[800px] left-24 w-2 h-2 rounded-full bg-orange-500 opacity-10"></div>
          <div className="absolute top-[1100px] right-20 w-3 h-3 rounded-full bg-[#E84D2F] opacity-10"></div>
          <div className="absolute top-[1500px] left-12 w-2 h-2 rounded-full bg-orange-400 opacity-10"></div>
          <div className="absolute top-[1800px] right-16 w-2 h-2 rounded-full bg-[#E84D2F] opacity-10"></div>
          {/* Thin decorative line accents */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#E84D2F]/5 to-transparent"></div>
        </div>

        <div className="container max-w-5xl mx-auto px-4">
        <div className="lg:text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-8 leading-tight">
            Wildland Firefighters – Now Hiring for the 2026 Fire Season
          </h2>
          <div className="inline-block bg-gradient-to-r from-[#E84D2F]/10 to-orange-100 rounded-lg px-6 py-4 mb-6">
            <p className="text-2xl lg:text-3xl font-bold text-[#E84D2F]">
              Starting Pay: $33.00–$40.00/hour
            </p>
            <p className="text-sm lg:text-base font-normal text-gray-600 mt-1">(includes $4.93 Health &amp; Welfare first 40 Reg Hrs. H/W is not paid on OT)</p>
          </div>
          <p className="text-xl font-semibold text-[#E84D2F] max-w-5xl mx-auto mb-4 uppercase tracking-wide">
            No experience required
          </p>
          <p className="text-xl text-black leading-relaxed max-w-5xl mx-auto">
            If you enjoy the outdoors, thrive in physically demanding environments, and want to be part of something
            meaningful, this is your opportunity.
          </p>
          <p className="text-xl text-black leading-relaxed max-w-5xl mx-auto mt-4">
            At PatRick Environmental, you&apos;ll join a dedicated team that travels nationwide to help protect communities,
            wildlife, and natural resources from wildfires.
          </p>
        </div>

        {/* What to Expect & Why Join - Side by Side */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="relative bg-white border border-gray-200 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E84D2F] to-orange-400 rounded-t-lg"></div>
            <h3 className="text-2xl lg:text-3xl font-bold text-black mb-6">
              What to Expect
            </h3>
            <div className="text-lg text-black leading-relaxed space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-[#E84D2F] mt-1 shrink-0">&#9650;</span>
                <p>Travel across the U.S. for 14–30 days at a time</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#E84D2F] mt-1 shrink-0">&#9650;</span>
                <p>Work 10–16 hour shifts in the field</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#E84D2F] mt-1 shrink-0">&#9650;</span>
                <p>Earn significant overtime (20–50+ hours/week)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#E84D2F] mt-1 shrink-0">&#9650;</span>
                <p>Take on challenging, rewarding work with real impact</p>
              </div>
            </div>
          </div>

          <div className="relative bg-white border border-gray-200 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-[#E84D2F] rounded-t-lg"></div>
            <h3 className="text-2xl lg:text-3xl font-bold text-black mb-6">
              Why Join Our Team
            </h3>
            <div className="text-lg text-black leading-relaxed space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-[#E84D2F] mt-1 shrink-0">&#9650;</span>
                <p>Competitive pay with strong overtime opportunities</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#E84D2F] mt-1 shrink-0">&#9650;</span>
                <p>Hands-on training and career-building experience</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#E84D2F] mt-1 shrink-0">&#9650;</span>
                <p>Work that directly supports communities and the environment</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#E84D2F] mt-1 shrink-0">&#9650;</span>
                <p>Be part of a respected, experienced firefighting organization</p>
              </div>
            </div>
          </div>
        </div>

        {/* What We're Looking For */}
        <div className="mb-12 relative bg-black text-white rounded-lg p-8 lg:p-10 shadow-xl">
          <div className="absolute top-4 right-4 opacity-10">
            <svg className="w-24 h-24" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 5 C50 5 75 35 75 55 C75 72 64 85 50 85 C36 85 25 72 25 55 C25 35 50 5 50 5Z" />
            </svg>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold mb-6">
            What We&apos;re Looking For
          </h3>
          <div className="text-lg lg:text-xl leading-relaxed space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-[#E84D2F] mt-1 shrink-0">&#9654;</span>
              <p>Physically fit individuals ready for demanding outdoor work</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#E84D2F] mt-1 shrink-0">&#9654;</span>
              <p>Ability to hike long distances, lift, dig, and work in hot, smoky conditions</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#E84D2F] mt-1 shrink-0">&#9654;</span>
              <p>Must be 18+ to deploy on fires</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#E84D2F] mt-1 shrink-0">&#9654;</span>
              <p>Willingness to travel and respond quickly to dispatch calls</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#E84D2F] mt-1 shrink-0">&#9654;</span>
              <p>Must live within 2 hours of one of our bases</p>
            </div>
          </div>
        </div>

        {/* Important Safety Consideration */}
        <div className="mb-12 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
          <h3 className="text-2xl lg:text-3xl font-bold text-black mb-4">
            Important Safety Consideration
          </h3>
          <div className="text-lg lg:text-xl text-black leading-relaxed space-y-3">
            <p>
              Due to the nature of this work, individuals with severe allergies (such as bee
              stings) or asthma or respiratory conditions that may be aggravated by smoke should
              carefully consider whether this role is appropriate.
            </p>
            <p>
              Wildland firefighting often takes place in remote areas, sometimes miles from immediate
              medical assistance. Your safety is our top priority, and this work may pose significant risks for
              those with these conditions.
            </p>
          </div>
        </div>

        {/* Important Application Information */}
        <div className="mb-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-black mb-6">
            Important Application Information
          </h3>
          <div className="text-lg lg:text-xl text-black leading-relaxed space-y-4">
            <p className="font-semibold">Applicants:</p>
            <p>
              Please wait until you are available to work before submitting your application. Applications for both rehires
              and new hires are valid for 60 days only.
            </p>
            <p>
              Basic training will begin in the spring, with start dates varying by location. Each base will schedule training
              based on operational needs.
            </p>
          </div>
        </div>

        {/* PDF Certificate Help */}
        <div className="mb-12 bg-yellow-50 border border-yellow-300 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-yellow-600 text-2xl shrink-0">&#9888;</span>
            <h3 className="text-xl lg:text-2xl font-bold text-black">
              Having trouble uploading your IS-100 or IS-700 certificate?
            </h3>
          </div>
          <p className="text-gray-800 mb-4">
            Many applicants run into issues because their certificate file is labeled <strong>.pdf</strong> but was not saved as a true PDF document. Here is how to make sure your certificate uploads correctly:
          </p>
          <div className="space-y-3 text-gray-800">
            <div className="flex items-start gap-2">
              <span className="text-[#E84D2F] font-bold shrink-0">1.</span>
              <p><strong>After completing your IS-100 or IS-700 course</strong>, go to the certificate page and look for a <strong>&ldquo;Download Certificate&rdquo;</strong> or <strong>&ldquo;Save as PDF&rdquo;</strong> button — do not use your browser&apos;s Print function.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#E84D2F] font-bold shrink-0">2.</span>
              <p><strong>If you only see a &ldquo;Print&rdquo; option</strong>, choose <strong>Print &rarr; Save as PDF</strong> (not a physical printer). On Chrome/Edge, select &ldquo;Save as PDF&rdquo; as the destination.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#E84D2F] font-bold shrink-0">3.</span>
              <p><strong>Do not rename a .jpg or screenshot file to .pdf.</strong> Files must be actual PDF documents, not images with a renamed extension.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#E84D2F] font-bold shrink-0">4.</span>
              <p><strong>To verify your file is a real PDF</strong>: open it — if it displays in a PDF viewer (like Adobe Acrobat or your browser&apos;s PDF viewer) and shows proper certificate text, it is valid.</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700 text-sm">
            If you are still having trouble, try completing your course through{' '}
            <a href="https://www.safetyunlimited.com" target="_blank" rel="noopener noreferrer" className="text-[#E84D2F] underline font-semibold hover:text-red-700">
              Safety Unlimited
            </a>
            {' '}and download the certificate directly from their platform.
          </p>
        </div>

        {/* Apply Today */}
        <div className="mb-12 relative">
          <div className="text-center mb-8">
            <h3 className="text-4xl lg:text-6xl font-bold text-black">
              Apply <span className="text-[#E84D2F]">Today</span>
            </h3>
            <div className="mt-3 mx-auto w-24 h-1 bg-gradient-to-r from-[#E84D2F] to-orange-400 rounded-full"></div>
          </div>
          <div className="text-lg lg:text-xl text-black leading-relaxed space-y-4">
            <p>Click the link below to get started. During the application process, you will need to:</p>
            <div className="space-y-2 ml-2">
              <p>• Upload your resume – <strong className="text-[#E84D2F]">Mandatory to apply</strong></p>
              <p>• Submit IS-100 and IS-700 certificates (PDF format) – <strong className="text-[#E84D2F]">Mandatory to apply</strong></p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mt-4">
              <p className="font-semibold text-blue-900 mb-2">Free ICS Course Alternative</p>
              <p className="text-gray-800">
                We have identified a potential alternative to the FEMA site for required coursework.{' '}
                <strong>Safety Unlimited</strong> offers free online ICS-100 and ICS-700 classes.
              </p>
              <p className="text-gray-800 mt-2">To enroll, students will need to:</p>
              <div className="space-y-1 ml-2 mt-1">
                <p className="text-gray-800">• Create an account</p>
                <p className="text-gray-800">• Set up a username and password</p>
                <p className="text-gray-800">• Register for the courses</p>
              </div>
              <p className="mt-3 text-gray-800">
                The process is very similar to FEMA&apos;s system and is simple to complete.
                You can access the courses here:{' '}
                <a href="https://www.safetyunlimited.com" target="_blank" rel="noopener noreferrer" className="text-[#E84D2F] font-semibold underline hover:text-red-700 transition-colors">
                  www.safetyunlimited.com
                </a>
              </p>
            </div>
            <p>
              Once your application is received, our team will review it and contact you to schedule an interview.
            </p>
          </div>
        </div>

        {/* Job Listing Card */}
        <div className="mb-16">
          <a href="https://patrickfire.embera.co/job-application/" target="_blank" rel="noopener noreferrer" className="block group">
            <div className="relative bg-white shadow-lg shadow-black/20 overflow-hidden">
              <div className="absolute left-0 top-0 w-[4px] h-full bg-[#E84D2F]"></div>
              <div className="p-6 pl-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="jomol text-xl lg:text-2xl text-black group-hover:text-[#E84D2F] transition-colors duration-300">
                      Wildland Firefighter
                    </h3>
                    <p className="roboto text-sm text-gray-600 mt-1">All Locations &bull; Full Season</p>
                  </div>
                  <span className="bg-[#E84D2F] group-hover:bg-red-700 text-white px-6 py-2 jomol text-lg transition-colors duration-200 text-center shrink-0">
                    Apply Now
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Next Steps - Timeline Style */}
        <div className="mb-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-black mb-8">
            Next Steps
          </h3>
          <div className="relative border-l-2 border-[#E84D2F]/30 ml-4 pl-8 space-y-8">
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#E84D2F] border-2 border-white shadow"></div>
              <p className="font-semibold text-lg text-black">Work Capacity Test</p>
              <p className="text-gray-700 mt-1">If selected after the interview, candidates must complete:</p>
              <div className="mt-2 space-y-1 text-gray-700">
                <p>• A 3-mile walk completed within 45 minutes</p>
                <p>• Carrying a 45-pound backpack</p>
              </div>
              <p className="text-gray-600 text-sm mt-2 italic">Conducted on the first day of the 4-day Basic Training.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#E84D2F] border-2 border-white shadow"></div>
              <p className="font-semibold text-lg text-black">Required Entry-Level Training</p>
              <div className="mt-2 grid sm:grid-cols-3 gap-3">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <p className="font-bold text-[#E84D2F] text-lg">S-190</p>
                  <p className="text-sm text-gray-700 mt-1">Introduction to Wildland Fire Behavior</p>
                  <p className="text-xs text-gray-500 mt-1">6 hours</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <p className="font-bold text-[#E84D2F] text-lg">S-130</p>
                  <p className="text-sm text-gray-700 mt-1">Firefighter Training</p>
                  <p className="text-xs text-gray-500 mt-1">30 hours</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <p className="font-bold text-[#E84D2F] text-lg">L-180</p>
                  <p className="text-sm text-gray-700 mt-1">Human Factors in Wildland Fire Service</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-3 italic">
                Please note: This training is unpaid, but it is required to become a wildland firefighter.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-orange-400 border-2 border-white shadow"></div>
              <p className="font-semibold text-lg text-black">Already Certified?</p>
              <p className="text-gray-700 mt-1">
                If you have previously completed basic training, upload your certification along
                with your IS-100 and IS-700 certificates during the application process.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#E84D2F] border-2 border-white shadow"></div>
              <p className="font-semibold text-lg text-black">After Your Interview</p>
              <p className="text-gray-700 mt-1">Following your interview, we will schedule:</p>
              <div className="mt-2 space-y-1 text-gray-700">
                <p>• Your Work Capacity Test</p>
                <p>• The RT-130 Annual Refresher Course, required each year to remain current as a wildland firefighter</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gear Requirements */}
        <div className="mb-12 flex flex-col sm:flex-row gap-6 items-stretch">
          <div className="flex-1 bg-black text-white rounded-lg p-6 flex items-center">
            <div>
              <h3 className="text-2xl font-bold mb-3">Gear Requirements</h3>
              <div className="space-y-2 text-gray-300">
                <p>• Leather boots (8-inch height minimum) – Vibram sole required</p>
                <p>• <span className="text-red-400 font-semibold">No steel-toe boots allowed</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="mb-16 text-center bg-gradient-to-r from-[#E84D2F] to-orange-500 rounded-lg p-8 lg:p-12 text-white shadow-xl">
          <p className="text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto font-medium">
            This is your chance to step into a challenging and rewarding role—apply today and take the first step toward
            joining the team. We look forward to growing the PatRick family and welcoming new members to our team.
          </p>
          <a href="https://patrickfire.embera.co/job-application/" target="_blank" rel="noopener noreferrer"
            className="inline-block mt-6 bg-white text-[#E84D2F] font-bold px-10 py-3 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
            Start Your Application
          </a>
        </div>
        </div>
      </section>

      {/* Mountain Silhouette Divider */}
      <div className="relative w-full h-24 bg-white">
        <svg className="absolute bottom-0 w-full h-24" viewBox="0 0 1440 96" preserveAspectRatio="none" fill="#000000">
          <path d="M0,96 L0,64 L120,48 L240,72 L360,32 L480,56 L600,24 L720,52 L840,16 L960,48 L1080,28 L1200,60 L1320,36 L1440,52 L1440,96 Z" />
        </svg>
      </div>

      {/* Gallery Section */}
      <section className="bg-black py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src="/Img/Classroom.jpg"
                alt="New Crew learning fire safety"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white font-semibold jomol text-lg">Training & Education</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src="/Img/Redmond_Trucks.jpg"
                alt="Truck Lined up"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white font-semibold jomol text-lg">Fleet Ready to Deploy</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src="/Img/Redmond_Packing.jpg"
                alt="Crews packing in Redmond"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white font-semibold jomol text-lg">Crew Preparation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mountain Silhouette Divider - Inverted */}
      <div className="relative w-full h-24 bg-white">
        <svg className="absolute top-0 w-full h-24" viewBox="0 0 1440 96" preserveAspectRatio="none" fill="#000000">
          <path d="M0,0 L0,48 L180,24 L300,56 L420,16 L540,40 L720,8 L900,44 L1020,20 L1140,52 L1320,12 L1440,40 L1440,0 Z" />
        </svg>
      </div>

      {/* Employee Experiences */}
      <section className="container mx-auto px-4 py-16 lg:py-24 jomol">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-12">
            Employee Experiences
          </h2>
          <div className="relative max-w-6xl mx-auto">
            <div className="text-[#E84D2F] text-8xl lg:text-9xl font-bold absolute -top-8 -left-4 lg:-left-8">
              &ldquo;
            </div>
            <p className="text-2xl  text-black leading-relaxed italic px-8 lg:px-16">
              This is hands down my favorite job. I woke up every morning
              excited for the adventure that awaited me. We were always fed well
              and throughout our adventures through dense forests my coworkers
              and I bonded like brothers. I learned so many valuable lessons
              that I can apply to any aspect of my life.
            </p>
            <div className="text-[#E84D2F]  text-8xl lg:text-9xl font-bold absolute -bottom-8 -right-4 lg:-right-8">
              &rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-5xl w-11/12 lg:w-full jomol mx-auto mt-10 mb-20">
        <h2 className="text-4xl font-bold mb-5">Frequently Asked Questions</h2>
        <div className="faq-section">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border-b pb-4">
              <button
                onClick={() => toggleFaq(index)}
                className="cursor-pointer font-semibold text-xl w-full text-left hover:text-[#E84D2F]  transition-colors py-2"
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
