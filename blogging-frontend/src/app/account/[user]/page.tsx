'use client';
import { useParams } from 'next/navigation';
import Contents from '@/app/Components/contents';
export default function AccountPage() {
    const { user } = useParams() as { user?: string | string[] };
    if (user === undefined || Array.isArray(user)) {
        return (
            <p>specify a username</p>
        )
    }
    console.log("user: ", user);
    return (
        <div className='w-screen h-screen dark:bg-[hsl(255,65%,35%)] flexbox flex-row'>
            <p className='bg-purple-600 dark:bg-purple-800 p-5 rounded-lg'>{`Welcome to ${user}'s profile!`}</p>
            <Contents username={user} /> 
        </div>
    )
}
