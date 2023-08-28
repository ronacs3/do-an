import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePassword, ChangeProfile } from '../validation/schema';
import { type, userInfo } from 'os';
import { useEffect } from 'react';
import { getUser } from '../lib/ultis';
type PasswordData = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};
const UserChangePassword = () => {
    const router = useRouter();
    const [submitForm, setSubmitForm] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<PasswordData>({ resolver: zodResolver(ChangePassword) });

    const handleChangePassword: SubmitHandler<PasswordData> = async (e: PasswordData) => {
        setSubmitForm(true);
        const token = localStorage.getItem('auth');
        try {
            const response = await fetch('http://localhost:8080/users/me/change-password', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(e),
            });
            const res = await response.json();
            if (res.success) {
                router.push('/Auth/Sign-out');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="h-2/4 flex flex-col items-center">
            <div className="pt-10">CHANGE PASSWORRD</div>
            <div className="pt-10">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleChangePassword)}>
                    <div>
                        <label className="pr-x">OldPassword</label>
                        <input
                            type="password"
                            className="border rounded"
                            placeholder="******"
                            {...register('oldPassword')}
                            id="oldPassword"
                        />
                        <p className="text-red-600">{errors.oldPassword?.message}</p>
                    </div>
                    <div>
                        <label className="pr-y">NewPassword</label>
                        <input
                            type="password"
                            className="border rounded"
                            placeholder="******"
                            {...register('newPassword')}
                            id="newPassword"
                        />
                        <p className="text-red-600">{errors.newPassword?.message}</p>
                    </div>
                    <div className=" flex gap-3">
                        <label>ConfirmNewPassword</label>
                        <input
                            type="password"
                            className="border rounded"
                            placeholder="******"
                            {...register('confirmNewPassword')}
                            id="confirmNewPassword"
                        />
                    </div>
                    <p className="text-red-600">{errors.confirmNewPassword?.message}</p>
                    <div className="flex justify-center">
                        <button type="submit" className="border px-4 py-2 rounded-lg bg-green-200 hover:bg-red-200">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
type ProfileData = {
    email: string;
    fName: string;
    lName: string;
};

const UserChangeProfile = () => {
    const router = useRouter();
    const [submitForm, setSubmitForm] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ProfileData>({ resolver: zodResolver(ChangeProfile) });
    const [userInfo, setuserInfo] = useState<ProfileData>();
    useEffect(() => {
        const token = localStorage.getItem('auth');
        const Info = async (token: string) => {
            try {
                const response = await getUser(token);
                setuserInfo(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (token) {
            Info(token);
        }
    }, []);
    const handleChangeProfile: SubmitHandler<ProfileData> = async (e: ProfileData) => {
        setSubmitForm(true);
        const token = localStorage.getItem('auth');
        try {
            const response = await fetch('http://localhost:8080/users/me', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(e),
            });
            const res = await response.json();
            if (res.success) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="h-2/4 border-b-2 flex flex-col items-center gap-2 pt-10">
            <div>EDIT PROFILE</div>
            <div className="pt-10">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleChangeProfile)}>
                    <div className="flex flex-row gap-2">
                        <label className="pr-z">Email:</label>
                        <input
                            type="text"
                            className="border rounded"
                            placeholder={userInfo?.email}
                            {...register('email')}
                            id="email"
                        />
                    </div>
                    <p className="text-red-600">{errors.email?.message}</p>
                    <div className="flex flex-row gap-2">
                        <label>First Name:</label>
                        <input
                            type="text"
                            className="border rounded"
                            placeholder={userInfo?.fName}
                            {...register('fName')}
                            id="fName"
                        />
                    </div>
                    <p className="text-red-600">{errors.fName?.message}</p>
                    <div className="flex flex-row gap-2">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            className="border rounded"
                            placeholder={userInfo?.lName}
                            {...register('lName')}
                            id="lName"
                        />
                    </div>
                    <p className="text-red-600">{errors.lName?.message}</p>
                    <div className="flex justify-center">
                        <button type="submit" className="border px-4 py-2 rounded-lg bg-green-200 hover:bg-red-200">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export { UserChangePassword, UserChangeProfile };
