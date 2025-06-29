"use client";
import React, { useState } from 'react';
import DropMenu from "./dropmenu";

export default function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log("TOGGLING MENU");
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full px-6 py-4 bg-[hsl(255,69%,64%)] dark:bg-[hsl(255,52%,37%)] rounded-3xl flex items-center justify-between">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16" 
            className="p-1 rounded-lg text-sm bg-[hsl(255,67%,58%)] hover:bg-[hsl(255,75%,59%)] dark:bg-[hsl(255,46%,53%)] dark:text-gray-200 duration-500" onClick={toggleMenu}
        >
            <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
        </svg>

        {isMenuOpen && (
          <DropMenu toggleMenu={toggleMenu} dropMenuActive={isMenuOpen} />
        )}
      </div>

      <h1 className="text-2xl font-bold dark:text-gray-300 text-center">
        blogging website
      </h1>

      <div className="w-[32px]" />
    </div>
  );
}
