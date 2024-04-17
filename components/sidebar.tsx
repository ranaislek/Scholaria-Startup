"use client";
import Image from "next/image";
import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import ScholariaLogoWhite from "@/assets/scholaria-logo-white.png";
import { LuExternalLink } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";

type SideBarItem = {
  title: string;
  description?: string;
  id: number;
};

const SideBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState<number>();

  const listOfWorkplaces: SideBarItem[] = [
    {
      title: "Category #01",
      id: 0,
    },
    {
      title: "Category #02",
      id: 1,
    },
    {
      title: "Category #03",
      id: 2,
    },
    {
      title: "Category #04",
      id: 3,
    },
  ];

  const listOfRoutes: SideBarItem[] = [
    {
      title: "My Drive",
      description: "Handle all your papers uploads.",
      id: 4,
    },
  ];
  return (
    <div className="fixed h-screen bg-primary flex flex-col justify-between p-4 w-80 z-50  text-white">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="p-2 font-bold my-1">{"Workspaces"}</div>
          <IoAddCircle
            size={25}
            className="cursor-pointer text-white hover:text-opacity-75"
          />
        </div>
        {listOfWorkplaces.map((c) => (
          <div
            key={c.id}
            className={
              "flex justify-between items-center cursor-pointer p-2 bg-white rounded-md " +
              (selectedItem === c.id
                ? "text-primary bg-opacity-100"
                : "text-white bg-opacity-5 hover:bg-opacity-15")
            }
            onClick={() => setSelectedItem(c.id)}
          >
            <div>{c.title}</div>
          </div>
        ))}
        <div className="h-10"></div>
        {listOfRoutes.map((c) => (
          <div
            key={c.id}
            className={
              "flex justify-between items-center cursor-pointer p-2 bg-white rounded-md " +
              (selectedItem === c.id
                ? "text-primary bg-opacity-100"
                : "text-white bg-opacity-5 hover:bg-opacity-15")
            }
            onClick={() => setSelectedItem(c.id)}
          >
            <div className="flex flex-col">
              <div>{c.title}</div>
              {c.description && (
                <div className="mt-1 text-xs opacity-70">{c.description}</div>
              )}
            </div>
            <IoIosArrowForward />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="cursor-pointer flex items-center gap-2 opacity-100 hover:opacity-75">
          <Image
            src={
              "https://www.svgrepo.com/show/382099/female-avatar-girl-face-woman-user-2.svg"
            }
            width={50}
            height={50}
            alt="scholaria-logo"
            className="rounded-full border-white border-2"
          />
          <div className="flex flex-col">
            <div className="font-bold"> Marie </div>
            <div className="font-light text-sm"> marie.curie@gmail.com </div>
          </div>
        </div>
        <div className="flex gap-2">
          <IoSettingsSharp
            size={25}
            className="cursor-pointer text-white hover:text-opacity-75"
          />
          {/* <LuExternalLink
            size={25}
            className="cursor-pointer text-white hover:text-opacity-75"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
