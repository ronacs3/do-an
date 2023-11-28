import { Droplets, PlusSquare, Thermometer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Form, Input, Modal, Select } from 'antd';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { BoardItem } from '../../components/Board';
import Layout from '../../components/Layout';
import { getBoard } from '../../lib/ultis';

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
export default function Home({}) {
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
    return (
        <Layout>
            <div className="h-full flex flex-col">
                <div className=" flex pt-5 gap-2 pl-24">
                    <div className="pt-2.5">
                        <div className=" w-8 h-4 bg-allboard border rounded "></div>
                    </div>
                    <div className="text-2xl font-medium">Board</div>
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
