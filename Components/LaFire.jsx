export default function LaFire() {
  return (
    <>
      <div className="bg-[#3b3b3b] mt-10 p-5 w-full">
  <div className="max-w-[90%] grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto items-center">
    <div className="col-span-1 ms-8">
      <h3 className="jomol text-3xl lg:text-4xl text-white">
        Heading up <span className="text-[#E84D2F]">North</span>
      </h3>
      <div className="h-0.5 bg-white/30 w-10"></div>
      <p className="lg:w-8/12 text-white mt-2 text-base lg:text-lg">
        This year, PatRick proudly headed north to support firefighting efforts during the intense wildfires in Canada, bringing our expertise, dedication, and resources to the front lines. Our crews work hand in hand with government teams, providing vital support and strengthening operations in critical situations. We compliment all federal and state agencies.
      </p>
    </div>
    <div className="col-span-1 overflow-hidden">
      <img 
        className="w-full  h-[250px] lg:h-auto object-cover lg:object-contain" 
        src="/Img/Canada.jpeg" 
        alt="Picture of Truck in front of fire" 
      />
    </div>
  </div>
</div>
    </>
  );
}
