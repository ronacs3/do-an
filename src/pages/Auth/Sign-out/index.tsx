import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function SignOut() {
    const router = useRouter();
    useEffect(() => {
        localStorage.removeItem('auth');
        router.push('/Auth/Sign-in');
    });
}
