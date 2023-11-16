import { BoardItem } from '../../../components/Board';
import Layout from '../../../components/Layout';
import { Droplets, PlusSquare, Thermometer } from 'lucide-react';
import { getBoard } from '../../../lib/ultis';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Form, Input, Modal, Select } from 'antd';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

type BoardInfo = [
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
type SensorData = {
    temp: string;
    humi: string;
};
export default function Board({}) {
    // boardInfo
    const [boardInfo, setBoardInfo] = useState<BoardInfo>();
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
    const socket = io('http://localhost:8080');
    // const [value, setValue] = useState<SensorData>();

    // useEffect(() => {
    //     socket.on('/wsn/sensors', (data) => {
    //         setValue(data);
    //     });
    // }, [socket]);
    // assign board
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const router = useRouter();
    const [shortId, setShortId] = useState('');
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const token = localStorage.getItem('auth');
        const url = `http://localhost:8080/boards/${shortId}/assign`;
        const signInToast = toast.loading('Assign board...', {
            style: {
                borderRadius: '8px',
                background: '#333',
                color: '#fff',
            },
        });
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                toast.success('Assign board, redirect...', {
                    id: signInToast,
                    style: {
                        borderRadius: '8px',
                        background: '#333',
                        color: '#fff',
                    },
                });
                router.reload();
            } else {
                console.log('Request failed:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    return (
        <Layout>
            <div className="h-full flex flex-col">
                <div className=" flex pt-5 gap-2 pl-24">
                    <div className="pt-2.5">
                        <div className=" w-8 h-4 bg-allboard border rounded "></div>
                    </div>
                    <div className="text-2xl font-medium">All Board</div>
                    <button className="pt-1.5" onClick={showModal}>
                        <PlusSquare />
                    </button>
                    <Modal open={isModalOpen} onCancel={handleCancel} onOk={handleSubmit} title="Add Board">
                        <form className="flex flex-col gap-2 pt-1">
                            <label htmlFor="shortId">Board ShortId</label>
                            <input
                                className="border rounded"
                                name="shortId"
                                type="text"
                                id="shortId"
                                value={shortId}
                                onChange={(e) => setShortId(e.target.value)}
                            />
                        </form>
                    </Modal>
                </div>
                <div className=" w-full h-full flex place-content-center pt-20">
                    <div className="flex flex-col gap-5 ">
                        {boardInfo?.map((item, idx) => (
                            <div key={item.id}>{idx === 1 ? <BoardItem data={item} /> : <BoardItem data={item} />}</div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
