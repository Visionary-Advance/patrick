import React from "react";
import { memorialData } from "@/lib/memorialData";
import { buildOpenGraph } from "@/lib/seo";

export const metadata = {
  title: 'Memorial | Patrick Environmental',
  description: 'Honoring the memory of fallen PatRick Environmental firefighters and family members. Missed but never forgotten — we remember their service with gratitude.',
  alternates: {
    canonical: 'https://www.patrickfire.com/memorial',
  },
  openGraph: buildOpenGraph({ url: 'https://www.patrickfire.com/memorial' }),
};

const MemorialCard = ({ person }) => {
  return (
    <article className="bg-white shadow-lg w-full max-w-[400px] mx-auto">
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={person.imageUrl}
          alt={`Memorial photo of ${person.name}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 pb- jomol">
        <h3 className="font-roboto text-3xl leading-[60px] font-normal text-black ">
          {person.name}
        </h3>

      </div>
    </article>
  );
};

export default function Memorial() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-[450px] bg-cover bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage:
            "url(https://cdn.builder.io/api/v1/image/assets/TEMP/168719a4930783798192fa46cd2f7e0321aec798?width=3840)",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 h-full w-full ">
         
            <div className=" absolute bottom-5 left-5">
            <h1 className="text-white text-3xl md:text-4xl font-normal mb-4 md:mb-2 jomol ">
              Memorial
            </h1>
            <p className="jomol text-white text-lg md:text-2xl font-normal leading-relaxed me-10">
             Missed but never forgotten. We honor the members of the PatRick family who passed away during their time as employees or after retirement. While they did not lose their lives on the fire line, their contribution helped shape PatRick into what it is today. We remember them with gratitude and keep them in our hearts.
            </p>
          </div>
        </div>
       
      </section>

      {/* Memorial Grid Section */}
      <section className="py-12 px-4 sm:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
            {memorialData.map((person) => (
              <MemorialCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </section>

      <div className="text-center max-w-2xl text-4xl mx-auto py-20 px-4 jomol ">
        <p>This page is currently under construction and changes will be made soon.</p>
      </div>
    </main>
  );
}