import { Tv } from 'lucide-react';
import { Switch } from 'antd';
const Device = () => {
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
            <div className="font-inter">Television</div>
            <div className="font-inter">ON</div>
        </div>
    );
};

const AddDevice = () => {
    return <button className="border-2 border-dashed rounded-3xl h-36 w-36 bg-white border-black p-3"></button>;
};

export { Device, AddDevice };
