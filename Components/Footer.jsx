import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {

 const getCurrentYear = () => new Date().getFullYear();
  return (
    <footer className="bg-[#E84D2F] jomol text-white px-6 pb-4 pt-12">
      <div className="max-w-[1700px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-6">
          {/* Logo and Tagline Section */}
          <div className="lg:col-span-1 mb-10">
            <div className="flex items-center mb-4">
             <img className='w-20' src='/Img/Patrick_Logo.webp'/>
            </div>
            <p className="text-lg leading-relaxed me-10">
              "Where Experience and <br/>Professionalism <br/> Make the Difference" Since 1971
            </p>
          </div>

          {/* Navigation Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="hover:underline">Services</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/wildfires" className="hover:underline">Wildfires</Link></li>
              <li><Link href="/employment" className="hover:underline">Employment</Link></li>
              <li><Link href="/memorial" className="hover:underline">Memorial</Link></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="font-bold lg:mt-0 mt-5 text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="http://nwsa.us/" className="hover:underline">NWSA</Link></li>
               <li><Link href="https://www.blm.gov" className="hover:underline">BLM</Link></li>
              <li><Link href="https://www.nifc.gov" className="hover:underline">NIFC</Link></li>
              <li><Link href="https://gacc.nifc.gov" className="hover:underline">GACC</Link></li>
            
            </ul>
          </div>

          {/* Additional Resources Section */}
          <div className='mt-2'>
            
            <ul className="space-y-2">
              
              <li><Link href="https://www.wffoundation.org" className="hover:underline">Wildland Firefighter Foundation</Link></li>
             
              <li><Link href="https://www.fs.usda.gov" className="hover:underline">US Forest Service</Link></li>
              <li><Link href="https://weather.com" className="hover:underline">The Weather Channel</Link></li>
               <li><Link href="https://inciweb.nwcg.gov" className="hover:underline">Inciweb</Link></li>
              <li><Link href="https://www.nifc.gov/nicc" className="hover:underline">NW Interagency</Link></li>
            </ul>
          </div>
       

        {/* Additional Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 mt-2">
          <div>
            <ul className="space-y-2">
              <li><Link href="https://www.oregon.gov/odf" className="hover:underline">ODF</Link></li>
              <li><Link href="https://www.idl.idaho.gov/" className="hover:underline">IDL</Link></li>
              <li><Link href="https://dnr.wa.gov/" className="hover:underline">DNR</Link></li>
             
            </ul>
          </div>
          <div>
            <ul className="space-y-2 mt-2 ">
             
            </ul>
          </div>
          <div>
            <ul className="space-y-2 mt-2">
             
            </ul>
          </div>
        </div>
         </div>

        
        
        {/* Social Media Icons */}
        <div className="flex justify-end space-x-2">
          <Link href="https://facebook.com" className="hover:opacity-80">
            <FaFacebook size={20} />
          </Link>
          <Link href="https://instagram.com" className="hover:opacity-80">
            <FaInstagram size={20} />
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-1 border-white/90 my-2"></div>
        <div className='text-white text-center'>
          <p>Copyright © {getCurrentYear()} Patrick Envirionmental. All rights reserved.</p>
          <p>Powered by <span className=' '><Link target='_blank' rel='nofollow' href={'https://visionaryadvance.com'}>Visionary Advance</Link></span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;