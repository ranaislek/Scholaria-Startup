import Image from "next/image";
import ScholariaBlueLogo from "@/assets/scholaria-logo-blue.png";
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={
        "bg-primary w-screen h-screen flex flex-col justify-center items-center"
      }
    >
      <div className="p-6 flex flex-col  justify-center items-center gap-2 bg-white shadow-md min-h-96 w-96 rounded-md">
        <Image
          src={ScholariaBlueLogo}
          width={50}
          height={50}
          alt={"Scholaria"}
          className="mb-10"
        />
        {children}
      </div>
    </div>
  );
}
