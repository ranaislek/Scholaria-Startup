import Image from "next/image";
import ScholariaBlueLogo from "@/assets/scholaria-logo-blue.png";
import Loader from "./loader";

export default function PageLoader() {
  return (
    <div className="w-full h-screen bg-primary flex flex-col justify-center items-center gap-6">
      <Image
        src={ScholariaBlueLogo}
        width={50}
        height={50}
        alt={"Scholaria"}
        className="mb-10"
      />
      <Loader color="white" />
    </div>
  );
}
