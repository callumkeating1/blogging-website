interface SignupButtonProps {
    type:string
    placeholder:string
}


export default function SignupButton (props:SignupButtonProps) {
    return (
        <input type={props.type} placeholder={props.placeholder} className="bg-purple-200 text-gray-900 p-5 rounded-xl hover:bg-purple-300 duration-500"/>
    )
}
