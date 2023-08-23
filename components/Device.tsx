import { Tv } from 'lucide-react';
import { Modal, Switch } from 'antd';
import { useState } from 'react';
const Device = () => {
    const [device, setDevice] = useState([{ device: '' }]);
    const handleRemoveDevice = (index: number) => {
        const list = [...device];
        list.splice(index, 1);
        setDevice(list);
    };
    const InfoDevice = () => {
        Modal.info({
            title: 'Thong tin cua Device 1',
            content: (
                <div className="grid grid-cols-2 gap-2 py-2">
                    <div>Name : Televison</div>
                    <div>Type : TV</div>
                    <div>Pin : PIN1</div>
                    <div>Board : BOARD 1</div>
                    <div>State : OFF</div>
                    <div>Time Create : 20/08/2023</div>
                </div>
            ),
            onOk() {},
        });
    };
    return (
        <div className="border rounded-3xl h-36 w-36 shadow-sm shadow-slate-600 bg-red-400 p-3">
            <div className="flex flex-row gap-12 pb-11 ">
                <div>
                    <Tv />
                </div>
                <div>
                    <Switch />
                </div>
            </div>
            <button className="font-inter" onClick={InfoDevice}>
                Television
            </button>
            <div className="font-inter">ON</div>
        </div>
    );
};

export { Device };
