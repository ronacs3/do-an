import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema } from '../../../../validation/schema';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

type SigninDatas = {
    username: string;
    password: string;
};
export default function Signin() {
    const [submitForm, setSubmitForm] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('auth');
        if (token && !submitForm) {
            toast("You're logged in, redirect...", {
                icon: '🔔',
                style: {
                    borderRadius: '8px',
                    background: '#333',
                    color: '#fff',
                },
            });
            router.push('/');
        }
    }, []);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SigninDatas>({ resolver: zodResolver(SignInSchema) });
    const handleSignIn: SubmitHandler<SigninDatas> = async (e: SigninDatas) => {
        setSubmitForm(true);
        const signInToast = toast.loading('Signing in your account...', {
            style: {
                borderRadius: '8px',
                background: '#333',
                color: '#fff',
            },
        });
        try {
            const response = await fetch('http://localhost:8080/auth/signin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(e),
            });
            const res = await response.json();
            if (res.success && res.data.access_token) {
                localStorage.setItem('auth', res.data.access_token);
                toast.success('Signed in, redirect...', {
                    id: signInToast,
                    style: {
                        borderRadius: '8px',
                        background: '#333',
                        color: '#fff',
                    },
                });
                router.push('/');
            } else {
                toast.error(res.error, {
                    id: signInToast,
                    style: {
                        borderRadius: '8px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            }
        } catch (error) {
            toast.error('Could not signing in...', {
                id: signInToast,
                style: {
                    borderRadius: '8px',
                    background: '#333',
                    color: '#fff',
                },
            });
            console.log(error);
        }
    };
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="h-screen grid justify-center items-center bg-slate-100">
                <form className="p-20 bg-white" onSubmit={handleSubmit(handleSignIn)}>
                    <div className="flex justify-center pb-5">LOGIN</div>
                    <div className="flex flex-col gap-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="border rounded p-1"
                            required
                            {...register('username')}
                            id="username"
                        />
                        <p className="text-red-600">{errors.username?.message}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="border rounded p-1"
                            placeholder="******"
                            required
                            {...register('password')}
                            id="password"
                        />
                        <p className="text-red-600">{errors.password?.message}</p>
                    </div>
                    <div className="flex flex-row gap-1 pt-2 text-sm">
                        <div>Don't have an account?</div>
                        <Link href="/Auth/Sign-up" className="text-cyan-400 underline">
                            Register Here
                        </Link>
                    </div>
                    <div className=" flex justify-center pt-4">
                        <button className="border px-5 py-2 rounded-lg hover:bg-sky-400" type="submit">
                            <div>Sign In</div>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
