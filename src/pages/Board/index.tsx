import BoardItem from '../../../components/Board';
import Layout from '../../../components/Layout';
import { Droplets, Thermometer } from 'lucide-react';

export default function Board() {
    return (
        <Layout>
            <div className="flex justify-center bg-slate-50">
                <div className="flex flex-col gap-6 pt-20 h-screen w-3/4">
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                </div>
            </div>
        </Layout>
    );
}
