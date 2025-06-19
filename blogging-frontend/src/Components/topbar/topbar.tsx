import DropMenu from "./dropmenu";
import React, { useState } from 'react';
export default function Topbar() {
    const [DropMenuActive, IsActive] = useState<boolean>(false);
    function toggleMenu() {
        DropMenuActive ? IsActive(false) : IsActive(true);
    }
    return (
        <div className="h-fit w-screen bg-gray-300 rounded-3xl p-6 grid grid-cols-9">
            <h1 className="text-2xl font-bold place-items-center col-start-4 col-span-3">blogging website</h1>
            <div className="col-start-8 col-span-2 self-center flex justify-end" >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="text-sm bg-gray-500 w-fit h-fit rounded-lg p-1" viewBox="0 0 16 16" onClick={toggleMenu}>
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
                {DropMenuActive ? <DropMenu toggleMenu={toggleMenu} /> : null}
            </div>
        </div>
    );
}
