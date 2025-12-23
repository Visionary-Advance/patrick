import Image from "next/image";
import Link from "next/link";


export default function WFF(){



    return(


        <>
        <div className="bg-[#3b3b3b]">
        <div className="grid lg:grid-cols-2 grid-cols-1 w-11/12 lg:w-8/12 mx-auto py-5 ">

        <div className="col-span-1">
            <Link href="https://wffoundation.org/" target="_blank" rel="noopener noreferrer">
                <Image width={500} height={250} alt="Wildland Firefighting Foundation Logo" className="cursor-pointer" src="/Img/WFF_Logo.png"/>
            </Link>
        </div>

        <div className="col-span-1 flex items-center">
            <p className="jomol text-xl text-white">The Wildland Firefighter Foundation is dedicated to supporting the brave men and women who risk their lives to protect our forests, homes, and communities. We provide assistance to firefighters and their families in times of need. Our mission is to honor, support, and assist wildland firefighters and their families through financial aid, physical and emotional support, advocacy, and community.</p>
        </div>
        
        </div>
        </div>
        
        
        
        
        </>


    );
}