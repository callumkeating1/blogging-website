'use client';
import { useParams } from 'next/navigation';

export default function AccountPage() {
    const router = useParams();
    const user = router.user;

    return <p>Account: {user}</p>;
}
