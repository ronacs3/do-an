import Link from 'next/link';
import { Avatar, Divider } from 'antd';
import { Settings, BellDot, PanelRight, MapPin } from 'lucide-react';
export default function RightSidebar() {
    return (
        <div className="border w-2/12 px-6">
            <div className="flex flex-row justify-center py-5 gap-5">
                <div className="pr-3">
                    <Avatar style={{ width: 50, height: 50 }} />
                </div>
                <div className="text-base">
                    <div>Username</div>
                    <div>plan</div>
                </div>
            </div>
            <Divider />
            <div className="h-3/6">
                <div className="flex flex-row pb-2">
                    <MapPin className="pt-1" />
                    <div className=" text-lg">Location</div>
                </div>
                <div className="border rounded-2xl bg-gray-700 h-2/3"></div>
            </div>
            <div className="h-1/6"></div>
        </div>
    );
}
