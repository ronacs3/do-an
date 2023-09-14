import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { BoardSibarShortId } from '../../../components/LeftSibar';
import { RightSibarShortId } from '../../../components/RightSibar';
import { useEffect, useState } from 'react';
import { AirVentIcon, AreaChart, BadgePlus, BarChart3, Droplets, MonitorSpeaker, Thermometer, Tv } from 'lucide-react';
import { Device } from '../../../components/Device';
import { io } from 'socket.io-client';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button, Modal, Form, Input, Select } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// type DeviceType = 'TV' | 'DOOR' | 'BULB' | 'AC' | 'FAN' | 'OTHER';
type DevicePin = 'D1' | 'D2' | 'D3' | 'D4';
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
type DeviceInfo = {
    data: {
        id: number;
        name: string;
        type: string;
        pin: string;
        state: boolean;
        boardId: number;
    };
};
type SensorData = {
    temp: string;
    humi: string;
};
interface AddDevices {
    name: string;
    // type?: DeviceType;
    pin?: DevicePin;
}

interface AddDevicesProps {
    open: boolean;
    value?: AddDevices;
    onCancel: () => void;
    onChange?: (value: AddDevices) => void;
}
const { Option } = Select;
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

//Modal Devices
const AddDevices: React.FC<AddDevicesProps> = ({ open, onCancel, value = {}, onChange }) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const { shortId } = router.query;
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;

    return (
        <Modal
            open={open}
            title="Thêm thiết bị"
            okText="Add Device"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        fetch(`http://localhost:8080/boards/${shortId}/devices`, {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                form.resetFields();
                                onCancel();
                            })
                            .then((success) => {
                                router.reload();
                            });
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
            width={400}
        >
            <Form form={form} layout="vertical" name="form_in_modal">
                <Form.Item name="name" label="name">
                    <Input />
                </Form.Item>
                <Form.Item name="type" label="type">
                    <Select placeholder="select your type">
                        <Option value="TV">TV</Option>
                        <Option value="DOOR">DOOR</Option>
                        <Option value="BULB">BULB</Option>
                        <Option value="AC">AC</Option>
                        <Option value="FAN">FAN</Option>
                        <Option value="OTHER">Other</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="pin" label="pin">
                    <Select placeholder="select your pin">
                        <Option value="D1">D1</Option>
                        <Option value="D2">D2</Option>
                        <Option value="D3">D3</Option>
                        <Option value="D4">D4</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default function BoardInfo() {
    const router = useRouter();
    const { shortId } = router.query;
    // BoardInfo
    const [boardInfo, setBoardInfo] = useState<BoardInfo>();
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
    // devicesInfo
    const [devicesInfo, setDevicesInfo] = useState<DeviceInfo>();
    useEffect(() => {
        const token = localStorage.getItem('auth');
        if (router.isReady) {
            const device = async (token: string) => {
                try {
                    const response = await fetch(`http://localhost:8080/boards/${shortId}/devices`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json();
                    setDevicesInfo(data.data);
                } catch (error) {
                    console.log(error);
                }
            };
            if (token) {
                device(token);
            }
        }
    }, [router.isReady]);
    // add device
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleCanle = () => {
        setOpen(false);
    };
    // socket and chart
    const desiredBoardID = boardInfo?.id;
    const socket = io('http://localhost:8080');
    const [value, setValue] = useState<SensorData>();

    useEffect(() => {
        socket.on('/wsn/sensors', (data) => {
            if (data.boardId === desiredBoardID) {
                setValue(data);
            }
        });
    }, [socket]);
    const [ssData, setData] = useState<any[]>([]);
    useEffect(() => {
        socket.on('/wsn/sensors', (e) => {
            if (e.boardId === desiredBoardID) {
                setData((oldData) => {
                    const newData = [...oldData, e];
                    if (newData.length === 10 + 1) {
                        return newData.slice(1);
                    }
                    return newData;
                });
            }
        });
        return () => {
            socket.off('/wsn/sensors');
        };
    }, [socket]);
    return (
        <div className="flex flex-row w-full h-screen">
            <BoardSibarShortId />
            <div className="w-10/12">
                <div className=" h-screen bg-slate-100">
                    <div className=" border-b px-10 py-8 flex flex-row bg-white">
                        <div className="w-4/5 ">
                            <div className="text-2xl font-medium">BOARD {boardInfo?.name}</div>
                        </div>
                        <div className="w-1/5 ">
                            <div className="flex flex-row justify-end gap-5">
                                <div className="flex flex-row gap-1">
                                    <div>
                                        <Droplets />
                                    </div>
                                    <div>{value?.humi}%</div>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <div>
                                        <Thermometer />
                                    </div>
                                    <div>{value?.temp}°C</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-10 pt-5 h-5/6 ">
                        {/* Chart */}
                        <div className="h-4/6 pb-3">
                            <div className="flex flex-row pb-4">
                                <BarChart3 className="pt-1" />
                                <div className=" text-lg">Chart</div>
                            </div>
                            <div className="border rounded-lg h-5/6 bg-slate-500">
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
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        {/* Device */}
                        <div className="h-2/6 ">
                            <div className="flex flex-row gap-2">
                                <div>
                                    <MonitorSpeaker />
                                </div>

                                <div>Device</div>
                                <button className="font-inter" onClick={showModal}>
                                    <BadgePlus />
                                </button>
                                <AddDevices
                                    open={open}
                                    onCancel={() => {
                                        setOpen(false);
                                    }}
                                />
                            </div>
                            <div className="flex flex-row  justify-center gap-5 pt-5">
                                {Array.isArray(devicesInfo) &&
                                    devicesInfo.map((item, idx) => (
                                        <div key={item.id}>
                                            {idx === 1 ? (
                                                <Device data={item} id={item.id} />
                                            ) : (
                                                <Device data={item} id={item.id} />
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RightSibarShortId />
        </div>
    );
}
