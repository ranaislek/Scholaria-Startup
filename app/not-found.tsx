import Link from "next/link";
import { TbWorldOff } from "react-icons/tb";

export default function NotFound() {
  return (
    <div className="w-full h-screen bg-primary flex flex-col justify-center items-center gap-10">
      <TbWorldOff color="white" size={100} />
      <div className="text-white text-3xl">Page not found</div>
      <Link href="/home">
        <div className="px-4 flex justify-center items-center h-10 min-w-24 cursor-pointer text-primary gap-1 py-1 bg-white rounded-md">
          <div>Go back home</div>
        </div>
      </Link>
    </div>
  );
}
