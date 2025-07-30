interface SignupButtonProps {
    type:string
    placeholder:string
}


export default function SignupButton (props:SignupButtonProps) {
    return (
        <input type={props.type} placeholder={props.placeholder} className="bg-gray-200 p-5 rounded-xl"/>
    )
}
