import Link from 'next/link';
import { DoorClosed, Droplets, Lightbulb, Thermometer, Tv } from 'lucide-react';
import { useState, useEffect, SetStateAction } from 'react';
import { io } from 'socket.io-client';
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
const BoardItem = ({ data }: BoardInfo) => {
    return (
        <Link
            className="border rounded-lg h-auto px-10 py-5 flex flex-row justify-between bg-white hover:bg-green-200"
            href={`/Board/${data.shortId}`}
        >
            <div className="">
                <div className="flex flex-row gap-2">
                    <div className="pb-2">{data.shortId}</div>
                    <div> Type: {data.type}</div>
                </div>
                <div className="flex flex-row gap-2">
                    <div>
                        <Tv />
                    </div>
                    <div>
                        <Lightbulb />
                    </div>
                    <div>
                        <DoorClosed />
                    </div>
                </div>
            </div>
            <div className="">
                <div className="flex flex-row justify-end gap-5 pb-2">
                    <div className="flex flex-row gap-1">
                        <div>
                            <Droplets />
                        </div>
                        {/* <div>{value?.humi}%</div> */}
                    </div>
                    <div className="flex flex-row gap-1">
                        <div>
                            <Thermometer />
                        </div>
                        {/* <div>{value?.temp}°C</div> */}
                    </div>
                </div>
                <div className="flex  justify-end">Create: {new Date(data.createdAt).toLocaleDateString('en-us')}</div>
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
