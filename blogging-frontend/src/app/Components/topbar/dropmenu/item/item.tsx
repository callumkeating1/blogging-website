interface ItemProps {
    IconUrl: string,
    Text: string
}

export default function Item(props:ItemProps) {
    return (
        <>
            <div className="flex bg-[#6449b4] hover:bg-[#8370be] dark:bg-[#7058c4] dark:hover:bg-zinc-500 p-1 rounded-lg mb-3 duration-500">
                <img src={props.IconUrl} alt={props.Text} />
                <p className="text-sm font-semibold ml-1">{props.Text}</p>
            </div>
        </>
    )
}