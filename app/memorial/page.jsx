import Link from "next/link";
import React from "react";

const memorialData = [
  {
    id: "justin-dice",
    name: "Justin Dice",
    dateRange: "January 1, 2000 - February 5, 2025",
    wildfireName: "Wildfire Name",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/290591bf3f89a9349287bd2f0007d6ba78026d33?width=1000",
  },
  {
    id: "weston-anglese",
    name: "Weston Anglese",
    dateRange: "January 1, 2000 - February 5, 2025",
    wildfireName: "Wildfire Name",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/78286a6eef1090da48c6650399a94a894010a9e3?width=1000",
  },
  {
    id: "aaron-rosen",
    name: "Aaron Rosen",
    dateRange: "January 1, 2000 - February 5, 2025",
    wildfireName: "Wildfire Name",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b3a4ddf49776230612e2fd4b07cd8bbb407ebaf5?width=1000",
  },
  {
    id: "weston-smith",
    name: "Weston Smith",
    dateRange: "January 1, 2000 - February 5, 2025",
    wildfireName: "Wildfire Name",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/886357a8ead26d94e3b9b54c6aa0732775161307?width=1000",
  },
  {
    id: "cassandra-neylor",
    name: "Cassandra Neylor",
    dateRange: "January 1, 2000 - February 5, 2025",
    wildfireName: "Wildfire Name",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/38d18b756bc05762db3f370d301126fbf3c533f6?width=1000",
  },
  {
    id: "joshua-dombi",
    name: "Joshua Dombi",
    dateRange: "January 1, 2000 - February 5, 2025",
    wildfireName: "Wildfire Name",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0e60d7a981e771b96b31834f3458cd317daa5a51?width=1000",
  },
  {
    id: "dustin-eldred",
    name: "Dustin Eldred",
    dateRange: "January 1, 2000 - February 5, 2025",
    wildfireName: "Wildfire Name",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a02b6b4586105657de2265c027f72625d1f464af?width=1000",
  },
];

const MemorialCard = ({ person }) => {
  return (
    <Link href={`memorial/${person.id}`}>
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
        <p className="font-roboto text-[20px]  font-normal text-black/50 ">
          {person.dateRange}
        </p>
        <p className="font-roboto text-[20px] leading-[60px] font-normal text-black/50">
          {person.wildfireName}
        </p>
      </div>
    </article>
    </Link>
  );
};

export default function Memorial() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[450px] bg-cover bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage:
            "url(https://cdn.builder.io/api/v1/image/assets/TEMP/168719a4930783798192fa46cd2f7e0321aec798?width=3840)",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 h-full w-full ">
         
            <div className="max-w-2xl absolute bottom-5 left-5">
            <h1 className="text-white text-3xl md:text-4xl font-normal mb-4 md:mb-2 jomol ">
              Memorial
            </h1>
            <p className="jomol text-white text-lg md:text-2xl font-normal leading-relaxed max-w-xl">
              Help us honor those who gave their lives in the act of service
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
    </main>
  );
}