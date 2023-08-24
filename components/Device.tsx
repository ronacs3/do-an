import { Tv } from 'lucide-react';
import { Button, Modal, Switch } from 'antd';
import { useState } from 'react';
const Device = () => {
    const [device, setDevice] = useState([{ device: '' }]);
    const [open, setOpen] = useState(false);
    const handleAddDevice = () => {
        setDevice([...device, { device: '' }]);
    };
    const handleRemoveDevice = (index: number) => {
        const list = [...device];
        list.splice(index, 1);
        setDevice(list);
        setOpen(false);
    };

    const showModal = () => {
        setOpen(true);
    };
    const handleCanle = () => {
        setOpen(false);
    };
    return (
        <div className="flex flex-row justify-center gap-5 pt-5">
            {device.map((singleDivice, index) => (
                <div key={index} className="flex flex-row gap-5">
                    <div className="border rounded-3xl h-36 w-36 shadow-sm shadow-slate-600 bg-red-400 p-3">
                        <div className="flex flex-row gap-12 pb-11 ">
                            <div>
                                <Tv />
                            </div>
                            <div>
                                <Switch />
                            </div>
                        </div>
                        <button className="font-inter" onClick={showModal}>
                            Television
                        </button>
                        <Modal
                            open={open}
                            title="thong tin device"
                            onCancel={handleCanle}
                            footer={[
                                <Button key="submit" danger type="primary" onClick={() => handleRemoveDevice(index)}>
                                    Remove
                                </Button>,
                                <Button key="back" onClick={handleCanle}>
                                    Back
                                </Button>,
                            ]}
                        >
                            <div className="grid grid-cols-2 gap-2 py-2">
                                <div>Name : Televison</div>
                                <div>Type : TV</div>
                                <div>Pin : PIN1</div>
                                <div>Board : BOARD 1</div>
                                <div>State : OFF</div>
                                <div>Time Create : 20/08/2023</div>
                            </div>
                        </Modal>
                        <div className="font-inter">ONM</div>
                    </div>
                </div>
            ))}
            {device.length < 6 && (
                <button
                    type="button"
                    onClick={handleAddDevice}
                    className="border-2 border-dashed rounded-3xl h-36 w-36 bg-white border-black p-"
                >
                    <span>Add Device</span>
                </button>
            )}
        </div>
    );
};

export { Device };
