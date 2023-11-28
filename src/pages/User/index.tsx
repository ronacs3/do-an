import Layout from '../../../components/Layout';
import { UserChangePassword, UserChangeProfile } from '../../../components/User';
export default function User() {
    return (
        <Layout>
            <div className="flex h-screen place-content-center items-center">
                <UserChangeProfile />
                {/* <UserChangePassword /> */}
            </div>
        </Layout>
    );
}
