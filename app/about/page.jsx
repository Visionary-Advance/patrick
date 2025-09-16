import TimelineScrollAnimation from "@/Components/TimelineScroll";

export default function AboutPage() {
  return (
    <>
      <div className="grid grid-cols-1  mb-16 mt-32 lg:mt-48 lg:grid-cols-2">
        <div className="col-span-1 lg:ms-44 ms-4 mx-auto md:mx-16 mb-5 lg:mb-0 ">
          <h2 className="jomol text-5xl">About</h2>
          <div className="h-0.5 bg-black/50 mt-2 w-16"></div>
          <p className="roboto mt-2 w-11/12 lg:w-8/12">
            Founded in 1971 by Rick Dice, PatRick Environmental has built a
            proud legacy of leadership in wildland firefighting, emergency
            response, and environmental services. With deep roots in Redmond,
            Oregon and offices across the U.S., we deliver highly trained crews,
            specialized equipment, and decades of expertise to meet the nation’s
            growing wildfire and resource management needs. As a
            Service-Disabled Veteran-Owned Small Business, we are committed to
            excellence, safety, and innovation. Our passion for protecting
            communities and natural resources drives everything we do
          </p>
        </div>
        <div className="col-span-1 lg:me-10 w-11/12 mx-auto md:mx-16 lg:mx-0 ">
            <img className="h-96 w-full object-cover" src="/Img/About_Img.jpg"/>
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
       <div className=" mb-16 mt-36 ">
        <div className="col-span-1   mx-auto mb-5 lg:mb-0 ">
          <h2 className="jomol lg:ms-44 ms-4 md:mx-16 text-5xl">Leadership</h2>
          <div className="h-0.5 lg:ms-44 ms-4 md:mx-16 bg-black/50 mt-2 w-16"></div>


          <div className="grid grid-cols-1 mx-auto w-9/12 lg:grid-cols-3 ">
         <div className="mt-10  mx-auto">
            <img className="" src="/Img/Rick.jpg" alt="Rick Dice's Picture"/>
            <h4 className="jomol text-2xl mt-2">Rick Dice</h4>
            <p className="text- text-black/30">Founder</p>
         </div>
         <div className="mt-10  mx-auto">
            <img className="" src="/Img/Rick.jpg" alt="Rick Dice's Picture"/>
            <h4 className="jomol text-2xl mt-2">Rick Dice</h4>
            <p className="text- text-black/30">Founder</p>
         </div>
         <div className="mt-10 mx-auto">
            <img className="" src="/Img/Rick.jpg" alt="Rick Dice's Picture"/>
            <h4 className="jomol text-2xl mt-2">Rick Dice</h4>
            <p className="text- text-black/30">Founder</p>
         </div>
        </div>
        </div>
        
      </div>

    </>
  );
}
