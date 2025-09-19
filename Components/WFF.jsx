import Image from "next/image";



export default function WFF(){



    return(


        <>
        <div className="bg-[#3b3b3b]">
        <div className="grid lg:grid-cols-2 grid-cols-1 w-11/12 lg:w-8/12 mx-auto py-5 ">
        
        <div className="col-span-1">
            <Image width={500} height={250} alt="Wildland Firefighting Foundation Logo" className="" src="/Img/WFF_Logo.png"/>
        </div>

        <div className="col-span-1 flex items-center">
            <p className="jomol text-2xl text-white">Proud supporters of the Wildland Firefighting Foundation for over 20 years. Supporting those who risk their lives to protect our communities and natural resources.</p>
        </div>
        
        </div>
        </div>
        
        
        
        
        </>


    );
}