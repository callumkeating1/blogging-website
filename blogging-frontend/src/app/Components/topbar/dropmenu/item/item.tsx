import Image from "next/image"




interface ItemProps {
    IconUrl: string,
    Text: string
}

export default function Item(props:ItemProps) {
    return (
        <>
            <div className="flex bg-[hsl(255,42%,50%)] hover:bg-[hsl(255,38%,59%)] dark:bg-[hsl(253,48%,56%)] dark:hover:bg-zinc-500 p-1 rounded-lg mb-3 duration-500">
                <Image src={props.IconUrl} alt={props.Text} />
                <p className="text-sm font-semibold ml-1">{props.Text}</p>
            </div>
        </>
    )
}