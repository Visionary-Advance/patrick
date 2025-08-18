import Link from "next/link";
import Button from "./Button";


export default function ShareExp(){


    return(

        <>
        <div className="text-center text-black py-5 bg-white w-full mx-auto">
            <h4 className="jomol mb-5 text-2xl lg:text-4xl">
                Have a picture or experience <br/> you want to share?
            </h4>
            <p className="text-black mb-5 text-xl lg:text-xl">Submit a picture and your experience with us!</p>
            <Link className="" href={"/submit-experience"}>
            <Button text={"Submit a Picture"} color={"text-white bg-[#E84D2F]"} />
            </Link>
        </div>
        
        
        
        </>


    );

}