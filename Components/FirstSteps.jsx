export default function FirstSteps() {
  return (
    <>
      <div className="relative h-[850px]">
        <img
          className="absolute top-0 left-0 -z-50 w-full h-full object-cover"
          src="/Img/First_Step.jpg"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

        <div className="absolute left-1/2 -translate-x-1/2 z-50 mt-20 ">
          <h3 className="jomol text-white text-4xl text-center">
            Looking to Take the First Step?
          </h3>
          <p className="roboto lg:w-8/12 mt-5 mx-auto text-center text-xl text-white">
            Your next opportunity is here. Join us and grow with a supportive
            team that believes in helping you succeed.
          </p>
        </div>
      </div>
    </>
  );
}
