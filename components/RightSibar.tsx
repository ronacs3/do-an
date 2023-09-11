import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Divider } from 'antd';
import { Settings, BellDot, PanelRight, MapPin, CircuitBoard, User, PlugZap, Edit, PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUser, getBoard } from '../lib/ultis';
import { BoardList } from './Board';
import { AssignBoard, ChangeBoard } from '../validation/schema';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import input from 'antd/es/input';

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

const RightSibarBoard = () => {
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
    const router = useRouter();
    const [shortId, setShortId] = useState('');
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const token = localStorage.getItem('auth');
        const url = `http://localhost:8080/boards/${shortId}/assign`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                router.reload();
            } else {
                console.log('Request failed:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
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
            <div className="h-2/6">
                <div className="flex flex-row pb-2">
                    <MapPin className="pt-1" />
                    <div className=" text-lg">Location</div>
                </div>
                <div className="border rounded-2xl bg-gray-700 h-5/6"></div>
            </div>
            <div className="pb-3">
                <div className="flex flex-row gap-1">
                    <div>
                        <PlugZap />
                    </div>
                    <div className="pt-1"> Assign Board</div>
                </div>
                <form className="flex flex-col gap-2 pt-1" onSubmit={handleSubmit}>
                    <label htmlFor="shortId">Board ShortId : </label>
                    <input
                        className="border w-full rounded"
                        name="shortId"
                        type="text"
                        id="shortId"
                        value={shortId}
                        onChange={(e) => setShortId(e.target.value)}
                    />
                    <div className="flex justify-center">
                        <button className="border rounded-sm p-1 bg-slate-200 hover:bg-lime-200" type="submit">
                            Assign
                        </button>
                    </div>
                </form>
            </div>
            <div className="">
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
};
const RightSibarHome = () => {
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
            <div className="h-2/6">
                <div className="flex flex-row pb-2">
                    <MapPin className="pt-1" />
                    <div className=" text-lg">Location</div>
                </div>
                <div className="border rounded-2xl bg-gray-700 h-5/6"></div>
            </div>
            <div className="">
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
};
type Board = {
    name: string;
    latitude: string;
    longitude: string;
};
type Devices = {
    name: string;
    type: string;
    pin: string;
};
const RightSibarShortId = () => {
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
    const router = useRouter();
    const [submitForm, setSubmitForm] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Board>({ resolver: zodResolver(ChangeBoard) });
    const handleChangeBoard: SubmitHandler<Board> = async (e: Board) => {
        setSubmitForm(true);
        const token = localStorage.getItem('auth');
        const { shortId } = router.query;
        try {
            const response = await fetch(`http://localhost:8080/boards/${shortId}`, {
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
                router.push('/Board');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleAddDevices = async (e: Devices) => {
        setSubmitForm(true);
        const token = localStorage.getItem('auth');
        const { shortId } = router.query;
        try {
            const response = await fetch(`http://localhost:8080/boards/${shortId}/devices`, {
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
                router.push('/Board');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [pin, setPin] = useState();
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
            <div className="h-2/6">
                <div className="flex flex-row pb-2">
                    <MapPin className="pt-1" />
                    <div className=" text-lg">Location</div>
                </div>
                <div className="border rounded-2xl bg-gray-700 h-5/6"></div>
            </div>
            <div>
                <div className="flex flex-row pb-2">
                    <Edit className="pt-1" />
                    <div className=" text-lg">Edit Board</div>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleChangeBoard)}>
                    <div className="flex flex-row gap-2">
                        <label className=" pr-7">Name:</label>
                        <input type="text" className="border rounded" {...register('name')} id="name" />
                    </div>
                    <p className="text-red-600">{errors.name?.message}</p>
                    <div className="flex flex-row gap-2">
                        <label className=" pr-3">Latitude:</label>
                        <input type="text" className="border rounded" id="latitude" />
                    </div>

                    <div className="flex flex-row gap-2">
                        <label>longitude:</label>
                        <input type="text" className="border rounded" id="longitude" />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="border px-4 py-2 rounded-lg bg-green-200 hover:bg-red-200">
                            Save
                        </button>
                    </div>
                </form>
            </div>
            {/* <div className="pt-2">
                <div className="flex flex-row pb-2">
                    <PlusCircle className="pt-1" />
                    <div className=" text-lg">Add Devices</div>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleAddDevices}>
                    <div className="flex flex-row gap-2">
                        <label className=" pr-7">Name:</label>
                        <input type="text" className="border rounded" {...register('name')} id="name" />
                    </div>
                    <p className="text-red-600">{errors.name?.message}</p>
                    <div className="flex flex-row gap-2">
                        <label className=" pr-3">Type:</label>
                        <input type="text" className="border rounded" id="type" />
                    </div>

                    <div className="flex flex-row gap-2">
                        <label>Pin:</label>
                        <input type="text" className="border rounded" id="pin" />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="border px-4 py-2 rounded-lg bg-green-200 hover:bg-red-200">
                            Save
                        </button>
                    </div>
                </form>
            </div> */}
        </div>
    );
};
export default function RightSidebar() {
    const router = useRouter();
    return (
        <>
            {router.pathname === '/' && <RightSibarHome />}
            {router.pathname === '/Board' && <RightSibarBoard />}
        </>
    );
}
export { RightSibarShortId };
