import Topbar from "./Components/topbar";
import Contents from "./Components/contents";


export default function MainPage() {
    // this is the main page that will load with / only components should be placed in here
    return (
        <div className='w-screen h-screen flex bg-white flex-col dark:bg-[hsl(255,65%,35%)]'>
            <Topbar />
            <Contents />
        </div>
    );
}
