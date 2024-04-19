import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiLogout } from "react-icons/ci";
import SidebarItem from "./SidebarItem";
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonAddOutline,
} from "react-icons/io5";
import { auth } from "@/auth";
import { LogoutButton } from "./LogoutButton";

export const Sidebar = async () => {
  const sidebarItems = [
    {
      icon: <IoCalendarOutline />,
      path: "/dashboard",
      label: "Dashboard",
    },
    {
      icon: <IoCheckboxOutline />,
      path: "/dashboard/rest-todos",
      label: "REST Todos",
    },
    {
      icon: <IoListOutline />,
      label: "Server Actions",
      path: "/dashboard/server-actions",
    },
    {
      icon: <IoCodeWorkingOutline />,
      label: "Cookies",
      path: "/dashboard/cookies",
    },
    {
      icon: <IoBasketOutline />,
      label: "products",
      path: "/dashboard/products",
    },
    {
      icon: <IoPersonAddOutline />,
      label: "Profile",
      path: "/dashboard/profile",
    },
  ];

  const session = await auth();

  const userName = session?.user?.name ?? "-";
  const userRoles = session?.user?.roles ?? ["client"];
  const userImage =
    session?.user?.image ??
    "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="#" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              width={32}
              height={32}
              alt="tailus logo"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={userImage}
            alt=""
            width={32}
            height={32}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-400 lg:block">
            {userRoles.join(",")}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
          {sidebarItems.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
