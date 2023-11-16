import Layout from '../../components/Layout';
import { AirVentIcon, AreaChart, BadgePlus, BarChart3, Droplets, MonitorSpeaker, Thermometer, Tv } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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

const formatXAxisTick = (tick: string) => {
    const date = new Date(tick);
    return date.toLocaleString('vi-VN', {
        hour12: false,
        day: 'numeric',
        month: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
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
    const [BoardInfo, setBoardInfo] = useState<BoardData>();
    useEffect(() => {
        const token = localStorage.getItem('auth');
        const Info = async (token: string) => {
            try {
                const response = await getBoard(token);
                setBoardInfo(response.data[0]);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (token) {
            Info(token);
        }
    }, []);
    const [ssData, setData] = useState<any[]>([]);
    return (
        <Layout>
            <div className=" h-screen">
                <div className="px-5 pt-6 h-screen">
                    {/* Sensor */}
                    <div className=" px-11 flex flex-row">
                        <div className="text-xl font-medium">Sensor</div>
                    </div>
                    <div className="flex flex-row justify-center gap-11 ">
                        <div className="rounded w-60 h-28 flex flex-col items-center bg-slate-700 gap-3 ">
                            <div className="pt-4 font-normal text-xl">Temperatute</div>
                            <div className="font-normal text-4xl">-</div>
                        </div>
                        <div className="rounded w-60 h-28  flex flex-col items-center bg-slate-700 gap-3 ">
                            <div className="pt-4 font-normal text-xl">Humidity</div>
                            <div className="font-normal text-4xl">23%</div>
                        </div>
                        <div className="rounded w-60 h-28  flex flex-col items-center bg-slate-700 gap-3 ">
                            <div className="pt-4 font-normal text-xl">Lux</div>
                            <div className="font-normal text-4xl">23°C</div>
                        </div>
                    </div>
                    {/* Chart */}
                    <div className=" px-11 pb-3 flex flex-row ">
                        <div className="text-xl font-medium">Chart</div>
                    </div>
                    <div className="h-96 px-11">
                        <div className="border rounded h-full bg-slate-700">
                            <ResponsiveContainer>
                                <ComposedChart
                                    data={ssData}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: 10,
                                        bottom: 10,
                                    }}
                                >
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <XAxis
                                        dataKey="createdAt"
                                        scale={'band'}
                                        label={{
                                            value: 'Time',
                                            position: 'insideBottomRight',
                                            offset: 0,
                                            fill: '#f7fafc',
                                        }}
                                        tick={{ fontSize: 12, fill: '#f7fafc' }}
                                        tickFormatter={formatXAxisTick}
                                    ></XAxis>
                                    <YAxis
                                        yAxisId={'left'}
                                        label={{
                                            value: 'Temp/Humi',
                                            angle: -90,
                                            position: 'insideLeft',
                                            fill: '#f7fafc',
                                        }}
                                        tick={{ fontSize: 12, fill: '#f7fafc' }}
                                    ></YAxis>
                                    <YAxis
                                        yAxisId={'right'}
                                        orientation="right"
                                        label={{
                                            value: 'Light',
                                            angle: 90,
                                            position: 'insideRight',
                                            fill: '#f7fafc',
                                        }}
                                        tick={{ fontSize: 12, fill: '#f7fafc' }}
                                    ></YAxis>
                                    <Tooltip></Tooltip>
                                    <Legend></Legend>

                                    <Bar dataKey={'humi'} barSize={20} fill="#0388fc" yAxisId={'left'}></Bar>
                                    <Line
                                        dataKey="temp"
                                        type={'monotone'}
                                        stroke="#fc3903"
                                        strokeWidth={2}
                                        yAxisId={'left'}
                                    ></Line>
                                    <Line
                                        dataKey="lux"
                                        type={'monotone'}
                                        stroke="#fc3903"
                                        strokeWidth={2}
                                        yAxisId={'left'}
                                    ></Line>
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {/* Device */}
                    <div className="h-2/6 ">
                        <div className=" px-11 py-4 flex flex-row gap-2">
                            <div className="text-xl font-medium">Deivce</div>
                            <div className="pt-1">
                                <BadgePlus />
                            </div>
                        </div>
                        {/* <Device /> */}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
