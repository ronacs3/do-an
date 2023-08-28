import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Divider } from 'antd';
import { Settings, BellDot, PanelRight, MapPin, CircuitBoard, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUser, getBoard } from '../lib/ultis';
import { BoardList } from './Board';
type UserInfo = {
    id: number;
    username: string;
    email: string;
    fName: string;
    lName: string;
    createdAt: string;
    updatedAt: string;
};
type BoardListInfo = [
    data: {
        id: number;
        boardId: number;
        shortId: string;
        name: string;
        type: string;
        latitude: string;
        longitude: string;
        ownerId: number;
        createdAt: string;
        updatedAt: string;
    },
];
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
    const [boardInfo, setBoardInfo] = useState<BoardListInfo>();
    useEffect(() => {
        const token = localStorage.getItem('auth');
        const Info = async (token: string) => {
            try {
                const response = await getBoard(token);
                setBoardInfo(response.data);
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
                    <Avatar size={50} icon={<UserOutlined />} />
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
                <div className="border rounded-2xl bg-gray-700 h-5/6"></div>
            </div>
            <div className="h-1/6">
                <div className="flex flex-row pb-2">
                    <CircuitBoard className="pt-1 pr-1" />
                    <div className=" text-lg">All Board Location</div>
                </div>
                {boardInfo?.map((item, idx) => (
                    <div key={item.id}>{idx === 1 ? <BoardList data={item} /> : <BoardList data={item} />}</div>
                ))}
            </div>
        </div>
    );
}
