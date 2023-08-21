import { DoorClosed, Droplets, Lightbulb, Thermometer, Tv } from 'lucide-react';

export default function BoardItem(): JSX.Element {
    return (
        <div className="border rounded-lg h-24 px-10 py-5 flex flex-row bg-white hover:bg-green-200">
            <div className="w-4/5 ">
                <div className="pb-2">BOARD 1</div>
                <div className="flex flex-row gap-2">
                    <div>
                        <Tv />
                    </div>
                    <div>
                        <Lightbulb />
                    </div>
                    <div>
                        <DoorClosed />
                    </div>
                </div>
            </div>
            <div className="w-1/5">
                <div className="flex flex-row justify-end gap-5 pt-4">
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
    );
}
