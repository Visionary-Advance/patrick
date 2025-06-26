'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Only add scroll listener on homepage
    if (isHomepage) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomepage]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Wildfires', href: '/wildfires' },
    { name: 'Employment', href: '/employment' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-linear ${
        isHomepage 
          ? (isScrolled ? 'bg-[#E32121]' : 'bg-transparent')
          : 'bg-[#E32121]'
      }`}
    >
      <div className=" max-w-[118rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 ">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="text-white text-xl font-bold">
                <img className='w-20' src='/Img/Patrick_Logo.webp' alt='Patrick Logo'/>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white jomol hover:text-gray-200 px-3 py-2 text-lg font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="flex-shrink-0">
            <Link
              href="/contact"
              className="bg-white jomol text-black px-2 py-1  font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200"
              aria-label="Toggle navigation"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (you can expand this if needed) */}
      <div className="md:hidden">
        {/* Add mobile menu content here if needed */}
      </div>
    </header>
  );
};

export default Header;