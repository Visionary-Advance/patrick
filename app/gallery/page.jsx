'use client'

import { useState, useEffect } from "react";
import Image from "next/image";

const Gallery = () => {
  const allImages = [
    "/Img/Today.jpg",
    "/Img/American_Flag.jpg",
    "/Img/Good_Vibes_New_Shop.png",
    "/Img/Truck_Working_Img.jpg",
    "/Img/Truck_Pump.JPG",
    "/Img/sunset.JPG",
    "/Img/Gallery_5.png",
    "/Img/Gallery_6.png",
    "/Img/Gallery_7.png",
    "/Img/Gallery_9.png",
    "/Img/Gallery_10.png",
    "/Img/Gallery_11.png",
    "/Img/Gallery_12.png",
    "/Img/Gallery_13.png",
    "/Img/Gallery_14.png",
    "/Img/Gallery_15.png",
    "/Img/Gallery_16.png",
    "/Img/House.png",
  ];

  const IMAGES_PER_LOAD = 12;

  const [displayedImages, setDisplayedImages] = useState(allImages.slice(0, IMAGES_PER_LOAD));
  const [currentLoadIndex, setCurrentLoadIndex] = useState(IMAGES_PER_LOAD);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadMoreImages = () => {
    setLoading(true);
    
    // Simulate a brief loading delay for better UX
    setTimeout(() => {
      const nextImages = allImages.slice(currentLoadIndex, currentLoadIndex + IMAGES_PER_LOAD);
      setDisplayedImages(prev => [...prev, ...nextImages]);
      setCurrentLoadIndex(prev => prev + IMAGES_PER_LOAD);
      setLoading(false);
    }, 300);
  };

  const hasMoreImages = currentLoadIndex < allImages.length;

  const openSlideshow = (index) => {
    setCurrentIndex(index);
    setSelectedImage(displayedImages[index]);
  };

  const closeSlideshow = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % displayedImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(displayedImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? displayedImages.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(displayedImages[prevIndex]);
  };

  useEffect(() => {
    if (selectedImage !== null) {
      const handleKeyDown = (e) => {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") closeSlideshow();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedImage, currentIndex, displayedImages]);

  return (
    <>
      <div className="text-center mb-10 pt-32">
        <h2 className="jomol text-xl lg:text-4xl">Gallery</h2>
        
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1400px] mx-auto gap-4 p-4">
        {displayedImages.map((src, index) => (
          <div
            key={index}
            className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer group transition-transform duration-200 hover:scale-105"
            onClick={() => openSlideshow(index)}
          >
            <Image
              src={src}
              width={600}
              height={600}
              loading={index < IMAGES_PER_LOAD ? "eager" : "lazy"}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-90"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
              placeholder="blur"
            />
            <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
              <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreImages && (
        <div className="text-center py-8">
          <button
            onClick={loadMoreImages}
            disabled={loading}
            className={`
              px-8 py-3 rounded-lg font-medium text-white transition-all duration-200
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95'
              }
              shadow-lg hover:shadow-xl
            `}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Load More Images
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            )}
          </button>
         
        </div>
      )}

     

      {/* Slideshow Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors z-10"
            onClick={closeSlideshow}
          >
            ✕
          </button>
          
          {/* Previous Button */}
          <button
            className="absolute left-4 text-white text-3xl hover:text-gray-300 transition-colors z-10"
            onClick={prevImage}
          >
            ◀
          </button>
          
          {/* Main Image */}
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={displayedImages[currentIndex]}
              alt="Slideshow"
              className="max-w-full max-h-full rounded-lg object-contain"
            />
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} of {displayedImages.length}
            </div>
          </div>
          
          {/* Next Button */}
          <button
            className="absolute right-4 text-white text-3xl hover:text-gray-300 transition-colors z-10"
            onClick={nextImage}
          >
            ▶
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;