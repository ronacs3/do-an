import { Divider } from 'antd';
import Layout from '../../../components/Layout';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePassword } from '../../../validation/schema';
import { type } from 'os';
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
