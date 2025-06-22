import { JSX } from "react"

interface ItemProps {
    IconUrl: string ,
    Text: string
}

export default function Item(props:ItemProps) {
    return (
        <>
            <div className="flex bg-zinc-600 dark:bg-zinc-400 p-1 rounded-lg mb-3 hover:bg-zinc-700 dark:hover:bg-zinc-500 duration-500">
                <img src={props.IconUrl} alt={props.Text} />
                <p className="text-sm ml-1">{props.Text}</p>
            </div>
        </>
    )
}