import Layout from '../../components/Layout';
import { AirVentIcon, Droplets, Thermometer } from 'lucide-react';
import React from 'react';
import { Switch } from 'antd';
import Link from 'next/link';
export default function Home() {
    return (
        <Layout>
            <div className="border h-screen bg-slate-50">
                <div className="border px-10 py-8 flex flex-row">
                    <div className="w-4/5 ">
                        <div className="text-2xl font-medium">BOARD 1</div>
                    </div>
                    <div className="w-1/5 ">
                        <div className="flex flex-row justify-end gap-5">
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
                <div className="h-5/6 pt-8 ">
                    <div className="h-3/5 px-20">
                        Chart
                        <div className="h-full w-full border">1</div>
                    </div>
                    <div className="h-2/5 pt-10">
                        <div className="px-20">Device</div>
                        <div className="grid grid-cols-5 gap-20 px-20 pt-8">
                            <div className="border rounded-3xl px-6 py-5">
                                <div className="flex gap-20 pb-14">
                                    <div className="pt-1">
                                        <AirVentIcon />
                                    </div>
                                    <div>
                                        <Switch size="small" defaultChecked />
                                    </div>
                                </div>
                                <div>Air Condition</div>
                                <div>16°C</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
