



export default function Button ({color,text}){


    return(
        <>
        <button className={`hover:cursor-pointer active:scale-95 duration-200 ${color} px-2 py-1 jomol text-lg`} >{text}</button>
        </>

    );
}