import Topbar from "../../Components/topbar";
import Contents from "../../Components/contents";
import { createContext, useState } from "react";

// 👇 Capitalized for correct usage in JSX
export const IsClickedContext = createContext<boolean>(false);

export default function MainPage() {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
    };

    return (
        <IsClickedContext.Provider value={isClicked}>
            <div className='w-screen h-screen flex bg-white flex-col' onClick={handleClick}>
                <Topbar />
                <Contents />
            </div>
        </IsClickedContext.Provider>
    );
}
