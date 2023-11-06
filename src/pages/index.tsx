import Layout from '../../components/Layout';
import { AirVentIcon, AreaChart, BarChart3, Droplets, MonitorSpeaker, Thermometer, Tv } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Switch } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Device } from '../../components/Device';
import { constants } from 'buffer';
import { getBoard } from '../../lib/ultis';
import { type } from 'os';

type BoardData = {
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
export default function Home() {
    const router = useRouter();
    // useEffect(() => {
    //     const token = localStorage.getItem('auth');
    //     if (!token) {
    //         router.push('/Auth/Sign-in');
    //     }
    // }, []);
    const [device, setDevice] = useState([{ device: '' }]);
    const handleAddDevice = () => {
        setDevice([...device, { device: '' }]);
    };
    const handleRemoveDevice = (index: number) => {
        const list = [...device];
        list.splice(index, 1);
        setDevice(list);
    };
    // const [BoardInfo, setBoardInfo] = useState<BoardData>();
    // useEffect(() => {
    //     const token = localStorage.getItem('auth');
    //     const Info = async (token: string) => {
    //         try {
    //             const response = await getBoard(token);
    //             setBoardInfo(response.data[0]);
    //             console.log(response.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     if (token) {
    //         Info(token);
    //     }
    // }, []);
    return (
        <Layout>
            <div className=" h-screen bg-slate-100">
                <div className=" border-b px-10 py-8 flex flex-row bg-white">
                    <div className="w-4/5 ">
                        <div className="text-2xl font-medium">BOARD 1</div>
                    </div>
                    <div className="w-1/5 ">
                        <div className="flex flex-row justify-end gap-5">
                            <div className="flex flex-row gap-1">
                                <div>
                                    <Droplets />
                                </div>
                                <div>50%</div>
                            </div>
                            <div className="flex flex-row gap-1">
                                <div>
                                    <Thermometer />
                                </div>
                                <div>30°C</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-10 pt-8 h-5/6 ">
                    {/* Chart */}
                    <div className="h-4/6 pb-3">
                        <div className="flex flex-row pb-4">
                            <BarChart3 className="pt-1" />
                            <div className=" text-lg">Chart</div>
                        </div>
                        <div className="border rounded-lg h-5/6 bg-amber-300"></div>
                    </div>
                    {/* Device */}
                    <div className="h-2/6 ">
                        <div className="flex flex-row gap-2">
                            <div>
                                <MonitorSpeaker />
                            </div>

                            <div>Device</div>
                        </div>
                        {/* <Device /> */}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
