import Layout from '../../../components/Layout';
import { UserChangePassword, UserChangeProfile } from '../../../components/User';
export default function User() {
    return (
        <Layout>
            <UserChangeProfile />
            <UserChangePassword />
        </Layout>
    );
}
