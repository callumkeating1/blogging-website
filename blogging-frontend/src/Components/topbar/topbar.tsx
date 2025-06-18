import DropMenu from "./dropmenu";
import React, { useState } from 'react';
export default function Topbar() {
    const [DropMenuActive, IsActive] = useState<boolean>(false);
    function toggleMenu() {
        DropMenuActive ? IsActive(false) : IsActive(true);
        console.log("button pressed DropMenuActive is now ", DropMenuActive);
    }
    return (
        <div className="h-fit w-screen bg-gray-300 rounded-3xl p-6 grid grid-cols-9">
            <h1 className="text-2xl font-bold place-items-center col-start-4 col-span-3">blogging website</h1>
            <div className="col-start-8 col-span-2 self-center flex justify-end" >
                <button className="text-sm bg-gray-500 w-fit h-fit rounded-lg p-1" onClick={toggleMenu}>account</button>
                {DropMenuActive ? <DropMenu toggleMenu={toggleMenu} /> : null}
            </div>
        </div>
    );
}
