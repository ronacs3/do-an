import { Tv } from 'lucide-react';
import { Button, Modal, Switch } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/router';
interface device {
    data: {
        id: number;
        name: string;
        type: string;
        pin: string;
        state: boolean;
        boardId: number;
    };
}
const Device = ({ data }: device) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleCanle = () => {
        setOpen(false);
    };
    const { shortId } = router.query;

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
    return (
        <div className="flex flex-row justify-center gap-5 pt-5">
            <div className="flex flex-row gap-5">
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
                        {data.name}
                    </button>
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
                            <div>Name : {data.name}</div>
                            <div>Type : {data.type}</div>
                            <div>Pin : {data.pin}</div>
                            <div>Board : {data.boardId}</div>
                            <div>State : {data.state}</div>
                            <div>Time Create : 20/08/2023</div>
                        </div>
                    </Modal>
                    <div className="font-inter">{data.state}</div>
                </div>
            </div>
        </div>
    );
};

export { Device };
