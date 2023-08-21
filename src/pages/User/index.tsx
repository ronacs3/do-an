import { Divider } from 'antd';
import Layout from '../../../components/Layout';

export default function User() {
    return (
        <Layout>
            <div className="h-screen">
                <div className="h-2/3 border-b-2 flex justify-center">
                    <div>EDIT PROFILE</div>
                </div>
                <div className="h-1/3 flex justify-center">CHANGE PASSWORRD</div>
            </div>
        </Layout>
    );
}
