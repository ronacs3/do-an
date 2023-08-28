import BoardItem from '../../../components/Board';
import Layout from '../../../components/Layout';
import { Droplets, Thermometer } from 'lucide-react';
import { getBoard } from '../../../lib/ultis';
import { useEffect, useState } from 'react';

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
export default function Board() {
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
    // console.log(boardInfo);
    return (
        <Layout>
            <div className=" bg-slate-50">
                <div className="flex flex-row justify-end">asdasd</div>
                <div className="flex justify-center">
                    <div className="flex flex-col gap-6 pt-20 h-screen w-3/4">
                        {boardInfo?.map((item, idx) => (
                            <div key={item.id}>{idx === 1 ? <BoardItem data={item} /> : <BoardItem data={item} />}</div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
