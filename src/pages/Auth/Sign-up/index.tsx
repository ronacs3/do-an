import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema } from '../../../../validation/schema';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
type SignupDatas = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function Signup() {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('auth');
        if (token) {
            router.push('/');
        }
    }, []);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignupDatas>({ resolver: zodResolver(SignUpSchema) });
    const handleSignUP: SubmitHandler<SignupDatas> = async (e: SignupDatas) => {
        try {
            const response = await fetch('http://localhost:8080/auth/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(e),
            });
            const res = await response.json();
            if (res?.success) {
                router.push('/Auth/Sign-in');
            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="h-screen grid justify-center items-center bg-slate-50">
            <form className="border p-20 bg-white" onSubmit={handleSubmit(handleSignUP)}>
                <div className="flex justify-center pb-3"> Register </div>
                <div className="flex flex-col gap-1">
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
                <div className="flex flex-col gap-1">
                    <label>Email</label>
                    <input
                        type="email"
                        className="border rounded p-1"
                        placeholder="abcxyz@gmail.com"
                        required
                        {...register('email')}
                        id="email"
                    />
                    <p className="text-red-600">{errors.email?.message}</p>
                </div>
                <div className="flex flex-col gap-1">
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
                <div className="flex flex-col gap-1">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        className="border rounded p-1"
                        placeholder="******"
                        required
                        {...register('confirmPassword')}
                        id="confirmPassword"
                    />
                    <p className="text-red-600">{errors.confirmPassword?.message}</p>
                </div>
                <div className=" flex justify-center pt-4">
                    <button className="border p-1 rounded-lg hover:bg-cyan-300" type="submit">
                        <div>Register</div>
                    </button>
                </div>
            </form>
        </div>
    );
}
