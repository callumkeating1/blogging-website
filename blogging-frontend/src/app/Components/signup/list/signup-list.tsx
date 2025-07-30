'use client';
import SignupButton from '@/app/Components/signup/button/signup-button'


export default function SignupList () {
    function signup(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Stop default form submission

        const formData = new FormData(event.currentTarget); // ✅ attach to form
        const email = formData.get("email");
        const username = formData.get("username");
        const password = formData.get("password");
        console.log(email, "   ", username, "   ", password);
    }
    return (
        <div className='flex flex-col bg-purple-700 h-screen'>
            <h1 className='self-center text-xl bg-purple-600 mt-2'>sign up</h1>
            <br/>
            <form onSubmit={signup}>
                <div className="flex flex-col items-center gap-3 h-screen">
                    <SignupButton placeholder="email" type="email"/>
                    <SignupButton placeholder="username" type="text"/>
                    <SignupButton placeholder="password" type="password"/>
                    <button className='bg-purple-600 text-white p-2 rounded-md lg:p-4 text-lg duration-500 hover:p-3 lg:hover:p-6 lg:hover:text-xl' type='submit'>sign up!</button>
                </div>
            </form>
        </div>
    )
}
