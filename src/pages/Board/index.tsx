import { BoardItem } from '../../../components/Board';
import Layout from '../../../components/Layout';
import { Droplets, Thermometer } from 'lucide-react';
import { getBoard } from '../../../lib/ultis';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

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
    const [value, setValue] = useState<SensorData>();

    useEffect(() => {
        socket.on('/wsn/sensors', (data) => {
            setValue(data);
        });
    }, [socket]);
    return (
        <Layout>
            <div className="flex justify-center bg-slate-50">
                <div className="flex flex-col gap-6 pt-20 h-screen w-3/4">
                    {boardInfo?.map((item, idx) => (
                        <div key={item.id}>{idx === 1 ? <BoardItem data={item} /> : <BoardItem data={item} />}</div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
