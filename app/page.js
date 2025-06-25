import Button from "@/Components/Button";
import StatsGroup from "@/Components/Stats";


export default function Home() {
  return (
  // Landing Image
  <>
  <div className="">
    <div className="bg-black/30 w-full h-screen absolute top-0 left-0"></div>
    <img className="w-full h-screen object-cover" src="/Img/Landing.JPG" alt="Picture of Fighting Fires"/>
    <div className="absolute bottom-7 max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="jomol text-white text-4xl">"Where Experience and Professionalism <br/> Make The Difference" Since 1971</h1>
    <div className=" mt-5 space-x-2">
    <Button text={"Apply Now"} color={"bg-[#E32121] text-white"} />
    <Button text={"Read More"} color={"bg-white text-black"}/>
    </div>
    </div>
  </div>

  {/* Counting Numbers */}

  <StatsGroup />

  {/* Transition div */}

  <div className="h-0.5 w-1/3 mx-auto mt-10 bg-black/50"></div>
  
  </>
  );
}
