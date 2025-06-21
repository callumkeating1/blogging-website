import Topbar from "../../Components/topbar";
import Contents from "../../Components/contents";

export default function MainPage() {

    return (
        <div className='w-screen h-screen flex bg-white flex-col dark:bg-zinc-800'>
            <Topbar />
            <Contents />
        </div>
    );
}
