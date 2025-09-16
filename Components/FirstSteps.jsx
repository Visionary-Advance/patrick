import Link from "next/link";
import Button from "./Button";

export default function FirstSteps() {
  const jobListings = [
    { title: "Wildland Firefighter", location: "Springfield, OR" },
    { title: "Wildland Firefighter", location: "Redmond, OR" },
    { title: "Wildland Firefighter", location: "Ellensburg, WA" },
    { title: "Wildland Firefighter", location: "Boise, ID" },
    { title: "Wildland Firefighter", location: "Asheville, NC" },
  ];

  return (
    <>
      <div className="relative">
        <img
          className="absolute inset-0 w-full h-full object-cover object-top -z-50"
          src="/Img/First_Step.jpg"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-30 px-4 py-16 sm:py-20 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <h3 className="jomol text-white text-2xl sm:text-3xl lg:text-4xl text-center">
              Looking to Take the First Step?
            </h3>
            <p className="roboto max-w-4xl mt-5 mx-auto text-center text-lg sm:text-xl text-white">
              Your next opportunity is here. Join us and grow with a supportive
              team that believes in helping you succeed.
            </p>
            <div className="mt-10 max-w-3xl mx-auto space-y-6">
              {jobListings.map((job, index) => (
                <div key={index} className="bg-white  shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 gap-3">
                    <h4 className="jomol text-lg sm:text-xl lg:text-2xl">{job.title} - {job.location}</h4>
                    <Link target="_blank" rel="nofollow" href={"https://patrick.hiringplatform.com/list/careers"}>
                      <Button text={"Apply"} color={"bg-black px-6 text-white"} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}