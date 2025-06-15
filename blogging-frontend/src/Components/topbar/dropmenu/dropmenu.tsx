interface DropMenuProps {
    isActive: boolean
}
export default function DropMenu(props:DropMenuProps) {
    if (props.isActive) {
        return (
            <div>
                <h1>dropdown menu</h1>
            </div>
        )
    }
}