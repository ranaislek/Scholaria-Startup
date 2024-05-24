import Image from "next/image";
import ScholariaBlueLogo from "@/assets/scholaria-logo-blue.png";
import HeroBackground from "@/assets/hero_landing.jpg";
import Link from "next/link";
import { FaLinux } from "react-icons/fa";
import { SiMacos } from "react-icons/si";
import { FaWindows } from "react-icons/fa";

export default function LandingPage() {
  return (
    <>
      <div
        className="absolute top-0 w-full h-screen bg-center bg-cover bg-opacity-40 z-10"
        style={{
          backgroundImage: `url(${HeroBackground.src})`,
        }}
      ></div>
      <div className="z-20 absolute top-0 w-full h-screen backdrop-blur-lg bg-primary bg-opacity-30 mix-blend-soft-light"></div>
      <div className="z-50 fixed top-0 text-white font-bold bg-white bg-opacity-5 w-full h-20 bg-transparent backdrop-blur-sm flex justify-between items-center px-10 shadow-lg">
        <div className="flex gap-2 items-center">
          <Image
            src={ScholariaBlueLogo}
            width={40}
            height={40}
            alt={"Scholaria"}
          />
          <div className="text-xl font-bold">Scholaria</div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/landing">
            <div className="hover:text-primary p-2">About</div>
          </Link>
          <Link href="/landing">
            <div className="hover:text-primary p-2">Contact</div>
          </Link>
          <Link href={"/register"}>
            <div
              style={{ borderWidth: 1 }}
              className="hover:bg-opacity-75 flex justify-center items-center h-10 min-w-32 cursor-pointer text-white gap-1 px-2 py-1 bg-primary rounded-md"
            >
              <div>Get Started</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="absolute top-0 z-30 min-h-screen w-full flex justify-start items-center">
        <div className="flex flex-col gap-10 w-full px-20 text-white">
          <div className="w-max">
            <div className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-6xl font-bold">
              Your Research AI Assistant{" "}
            </div>
          </div>
          <div className="text-lg w-1/2">
            Scholaria revolutionizes research by combining AI-driven efficiency
            with ethical integrity. Our platform streamlines the management and
            exploration of academic literature, helping scholars effortlessly
            organize, comprehend, and discover research papers.
          </div>
          <div className="mt-20 self-center w-max flex flex-col justify-center items-center">
            <div className="text-lg font-bold">Available on</div>
            <div className="flex items-center text-white gap-6">
              <SiMacos size={65} />
              <FaWindows size={40} />
              <FaLinux size={40} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
