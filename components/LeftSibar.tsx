import Link from 'next/link';
import { HomeIcon, LayoutGrid, LogOut, User } from 'lucide-react';
import { useRouter } from 'next/router';
function HomeSibar() {
    return (
        <div className="flex flex-col border place-content-center items-center">
            <div className="flex flex-col px-8 gap-14">
                <Link href={'/'}>
                    <HomeIcon className=" text-blue-800" />
                </Link>
                <Link href={'/Board'}>
                    <LayoutGrid className=" opacity-30 hover:text-blue-800 hover:opacity-100" />
                </Link>
                <Link href={'/User'}>
                    <User className="opacity-30 hover:text-blue-800 hover:opacity-100" />
                </Link>
            </div>
        </div>
    );
}

function BoardSibar() {
    return (
        <div className="flex flex-col border place-content-center items-center">
            <div className="flex flex-col px-8 gap-14">
                <Link href={'/'}>
                    <HomeIcon className="opacity-30 hover:text-blue-800 hover:opacity-100" />
                </Link>
                <Link href={'/Board'}>
                    <LayoutGrid className=" text-blue-800" />
                </Link>
                <Link href={'/User'}>
                    <User className=" opacity-30 hover:text-blue-800 hover:opacity-100" />
                </Link>
            </div>
        </div>
    );
}
function UserSibar() {
    return (
        <div className="flex flex-col border place-content-center items-center">
            <div className="flex flex-col px-8 gap-14">
                <Link href={'/'}>
                    <HomeIcon className=" opacity-30 hover:text-blue-800 hover:opacity-100" />
                </Link>
                <Link href={'/Board'}>
                    <LayoutGrid className=" opacity-30 hover:text-blue-800 hover:opacity-100" />
                </Link>
                <Link href={'/User'}>
                    <User className=" text-blue-800" />
                </Link>
                <Link href={'/Auth/Sign-out'}>
                    <LogOut className=" opacity-30 hover:text-blue-800 hover:opacity-100" />
                </Link>
            </div>
        </div>
    );
}

export default function LeftSibar() {
    const router = useRouter();
    return (
        <>
            {router.pathname === '/' && <HomeSibar />}
            {router.pathname === '/Board' && <BoardSibar />}
            {router.pathname === '/User' && <UserSibar />}
        </>
    );
}
