import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center text-white min-h-[44vh] flex-col gap-6 px-4 text-center">

        <div className="font-bold text-3xl sm:text-4xl md:text-5xl gap-3 sm:gap-5 flex justify-center items-center mt-10 sm:mt-15 flex-wrap">

          <span>
            <img className="w-12 sm:w-15" src="icons/coffee.png" alt="" />
          </span>

          <div>
            Get
            <span className="text-green-500">Me</span>
            A
            <span className="text-black text-4xl sm:text-5xl md:text-6xl border border-black bg-white rounded-4xl p-2">
              Coffee
            </span>
          </div>

        </div>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl px-2">
          A crowd funding platform for creators. Get funded by your fans and followers !
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 py-5">

          <Link href={"/login"}>
            <button
              type="button"
              className="text-white bg-linear-to-r from-green-400 via-green-500 to-green-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-bold rounded-base text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 text-center leading-5 rounded-4xl w-full"
            >
              Start Now
            </button>
          </Link>

          <Link href={"/about"}>
            <button
              type="button"
              className="text-white bg-linear-to-r from-green-400 via-green-500 to-green-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-bold rounded-base text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 text-center leading-5 rounded-4xl w-full"
            >
              Read More
            </button>
          </Link>

        </div>

      </div>

      <div className="bg-white h-0.5 opacity-15"></div>

      <div className="text-white mx-auto my-10 px-4">

        <h2 className="text-center font-bold text-2xl sm:text-3xl my-5">
          Your Fans Can Buy You A Coffee
        </h2>

        <div className="flex flex-col md:flex-row gap-10 justify-around items-center my-12 sm:my-20">

          <div className="max-w-xs">

            <div className="bg-green-500 hover:bg-green-400 rounded-full p-8 sm:p-10 flex flex-col justify-center items-center hover:border border-slate-300">
              <img className="py-5 w-24 sm:w-30" src="/icons/men.png" alt="men" />
            </div>

            <p className="font-bold text-center my-3">
              Fund Yourself
            </p>

            <p className="text-center my-2">
              Your fans are available to help you
            </p>

          </div>

          <div className="max-w-xs">

            <div className="bg-green-500 hover:bg-green-400 rounded-full p-8 sm:p-10 flex flex-col justify-center items-center hover:border border-slate-300">
              <img className="py-5 w-24 sm:w-30" src="/icons/coin.png" alt="men" />
            </div>

            <p className="font-bold text-center my-3">
              Fund Yourself
            </p>

            <p className="text-center my-2">
              Your fans are available to help you
            </p>

          </div>

          <div className="max-w-xs">

            <div className="bg-green-500 hover:bg-green-400 rounded-full p-8 sm:p-10 flex flex-col justify-center items-center hover:border border-slate-300">
              <img className="py-5 w-24 sm:w-30" src="/icons/group.png" alt="men" />
            </div>

            <p className="font-bold text-center my-3">
              Fund Yourself
            </p>

            <p className="text-center my-2">
              Your fans are available to help you
            </p>

          </div>

        </div>

      </div>

      <div className="bg-white h-0.5 opacity-15"></div>

      <div className="text-white mx-auto my-10 px-4">

        <h2 className="text-center font-bold text-2xl sm:text-3xl my-5">
          Your Fans Can Buy You A Coffee
        </h2>

        <div className="flex justify-center items-center my-10 sm:my-20">

          <iframe
            className="hover:border border-slate-300 w-full max-w-5xl h-55 sm:h-87.5 md:h-125 rounded-xl"
            src="https://www.youtube.com/embed/D6jDmCQIink?si=2xaqRngELxEbWrwL"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

        </div>

      </div>
    </>
  );
}