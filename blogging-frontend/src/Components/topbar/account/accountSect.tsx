interface accountProps {
    username: string
}
export default function AccountSection(props:accountProps) {
    return (
        
        <h1 className="content-center justify-self-end">{props.username}</h1>
    )
}