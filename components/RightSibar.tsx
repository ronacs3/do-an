import Link from 'next/link';
import { Avatar, Divider } from 'antd';
import { Settings, BellDot, PanelRight, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUser } from '../lib/ultis';
type UserInfo = {
    id: number;
    username: string;
    email: string;
    fName: string;
    lName: string;
    createdAt: string;
    updatedAt: string;
};
export default function RightSidebar() {
    const [userInfo, setuserInfo] = useState<UserInfo>();
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
    return (
        <div className="border w-2/12 px-6">
            <div className="flex flex-row justify-center py-5 gap-5">
                <div className="pr-3">
                    <Avatar style={{ width: 50, height: 50 }} />
                </div>
                <div className="text-base">
                    <div>Username: {userInfo?.username}</div>
                    <div>Email: {userInfo?.email}</div>
                </div>
            </div>
            <Divider />
            <div className="h-3/6">
                <div className="flex flex-row pb-2">
                    <MapPin className="pt-1" />
                    <div className=" text-lg">Location</div>
                </div>
                <div className="border rounded-2xl bg-gray-700 h-2/3"></div>
            </div>
            <div className="h-1/6"></div>
        </div>
    );
}
