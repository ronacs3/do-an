import { useRouter } from 'next/router';
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
import formatString from '../../../utils/formatString';
import { NavbarBoardShortID } from '../../../components/Navbar';

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
    lux: string;
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
    const pin = ['D1', 'D2', 'D3', 'D4'];
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
    //check usePin
    const pinUsed = Array.isArray(devicesInfo) ? devicesInfo.map((item) => item.pin) : [];
    const pinAvailable = pin.filter((pin) => !pinUsed.some((usedPin) => usedPin === pin));
    return (
        <Modal
            open={open}
            title="Thêm thiết bị"
            okText="Add Device"
            cancelText="Cancel"
            onCancel={onCancel}
            okType="dashed"
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
                        {pinAvailable.map((pin) => (
                            <Option key={pin} value={pin}>
                                {pin}
                            </Option>
                        ))}
                        {pinUsed.map((pin) => (
                            <Option key={pin} value={pin} disabled>
                                {pin}
                            </Option>
                        ))}
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
        <div className="text-white">
            <NavbarBoardShortID />
            <div className="flex flex-row w-full h-screen bg-slate-800 text-white">
                <BoardSibarShortId />
                <div className="w-full h-screen">
                    <div className=" h-screen pt-2">
                        {/* Sensor */}
                        <div className=" px-11 flex flex-row">
                            <div className="text-xl font-medium">Sensor</div>
                        </div>
                        <div className="flex flex-row justify-center gap-11 ">
                            <div className="rounded w-60 h-28 flex flex-col items-center bg-slate-700 gap-3 ">
                                <div className="pt-4 font-normal text-xl">Temperatute</div>
                                <div className="font-normal text-4xl">{formatString(value?.temp)}%</div>
                            </div>
                            <div className="rounded w-60 h-28  flex flex-col items-center bg-slate-700 gap-3 ">
                                <div className="pt-4 font-normal text-xl">Humidity</div>
                                <div className="font-normal text-4xl">{formatString(value?.humi)}%</div>
                            </div>
                            <div className="rounded w-60 h-28  flex flex-col items-center bg-slate-700 gap-3 ">
                                <div className="pt-4 font-normal text-xl">Lux</div>
                                <div className="font-normal text-4xl">{formatString(value?.lux)}Lux</div>
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
                                            stroke="#d4ff00"
                                            strokeWidth={2}
                                            yAxisId={'left'}
                                        ></Line>
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        {/* Device */}
                        <div className="h-2/6 ">
                            <div className="px-11 py-4 flex flex-row gap-2">
                                <div className="text-xl font-medium">Deivce</div>
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
                {/* <RightSibarShortId /> */}
            </div>
        </div>
    );
}
