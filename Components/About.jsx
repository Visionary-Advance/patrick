import Button from "./Button";

export default function About() {
  return (
    <>
      <div className="mt-24 mx-auto max-w-[90%] px-4">
  <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 items-center">
    <div className="col-span-1 overflow-hidden">
      <img
        className="w-full h-auto min-h-[300px] lg:h-[500px] object-cover"
        src="/Img/History.jpg"
      />
    </div>
    <div className="col-span-1 lg:ms-8">
      <h3 className="jomol text-4xl lg:text-6xl">Our History</h3>
      <p className="jomol mt-2 text-lg lg:text-xl">
        PatRick Environmental began in 1971 when Rick Dice set out to
        build a company that would set new standards for wildland
        firefighting. In 1974, PatRick officially incorporated, and Rick
        later helped found the National Wildfire Suppression Association,
        shaping the private wildfire industry into what it is today. Over
        the decades, PatRick Environmental has grown from a small
        operation into a trusted national leader, known for pioneering the
        use of All-Terrain Suppression Vehicles to reach fires in the
        toughest landscapes.
      </p>
    </div>
  </div>

  <div className="grid mt-8 lg:mt-5 lg:grid-cols-2 grid-cols-1 gap-8 items-center">
    <div className="col-span-1 order-2 lg:order-1">
      <h3 className="jomol text-3xl lg:text-4xl">Today</h3>
      <p className="jomol mt-2 text-lg lg:text-xl">
        We continue that legacy by providing top-tier wildland fire crews,
        fuels management, and emergency services across the country,
        helping protect communities and the environment when it matters
        most. Every fire season, our teams are ready to answer the call —
        battling wildfires, reducing hazardous fuels, and supporting
        agencies with the skills, equipment, and dedication it takes to
        make a real difference on the ground.
      </p>
      <div className="mt-5">
        <Button text={"Read More"} color={"bg-[#E32121] text-white"} />
      </div>
    </div>
    <div className="col-span-1 overflow-hidden order-1 lg:order-2 lg:ms-8">
      <img 
        className="w-full h-auto min-h-[300px] lg:h-[410px] object-cover" 
        src="/Img/Today.jpg" 
      />
    </div>
  </div>
</div>
    </>
  );
}
