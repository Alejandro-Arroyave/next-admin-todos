import React from "react";
import { CiBookmarkCheck } from "react-icons/ci";

interface SidebarItemProps {
  link: string;
  label: string;
  isSelected?: boolean;
}

const SidebarItem = ({
  link = "#",
  label,
  isSelected = false,
}: SidebarItemProps) => {
  return (
    <li>
      <a
        href={link}
        className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${
          isSelected
            ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
            : ""
        }`}
      >
        <CiBookmarkCheck size={30} />
        <span className="-mr-1 font-medium">{label}</span>
      </a>
    </li>
  );
};

export default SidebarItem;
