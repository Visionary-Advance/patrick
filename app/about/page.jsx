import TimelineScrollAnimation from "@/Components/TimelineScroll";

export default function AboutPage() {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center gap-8 mb-16 mt-32 lg:mt-48 max-w-7xl mx-auto px-4 md:px-16">
        <div className="flex-1 lg:max-w-xl">
          <h2 className="jomol text-5xl">About</h2>
          <div className="h-0.5 bg-black/50 mt-2 w-16"></div>
          <p className="roboto mt-2">
            Founded in 1971 by Rick Dice, a 5th generation wildland firefighter, PatRick Environmental has built a
            proud legacy of leadership in wildland firefighting, emergency
            response, and environmental services. With deep roots in Oregon and offices across the U.S., we deliver highly trained crews,
            specialized equipment, and decades of expertise to meet the nation's
            growing wildfire and resource management needs. As a
            Veteran-Owned Small Business, we are committed to
            excellence, safety, and innovation.
          </p>
        </div>
        <div className="flex-1 w-full lg:max-w-xl">
            <img className="h-96 w-full object-cover rounded-lg" src="/Img/About_Img.jpg"/>
        </div>
      </div>

      {/* Divider */}
      <div className="bg-black/30 h-0.5 w-[20%] mx-auto"></div>


      <div className="lg:ms-44   md:mx-16 mb-5 lg:mb-0">
      <div className="w-11/12 mx-auto">
        <h2 className="jomol  text-5xl">History</h2>
         <div className="h-0.5 bg-black/50 mt-2 w-16"></div>
         </div>

         <TimelineScrollAnimation />
      </div>
       <div className="mb-16 mt-14 max-w-7xl mx-auto px-4 md:px-16">
        <div className="mb-5 lg:mb-0">
          <h2 className="jomol text-5xl">Leadership</h2>
          <div className="h-0.5 bg-black/50 mt-2 w-16"></div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-12 mt-10 pb-5">
            <div className="w-[300px]">
              <img className="w-[300px] h-[300px] object-cover rounded-lg" src="/Img/Rick.jpg" alt="Rick Dice's Picture"/>
              <h4 className="jomol text-2xl mt-2">Rick Dice</h4>
              <p className="text-black/30">President</p>
            </div>
            <div className="w-[300px]">
              <img className="w-[300px] h-[300px] object-cover rounded-lg" src="/Img/Jeremy.jpg" alt="Jeremy Dice's Picture"/>
              <h4 className="jomol text-2xl mt-2">Jeremy Dice</h4>
              <p className="text-black/30">Vice President</p>
            </div>
            <div className="w-[300px]">
              <img className="w-[300px] h-[300px] object-cover rounded-lg" src="/Img/Stephanie.jpg" alt="Stephanie Foxx's Picture"/>
              <h4 className="jomol text-2xl mt-2">Stephanie Foxx</h4>
              <p className="text-black/30">Corporate Secretary/Springfield Base Manager</p>
            </div>
            <div className="w-[300px]">
              <img className="w-[300px] h-[300px] object-cover rounded-lg" src="/Img/Gerry_Pic.jpg" alt="Gerry Esser's Picture"/>
              <h4 className="jomol text-2xl mt-2">Gerry Esser</h4>
              <p className="text-black/30">Company Office Administrator</p>
            </div>
            <div className="w-[300px]">
              <img className="w-[300px] h-[300px] object-cover rounded-lg" src="/Img/Joel.jpg" alt="Joel Dice's Picture"/>
              <h4 className="jomol text-2xl mt-2">Joel Dice</h4>
              <p className="text-black/30">Human Resources</p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
