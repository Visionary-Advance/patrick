import Button from "./Button";

export default function FirstSteps() {
  return (
    <>
      <div className="relative">
        <img
          className="absolute inset-0 w-full h-full object-cover object-top -z-50"
          src="/Img/First_Step.jpg"
          alt="Wildland firefighters battling a wildfire at dusk"
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
            <div className="mt-10 max-w-xl mx-auto">
              <a href="/employment" className="block group">
                <div className="relative bg-white shadow-lg shadow-black/30 overflow-hidden">
                  <div className="absolute left-0 top-0 w-[4px] h-full bg-[#E84D2F]"></div>
                  <div className="p-6 pl-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h4 className="jomol text-xl sm:text-2xl text-black group-hover:text-[#E84D2F] transition-colors duration-300">
                          Wildland Firefighter
                        </h4>
                        <p className="roboto text-sm text-gray-600 mt-1">All Locations &bull; Full Season</p>
                      </div>
                      <span className="bg-[#E84D2F] group-hover:bg-red-700 text-white px-6 py-2 jomol text-lg transition-colors duration-200 text-center shrink-0">
                        Apply Now
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
