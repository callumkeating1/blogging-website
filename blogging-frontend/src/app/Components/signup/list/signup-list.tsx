import SignupButton from '@/app/Components/signup/button/signup-button'


export default function SignupList () {
    return (
        <div className='flex flex-col bg-purple-700 h-screen'>
            <h1 className='self-center text-xl bg-purple-600 mt-2'>sign up</h1>
            <br/>
            <div className="flex flex-col items-center gap-3">
                <SignupButton placeholder="email" type="email" />
                <SignupButton placeholder="username" type="text" />
                <SignupButton placeholder="password" type="password" />
            </div>
        </div>
    )
}
