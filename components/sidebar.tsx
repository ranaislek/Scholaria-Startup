import { ReactElement, useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { GrCommand } from "react-icons/gr";
import Link from "next/link";
import Image from "next/image";
import SearchButton from "./search-button";
import { useSideBar } from "@/contexts/sidebar.context";
import { RiArrowLeftDoubleLine } from "react-icons/ri";
import { MdDriveFolderUpload } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";

type SideBarItem = {
  title: string;
  description?: string;
  route?: string;
  id: number;
  icon?: ReactElement;
};

const SideBar = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useSideBar();
  const [selectedItem, setSelectedItem] = useState<number>();

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const homeRoute: SideBarItem = {
    title: "Home",
    id: 0,
    route: "/home",
    icon: (
      <AiOutlineHome
        size={25}
        className="cursor-pointe hover:text-opacity-75"
      />
    ),
  };

  const listOfWorkplaces: SideBarItem[] = [
    {
      title: "Category 1",
      id: 1,
    },
    {
      title: "Category 2",
      id: 2,
    },
    {
      title: "Category 3",
      id: 3,
    },
  ];

  const listOfRoutes: SideBarItem[] = [
    {
      title: "My Drive",
      description: "Handle all your papers uploads.",
      id: 4,
      route: "/my-drive",
      icon: (
        <MdDriveFolderUpload
          size={25}
          className="cursor-pointe hover:text-opacity-75"
        />
      ),
    },
  ];

  return (
    <div
      className={
        `fixed h-screen bg-primary flex flex-col justify-between p-4 pt-14 z-50 text-white transition-all duration-300 ` +
        (isSideBarOpen ? "w-80" : "w-20")
      }
    >
      <div className="flex flex-col gap-2">
        <SearchButton />
        {isSideBarOpen && (
          <div className="flex gap-1 mt-1 text-xs opacity-70 items-center">
            <span>Or use the shortcut,</span>
            <GrCommand size={10} />
            <span>+ S</span>
          </div>
        )}
        <div className="h-4"></div>
        <Link href={"/home"}>
          <div
            className={
              "flex items-center cursor-pointer p-2 bg-white rounded-md " +
              (selectedItem === homeRoute.id
                ? "text-primary bg-opacity-100 "
                : "text-white bg-opacity-5 hover:bg-opacity-15 ") +
              (isSideBarOpen ? "justify-between" : "justify-center")
            }
            onClick={() => setSelectedItem(homeRoute.id)}
          >
            {isSideBarOpen ? (
              <>
                <div className="flex flex-col">
                  <div>{homeRoute.title}</div>
                  {homeRoute.description && (
                    <div className="mt-1 text-xs opacity-70">
                      {homeRoute.description}
                    </div>
                  )}
                </div>
                <IoIosArrowForward />
              </>
            ) : (
              homeRoute.icon
            )}
          </div>
        </Link>
        <div className="h-4"></div>
        <div
          className={
            "flex items-center " +
            (isSideBarOpen ? "justify-between" : "justify-center")
          }
        >
          {isSideBarOpen && (
            <div className="p-2 font-bold my-1">{"Workspaces"}</div>
          )}
          <IoAddCircle
            size={30}
            className="cursor-pointer text-white hover:text-opacity-75"
          />
        </div>
        {listOfWorkplaces.map((c) => (
          <div
            key={c.id}
            className={
              "flex items-center cursor-pointer p-2 bg-white rounded-md " +
              (selectedItem === c.id
                ? "text-primary bg-opacity-100 "
                : "text-white bg-opacity-5 hover:bg-opacity-15 ") +
              (isSideBarOpen ? "justify-between" : "justify-center")
            }
            onClick={() => setSelectedItem(c.id)}
          >
            <div>
              {isSideBarOpen ? c.title : c.title.slice(0, 2).toUpperCase()}
            </div>
          </div>
        ))}
        <div className="h-4"></div>
        {listOfRoutes.map((c) => (
          <Link key={c.id} href={c.route!}>
            <div
              className={
                "flex items-center cursor-pointer p-2 bg-white rounded-md " +
                (selectedItem === c.id
                  ? "text-primary bg-opacity-100 "
                  : "text-white bg-opacity-5 hover:bg-opacity-15 ") +
                (isSideBarOpen ? "justify-between" : "justify-center")
              }
              onClick={() => setSelectedItem(c.id)}
            >
              {isSideBarOpen ? (
                <>
                  <div className="flex flex-col">
                    <div>{c.title}</div>
                    {c.description && (
                      <div className="mt-1 text-xs opacity-70">
                        {c.description}
                      </div>
                    )}
                  </div>
                  <IoIosArrowForward />
                </>
              ) : (
                c.icon
              )}
            </div>
          </Link>
        ))}
      </div>
      <div
        className={
          "flex justify-between items-center " +
          (isSideBarOpen ? "" : "flex-col-reverse gap-4")
        }
      >
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
          {isSideBarOpen && (
            <div className="flex flex-col">
              <div className="font-bold"> Marie </div>
              <div className="font-light text-sm"> marie.curie@gmail.com </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <IoSettingsSharp
            size={25}
            className="cursor-pointer text-white hover:text-opacity-75"
          />
        </div>
      </div>
      <div
        className="cursor-pointer absolute top-2 -right-4 p-1 bg-white text-primary rounded-lg shadow-lg z-50 "
        onClick={toggleSidebar}
      >
        <RiArrowLeftDoubleLine
          size={20}
          className={`transition-all duration-300 transform ${
            isSideBarOpen ? "" : "rotate-180"
          }`}
        />
      </div>
    </div>
  );
};

export default SideBar;
