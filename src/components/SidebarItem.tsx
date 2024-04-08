"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { CiBookmarkCheck } from "react-icons/ci";

interface SidebarItemProps {
  icon: ReactNode;
  path: string;
  label: string;
}

const SidebarItem = ({
  icon = <CiBookmarkCheck />,
  path = "#",
  label,
}: SidebarItemProps) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl hover:bg-sky-600 hover:text-white ${
          path === pathname
            ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
            : ""
        }`}
      >
        {icon}
        <span className="-mr-1 font-medium">{label}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
