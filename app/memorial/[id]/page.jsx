import Link from "next/link";
import React from "react";
import { memorialData } from "@/lib/memorialData";

// Custom Arrow Left icon component
const ArrowLeft = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

export default function MemorialDetail({ params }) {
   const { id } = params;
  const person = memorialData.find((p) => p.id === id);
  if (!person) {
    return (
      <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-roboto text-black mb-4">
            Memorial Not Found
          </h1>
          <Link  href="/memorial"
          
            
            className="inline-flex cursor-pointer items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={20} />
            Return to Memorial Gallery
         
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F5F5F5] relative">
      {/* Back Navigation - Positioned absolutely in top left */}
      <div className="absolute  top-26 left-1/2 -translate-x-1/2 lg:-translate-x-0 lg:top-36 lg:left-20 z-10">
        <Link href={"/memorial"}
          
          className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md"
        >
          <ArrowLeft size={20} />
          <span className="font-roboto">Back to Memorial</span>
        </Link>
      </div>

      {/* Main Content - Matches Figma layout exactly */}
      <div className="flex flex-col items-center pt-40 pb-[100px] px-4">
        {/* Portrait Image - Exactly 750x751px as in Figma */}
        <div className="mb-[20px]">
          <img
            src={person.imageUrl}
            alt={`Memorial photo of ${person.name}`}
            className="w-[300px] h-[300px] object-cover"
          />
        </div>

        {/* Person Information - Exact positioning and typography from Figma */}
        <div className="text-center mb-[30px]">
          {/* Name - Exactly as positioned in Figma */}
          <h1 className="jomol text-[28px] sm:text-[40px]   font-normal text-black">
            {person.name}
          </h1>

          {/* Date Range - Exactly as positioned in Figma */}
         
        </div>

        {/* Biography - Exactly 1312px wide centered as in Figma */}
        <div className="w-full roboto max-w-[1312px] text-center px-4">
          <div className="font-roboto text-[16px] sm:text-[20px] lg:text-[25px] leading-normal font-normal text-black whitespace-pre-line">
            {person.biography}
          </div>
        </div>
      </div>
    </main>
  );
}