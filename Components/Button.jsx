



export default function Button ({color, text, type = "button", disabled = false}){


    return(
        <>
        <button
          type={type}
          disabled={disabled}
          className={`hover:cursor-pointer active:scale-95 duration-200 ${color} px-2 py-1 jomol text-lg disabled:cursor-not-allowed disabled:active:scale-100`}
        >
          {text}
        </button>
        </>

    );
}