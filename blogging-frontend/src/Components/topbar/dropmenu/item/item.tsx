import { JSX } from "react"

interface ItemProps {
    IconUrl: string ,
    Text: string
}

export default function Item(props:ItemProps) {
    return (
        <>
            <div className="flex bg-[#6449b4] hover:bg-[#8370be] dark:bg-zinc-400 p-1 rounded-lg mb-3 dark:hover:bg-zinc-500 duration-500">
                <img src={props.IconUrl} alt={props.Text} />
                <p className="text-sm font-semibold ml-1">{props.Text}</p>
            </div>
        </>
    )
}