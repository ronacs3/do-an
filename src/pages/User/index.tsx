import Layout from '../../../components/Layout';
import { UserChangePassword, UserChangeProfile } from '../../../components/User';
export default function User() {
    return (
        <Layout>
            <div className="h-screen">
                <UserChangeProfile />
                <UserChangePassword />
            </div>
        </Layout>
    );
}
