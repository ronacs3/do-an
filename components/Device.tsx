import { Button, Modal, Switch, Form, Input, Select, TimePicker } from 'antd';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import dayjs from 'dayjs';
import { formatDate } from '../utils/formatDate';

interface device {
    data: {
        id: number;
        name: string;
        type: string;
        pin: string;
        state: boolean;
        boardId: number;
        createdAt: string;
    };
    id: string;
}
interface CollectionCreateFormProps {
    open: boolean;
    onCancel: () => void;
    data: {
        id: number;
        name: string;
        type: string;
        pin: string;
        state: boolean;
        boardId: number;
        createdAt: string;
    };
}
const { Option } = Select;
const EditDevices: React.FC<CollectionCreateFormProps> = ({ open, onCancel, data }) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const { shortId } = router.query;
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
    return (
        <Modal
            open={open}
            title="Sửa thông tin thiết bị"
            okText="Change Device"
            cancelText="Cancel"
            onCancel={onCancel}
            okType="dashed"
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        fetch(`http://localhost:8080/boards/${shortId}/devices/${data.id}`, {
                            method: 'PUT',
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
                    <Input placeholder={data.name} />
                </Form.Item>
                <Form.Item name="type" label="type" initialValue={data.type}>
                    <Select placeholder="select your type">
                        <Option value="TV">TV</Option>
                        <Option value="DOOR">DOOR</Option>
                        <Option value="BULB">BULB</Option>
                        <Option value="AC">AC</Option>
                        <Option value="FAN">FAN</Option>
                        <Option value="OTHER">Other</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="pin" label="pin" initialValue={data.pin}>
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

const Device = ({ data, id }: device) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const showModal = () => {
        setOpen(true);
    };

    const handleCanle = () => {
        setOpen(false);
    };
    const showModal2 = () => {
        setOpen2(true);
    };

    const handleCanle2 = () => {
        setOpen2(false);
    };
    const { shortId } = router.query;
    //state devices

    const socket = io('http://localhost:8080');
    const [active, setActive] = useState(data.state);
    const handleDevice = async () => {
        setActive(!active);
        const token = localStorage.getItem('auth');
        const newState = !data.state;

        try {
            const response = await fetch(`http://localhost:8080/boards/${shortId}/devices/${data.id}/state`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ state: newState }), // Send the new state
            });

            const res = await response.json();

            if (res.success) {
                data.state = newState;
                let message = {
                    [id]: data.state,
                };
                socket.emit('/wsn/devices', JSON.stringify(message));
                console.log(message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // remove device
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const token = localStorage.getItem('auth');
        const url = `http://localhost:8080/boards/${shortId}/devices/${data.id}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
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
    const format = 'HH:mm';

    return (
        <div className="h-56 rounded-lg pt-7 px-5 bg-slate-700">
            <div className="flex flex-row gap-2 pb-24 w-full">
                <div>
                    <button onClick={showModal2}>{data.name}</button>
                    <EditDevices
                        open={open2}
                        onCancel={() => {
                            setOpen2(false);
                        }}
                        data={data}
                    />
                </div>
                <div className="w-full flex flex-row place-content-end">
                    <Switch checkedChildren="ON" unCheckedChildren="OFF" onChange={handleDevice} checked={active} />
                </div>
            </div>
            <div className="flex flex-row gap-6 w-full">
                <div className="pt-1 flex flex-row w-full">
                    <button className="font-inter " onClick={showModal}>
                        Pin: {data.pin}
                    </button>
                </div>
                <Modal
                    open={open}
                    title="thong tin device"
                    onCancel={handleCanle}
                    footer={[
                        <Button key="submit" danger type="primary" onClick={handleSubmit}>
                            Remove
                        </Button>,
                        <Button key="back" onClick={handleCanle}>
                            Back
                        </Button>,
                    ]}
                >
                    <div className="grid grid-cols-2 gap-2 py-2">
                        <div>ID: {data.id}</div>
                        <div>Name: {data.name}</div>
                        <div>Type: {data.type}</div>
                        <div>Pin: {data.pin}</div>
                        <div>Board: {data.boardId}</div>
                        <div>Time Create: {formatDate(data.createdAt)}</div>
                    </div>
                </Modal>
                <div className="w-full flex flex-row place-content-end">
                    <TimePicker defaultValue={dayjs('00:00', format)} format={format} />
                </div>
            </div>
        </div>
    );
};

export { Device };
