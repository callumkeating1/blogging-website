import SignupButton from '@/app/Components/signup/button/signup-button'


export default function Page() {
    return (
        <div className="h-full w-full bg-white">
            <h1>signup</h1>
            <div className="flex flex-col items-center gap-3">
                <SignupButton placeholder="email" type="email" ></SignupButton>
                <SignupButton placeholder="username" type="text" ></SignupButton>
                <SignupButton placeholder="password" type="password" ></SignupButton>
            </div>
        </div>
    )
}
