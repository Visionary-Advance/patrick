'use client'

import { useState, useEffect } from "react";
import Image from "next/image";

// Skeleton loader component with pulse animation (no spinner)
const ImageSkeleton = () => (
  <div className="absolute inset-0 bg-gray-200 animate-pulse">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 opacity-50"></div>
  </div>
);

const Gallery = () => {
  const IMAGES_PER_LOAD = 12;

  const [allImages, setAllImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [currentLoadIndex, setCurrentLoadIndex] = useState(IMAGES_PER_LOAD);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [slideshowImageLoaded, setSlideshowImageLoaded] = useState(false);

  // Fetch images from Google Drive on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setInitialLoading(true);
        const response = await fetch('/api/gallery');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch images');
        }

        // Store full image objects instead of just URLs
        setAllImages(data.images);
        setDisplayedImages(data.images.slice(0, IMAGES_PER_LOAD));
        setCurrentLoadIndex(IMAGES_PER_LOAD);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        setFetchError(error.message);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchImages();
  }, []);

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

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const openSlideshow = (index) => {
    setSlideshowImageLoaded(false);
    setCurrentIndex(index);
    setSelectedImage(displayedImages[index]);
  };

  const closeSlideshow = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSlideshowImageLoaded(false);
    const nextIndex = (currentIndex + 1) % displayedImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(displayedImages[nextIndex]);
  };

  const prevImage = () => {
    setSlideshowImageLoaded(false);
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
        <h2 className="jomol text-4xl">Gallery</h2>
      </div>

      {/* Error State */}
      {fetchError && (
        <div className="max-w-2xl mx-auto p-6 bg-red-50 border border-red-200 rounded-lg text-center">
          <p className="jomol text-red-800 mb-2">Unable to load gallery images</p>
          <p className="text-sm text-red-600">{fetchError}</p>
          <p className="text-sm text-gray-600 mt-4">Please check that Google Drive API credentials are configured in .env.local</p>
        </div>
      )}

      {/* Image Grid */}
      {!fetchError && displayedImages.length === 0 && !initialLoading && (
        <div className="text-center py-20">
          <p className="jomol text-gray-600 text-xl">No images found in the gallery folder</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1400px] mx-auto gap-4 p-4">
        {/* Show skeleton placeholders during initial load */}
        {initialLoading && (
          <>
            {[...Array(IMAGES_PER_LOAD)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <ImageSkeleton />
              </div>
            ))}
          </>
        )}

        {/* Actual images */}
        {displayedImages.map((image, index) => (
          <div
            key={image.id || index}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group transition-transform duration-200 hover:scale-105"
            onClick={() => openSlideshow(index)}
          >
            {/* Animated skeleton loader */}
            {!loadedImages[index] && <ImageSkeleton />}

            <Image
              src={image.thumbnail}
              width={600}
              height={600}
              loading={index < IMAGES_PER_LOAD ? "eager" : "lazy"}
              alt={image.description || image.name || `Gallery image ${index + 1}`}
              className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:opacity-90 ${
                loadedImages[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              onLoad={() => handleImageLoad(index)}
            />
            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
              <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}

        {/* Show skeleton placeholders for loading more images */}
        {loading && (
          <>
            {[...Array(Math.min(IMAGES_PER_LOAD, allImages.length - currentLoadIndex))].map((_, index) => (
              <div
                key={`loading-skeleton-${index}`}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <ImageSkeleton />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Load More Button */}
      {hasMoreImages && (
        <div className="text-center py-8">
          <button
            onClick={loadMoreImages}
            disabled={loading}
            className={`
              px-8 py-3 rounded-lg jomol font-medium text-white transition-all duration-200
              ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#E84D2F] hover:bg-[#c23d22] hover:scale-105 active:scale-95 active:bg-[#a33419]'
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
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
            onClick={closeSlideshow}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-4 w-12 h-12 flex items-center justify-center rounded-full bg-[#E84D2F] hover:bg-[#c23d22] active:bg-[#a33419] text-white transition-all shadow-lg hover:shadow-xl hover:scale-110 z-10"
            onClick={prevImage}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Main Image */}
          <div className="relative flex flex-col items-center">
            <div className="relative max-w-[70vw] max-h-[450px] min-w-[300px] min-h-[300px]">
              {/* Loading spinner for slideshow image */}
              {!slideshowImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-gray-400 border-t-[#E84D2F] rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-[#E84D2F] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                  </div>
                </div>
              )}
              <img
                src={displayedImages[currentIndex]?.fullSize}
                alt={displayedImages[currentIndex]?.description || displayedImages[currentIndex]?.name || "Slideshow"}
                className={`max-w-full max-h-[450px] rounded-lg object-contain transition-all duration-500 ${
                  slideshowImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                onLoad={() => setSlideshowImageLoaded(true)}
                onError={(e) => {
                  console.error('Failed to load full-size image:', e.target.src);
                  // Fallback to thumbnail if full-size fails
                  e.target.src = displayedImages[currentIndex]?.thumbnail;
                  setSlideshowImageLoaded(true);
                }}
              />

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} of {displayedImages.length}
              </div>
            </div>

            {/* Image Description */}
            {displayedImages[currentIndex]?.description && (
              <div className="mt-4 max-w-[70vw] text-center">
                <p className="text-white text-sm md:text-base bg-black/40 px-4 py-2 rounded-lg">
                  {displayedImages[currentIndex].description}
                </p>
              </div>
            )}
          </div>

          {/* Next Button */}
          <button
            className="absolute right-4 w-12 h-12 flex items-center justify-center rounded-full bg-[#E84D2F] hover:bg-[#c23d22] active:bg-[#a33419] text-white transition-all shadow-lg hover:shadow-xl hover:scale-110 z-10"
            onClick={nextImage}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;