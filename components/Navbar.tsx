import { zodResolver } from '@hookform/resolvers/zod';
import { Dropdown, MenuProps, Modal, Space } from 'antd';
import { ChevronDown, FileEdit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ChangeBoard } from '../validation/schema';
import { getUser } from '../lib/ultis';

type Board = {
    name: string;
};
type BoardInfo = {
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
};
type UserInfo = {
    id: number;
    username: string;
    email: string;
    fName: string;
    lName: string;
    createdAt: string;
    updatedAt: string;
};

function NavbarHome() {
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
    const items: MenuProps['items'] = [
        {
            label: <Link href="/User">Profile</Link>,
            key: '0',
        },
        {
            label: <Link href="/Auth/Sign-out">Log out</Link>,
            key: '1',
        },
    ];
    return (
        <div className="flex w-full h-navbar bg-slate-800 border-black border-b">
            <div className="flex w-sidebar place-content-center items-center">
                {/* <Image src="/logo.ico" alt="logo" width={100} height={50} /> */}
                Wangs
            </div>
            <div className="flex w-full border-l border-black pl-2">
                <div className="w-full flex items-center">
                    <div className="text-2xl font-medium ">Board Name</div>
                </div>
                <div className=" flex justify-end items-center place-content-center w-full pr-2">
                    <Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                {userInfo?.username}
                                <ChevronDown />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}
function NavbarBoard() {
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
    const items: MenuProps['items'] = [
        {
            label: <Link href="/User">Profile</Link>,
            key: '0',
        },
        {
            label: <Link href="/Auth/Sign-out">Log out</Link>,
            key: '1',
        },
    ];

    return (
        <div className="flex w-full h-navbar bg-slate-800 border-black border-b">
            <div className="flex w-sidebar place-content-center items-center">
                {/* <Image src="/logo.ico" alt="logo" width={100} height={50} /> */}
                Wangs
            </div>
            <div className="flex w-full border-l border-black pl-2">
                <div className=" flex justify-end items-center place-content-center w-full pr-2">
                    <Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                {userInfo?.username}
                                <ChevronDown />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

const NavbarBoardShortID = () => {
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
    const items: MenuProps['items'] = [
        {
            label: <Link href="/User">Profile</Link>,
            key: '0',
        },
        {
            label: <Link href="/Auth/Sign-out">Log out</Link>,
            key: '1',
        },
    ];
    const router = useRouter();
    const [boardInfo, setBoardInfo] = useState<BoardInfo>();
    const { shortId } = router.query;
    useEffect(() => {
        const token = localStorage.getItem('auth');
        if (router.isReady) {
            const Info = async (token: string) => {
                try {
                    const response = await fetch(`http://localhost:8080/boards/${shortId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json();
                    setBoardInfo(data.data);
                } catch (error) {
                    console.log(error);
                }
            };
            if (token) {
                Info(token);
            }
        }
    }, [router.isReady]);
    // Edit Board
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
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
                router.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex w-full h-navbar bg-slate-800 border-black border-b">
            <div className="flex w-sidebar place-content-center items-center">
                {/* <Image src="/logo.ico" alt="logo" width={100} height={50} /> */}
                Wangs
            </div>
            <div className="flex w-full border-l border-black pl-2">
                <div className="w-full flex items-center gap-2">
                    <div className="text-2xl font-medium ">{boardInfo?.name}</div>
                    <button className="pt-1.5" onClick={showModal}>
                        <FileEdit />
                    </button>
                    <Modal
                        open={isModalOpen}
                        onCancel={handleCancel}
                        onOk={handleSubmit(handleChangeBoard)}
                        title="Edit Board"
                    >
                        <form className="flex flex-col gap-2 pt-1">
                            <label className=" pr-7">Name:</label>
                            <input
                                type="text"
                                className="border rounded"
                                placeholder={boardInfo?.name}
                                {...register('name')}
                                id="name"
                            />
                        </form>
                    </Modal>
                </div>

                <div className=" flex justify-end items-center place-content-center w-full pr-2">
                    <Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                {userInfo?.username}
                                <ChevronDown />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};
export { NavbarBoardShortID };

export default function Navbar() {
    const router = useRouter();
    return (
        <>
            {router.pathname === '/' && <NavbarHome />}
            {router.pathname === '/Board' && <NavbarBoard />}
        </>
    );
}
