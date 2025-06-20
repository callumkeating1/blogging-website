import Topbar from "../../Components/topbar";
import Contents from "../../Components/contents";
import { createContext, useState } from "react";


interface IsClickedContextType {
    isClicked: boolean;
    setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}
export const IsClickedContext = createContext<IsClickedContextType>({ isClicked: false, setIsClicked: () => {} });


export default function MainPage() {
    const [isClicked, setIsClicked] = useState(false);
    
    const handleClick = () => {
        console.log("clicked");
        setIsClicked(true);
    };

    return (
        <IsClickedContext.Provider value={{ isClicked, setIsClicked }}>
            <div className='w-screen h-screen flex bg-white flex-col' onClick={handleClick}>
                <Topbar />
                <Contents />
            </div>
        </IsClickedContext.Provider>
    );
}
