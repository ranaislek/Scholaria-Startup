import {
  ChangeEventHandler,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GoCheckCircle } from "react-icons/go";
import { TbFileBroken } from "react-icons/tb";
import { useToasts } from "@/contexts/toast.context";
import { useRouter } from "next/navigation";
import { useWorkspace } from "@/contexts/workspace.context";
import { IWorkspace } from "@/models/workspace";
import { useAuth } from "@/contexts/auth.context";
import Avatar from "boring-avatars";

type SideBarItem = {
  title: string;
  description?: string;
  route: string;
  id: string;
  icon?: ReactElement;
};

const MAXIMUM_NUMBER_WORKSPACES = 3;

const SideBar = () => {
  const homeRoute: SideBarItem = {
    title: "Home",
    id: "home",
    route: "/home",
    icon: (
      <AiOutlineHome
        size={25}
        className="cursor-pointe hover:text-opacity-75"
      />
    ),
  };

  const listOfRoutes: SideBarItem[] = [
    {
      title: "My Library",
      description: "Handle all your papers uploads.",
      id: "mydrive",
      route: "/mylibrary",
      icon: (
        <MdDriveFolderUpload
          size={25}
          className="cursor-pointe hover:text-opacity-75"
        />
      ),
    },
  ];

  const router = useRouter();
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const editContainer: RefObject<HTMLDivElement> = useRef(null);
  const settingsContainer: RefObject<HTMLDivElement> = useRef(null);
  const { isSideBarOpen, setIsSideBarOpen } = useSideBar();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showUserOptionsDropdown, setShowUserOptionsDropdown] =
    useState<boolean>(false);
  const [listOfWorkspaces, setListOfWorkspaces] = useState<SideBarItem[]>([]);
  const [newWorkspaceName, setNewWorkspaceName] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>(homeRoute.id);
  const toast = useToasts();
  const { workspaces, addNewWorkspace } = useWorkspace();
  const { logout, user } = useAuth();

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleAddWorkspace = () => {
    if (listOfWorkspaces.length >= MAXIMUM_NUMBER_WORKSPACES) {
      toast.warn("You reached the limit of free workspaces.");
      return;
    }
    setIsSideBarOpen(true);
    setIsEditing(true);
  };

  const handleNewWorkspaceName: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setNewWorkspaceName(event.target.value);
  };

  const cancelNewWorkspace = () => {
    setIsEditing(false);
  };

  const saveNewWorkspace = async () => {
    // TODO: change this to API given id
    if (newWorkspaceName.trim().length === 0) return;
    const newId = new Date().getTime().toString();
    const newWorkspace: IWorkspace = {
      name: newWorkspaceName,
      id: newId,
      createdOn: new Date(),
      papers: [],
    };
    await addNewWorkspace(newWorkspace);
    setIsEditing(false);
    setSelectedItem(newId);
    router.push(`/workspace?id=${newId}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      saveNewWorkspace();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editContainer.current &&
        !editContainer.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.body.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsContainer.current &&
        !settingsContainer.current.contains(event.target as Node)
      ) {
        setShowUserOptionsDropdown(false);
      }
    };

    if (showUserOptionsDropdown) {
      document.body.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserOptionsDropdown]);

  useEffect(() => {
    if (isEditing) {
      inputRef?.current?.focus();
    }
    setNewWorkspaceName("");
  }, [isEditing]);

  useEffect(() => {
    const workspacesSidebarItems: SideBarItem[] = workspaces.map((w) => {
      return {
        title: w.name,
        route: `/workspace?id=${w.id}`,
        id: w.id,
      };
    });
    setListOfWorkspaces(workspacesSidebarItems);
  }, [workspaces]);

  return (
    <div
      className={
        `fixed h-screen bg-primary flex flex-col justify-between p-4 pt-14 z-40 text-white transition-all duration-300 ` +
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
            onClick={handleAddWorkspace}
            size={30}
            className="cursor-pointer text-white hover:text-opacity-75"
          />
        </div>
        {isSideBarOpen && listOfWorkspaces.length === 0 && !isEditing && (
          <div className="opacity-50 flex flex-col justify-center items-center gap-2">
            <TbFileBroken size={50} />
            <div>Looks empty here... </div>
          </div>
        )}
        {listOfWorkspaces.map((c) => (
          <Link key={c.id} href={c.route}>
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
              <div>
                {isSideBarOpen ? c.title : c.title.slice(0, 2).toUpperCase()}
              </div>
            </div>
          </Link>
        ))}
        {isSideBarOpen && isEditing && (
          <div
            ref={editContainer}
            className="rounded-md bg-white bg-opacity-45 p-2 flex justify-between items-center"
          >
            <input
              value={newWorkspaceName}
              className="appearnce-none bg-transparent"
              type="text"
              onChange={handleNewWorkspaceName}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            <div className="flex justify-center items-center">
              <GoCheckCircle
                onClick={saveNewWorkspace}
                size={27}
                className="cursor-pointer text-white text-opacity-50 hover:text-opacity-100"
              />
              <IoIosCloseCircleOutline
                onClick={cancelNewWorkspace}
                size={30}
                className="cursor-pointer text-white text-opacity-50 hover:text-opacity-100"
              />
            </div>
          </div>
        )}
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
          {user?.email && (
            <div className="rounded-full border-white border-2">
              <Avatar
                size={50}
                name={user?.email}
                variant="beam"
                colors={["#beed80", "#59d999", "#31ada1", "#51647a", "#453c5c"]}
              />
            </div>
          )}
          {isSideBarOpen && (
            <div className="flex flex-col">
              <div className="font-bold"> </div>
              <div className="font-light text-sm">
                {" "}
                {user?.email?.split("@")[0]}{" "}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <IoSettingsSharp
            onClick={() => {
              setShowUserOptionsDropdown(!showUserOptionsDropdown);
            }}
            size={25}
            className="cursor-pointer text-white hover:text-opacity-75"
          />
          {showUserOptionsDropdown && (
            <div
              ref={settingsContainer}
              className={
                "w-48 absolute bottom-8 p-2 bg-white shadow-lg rounded-md transition-all duration-300 " +
                (isSideBarOpen ? "left-80" : "left-20")
              }
            >
              <div className="hover:bg-gray-100 p-2 text-primary rounded-md cursor-pointer">
                Account Details
              </div>
              <div className="hover:bg-gray-100 p-2 text-primary rounded-md cursor-pointer">
                Billing
              </div>
              <div
                className="hover:bg-gray-100 p-2 text-primary rounded-md cursor-pointer"
                onClick={() => logout()}
              >
                Logout
              </div>
            </div>
          )}
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
