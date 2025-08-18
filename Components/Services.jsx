

import ServiceCards from './ServiceCards';


export default function Services() {

      const services = [
    {
      image: "/Img/Flame.png",
      title: "Wildland Fire Fighting",
      description: "Trained crews fighting wildfires to protect land and homes."
    },
    {
      image: "/Img/Trees.png",
      title: "Brush Trimming",
      description: "Clearing brush to reduce wildfire risks and improve safety."
    },
    {
      image: "/Img/24_Hour.png",
      title: "Wildland Fire Fighting",
      description: "Fast-response teams ready for wildfires and natural disasters."
    },
    {
      image: "/Img/Consulting.png",
      title: "Consulting",
      description: "Expert advice for wildfire management and fuel reduction plans."
    },
    
  ];


  return (
    <>
      <div className="max-w-[100rem] w-[90%] mx-auto mt-7">
        <h3 className="text-[#E84D2F] jomol text-4xl">Our Services</h3>
        <div className="bg-gray-400 h-0.5 w-12 mt-2  "></div>
        
        <p className="lg:w-1/3 my-2 roboto">
          Patrick Environmental specializes in wildfire suppression,
          brush removal, and land clearing. We help reduce fire risks with
          effective, eco-friendly solutions.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
            <div className="col-span-1">
                <img className=" " src="/Img/Services_Pic.jpg"/>
            </div>
           

             <div className="grid lg:mt-0 mt-5 lg:ms-10 grid-cols-1 md:grid-cols-2">
      {services.map((service, index) => (
        <div key={index} className="col-span-1">
          <img className="w-1/6" src={service.image} alt={service.title} />
          <h4 className="jomol text-[27px] my-1">{service.title}</h4>
          <p className="roboto w-10/12">{service.description}</p>
        </div>
      ))}
    </div>

        
        </div>

        {/* Services Card */}

        <ServiceCards />

   
      </div>
    </>
  );
}
