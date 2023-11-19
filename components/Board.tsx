import Link from 'next/link';
import { DoorClosed, Droplets, Lightbulb, Thermometer, Tv } from 'lucide-react';
import { useState, useEffect, SetStateAction } from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';
interface BoardInfo {
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
    };
}
type SensorData = {
    temp: string;
    humi: string;
    lux: string;
};

const BoardItem = ({ data }: BoardInfo) => {
    const desiredBoardID = data.id;
    const socket = io('http://localhost:8080');
    const [value, setValue] = useState<SensorData>();

    useEffect(() => {
        socket.on('/wsn/sensors', (data) => {
            if (data.boardId === desiredBoardID) {
                setValue(data);
            }
        });
    }, [socket]);
    // unassign board
    const router = useRouter();
    const shortId = data.shortId;
    console.log(shortId);
    const handleUnassignBoard = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const token = localStorage.getItem('auth');
        const url = `http://localhost:8080/boards/${shortId}/unassign`;

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
        <Link
            className=" h-36 w-board rounded-md bg-slate-600  flex flex-row gap-10 px-8 py-6 "
            href={`/Board/${data.shortId}`}
        >
            <div className="w-full flex flex-col gap-2 place-content-start  font-medium">
                <div>Board : {data.name} </div>
                <div>ID: {data.shortId}d</div>
                <div className="flex flex-row gap-2">
                    <div className="h-8 w-16 rounded-md flex place-content-center pt-1 bg-red-300">
                        {value?.temp} °C
                    </div>
                    <div className="h-8 w-16 rounded-md flex place-content-center pt-1 bg-blue-400">
                        {value?.humi} %
                    </div>
                    <div className="h-8 w-16 rounded-md flex place-content-center pt-1 bg-yellow-400">
                        {value?.lux} Lux
                    </div>
                </div>
            </div>
            <div className="w-full flex place-content-end ">
                <div className="flex flex-col gap-5">
                    <div className="flex place-content-center items-center h-full w-full">
                        <button
                            className="rounded font-medium bg-slate-500 hover:bg-cyan-500 p-2"
                            onClick={handleUnassignBoard}
                        >
                            Unassign
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const BoardList = ({ data }: BoardInfo) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row gap-32">
                <div>Board: {data.id}</div>
                <div>Location: {data.latitude}</div>
            </div>
        </div>
    );
};

export { BoardList, BoardItem };
