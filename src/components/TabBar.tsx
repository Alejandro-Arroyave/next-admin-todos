"use client";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

// https://tailwindcomponents.com/component/radio-buttons-1

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4, 5],
}: Props) => {
  const [selected, setSelected] = useState(currentTab);
  const router = useRouter();

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selectedTab", tab.toString());
    router.refresh();
  };
  return (
    <div
      className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 ${"grid-cols-5"}`}
    >
      {tabOptions.map((opt) => (
        <div key={opt}>
          <input
            type="radio"
            checked={selected === opt}
            onChange={() => {}}
            id={tabOptions.toString()}
            className="peer hidden"
          />
          <label
            onClick={() => onTabSelected(opt)}
            className="block cursor-pointer select-none rounded-xl p-2 text-center transition-all peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {opt}
          </label>
        </div>
      ))}
    </div>
  );
};
