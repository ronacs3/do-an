import Link from 'next/link';
import { ArrowLeft, HomeIcon, LayoutGrid, LogOut, PlugZap, User } from 'lucide-react';
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
const BoardSibarShortId = () => {
    const router = useRouter();
    const { shortId } = router.query;
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const token = localStorage.getItem('auth');
        const url = `http://localhost:8080/boards/${shortId}/unassign`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                router.push('/Board');
            } else {
                console.log('Request failed:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    return (
        <div className="flex flex-col border place-content-center items-center">
            <div className="flex flex-col px-8 gap-14">
                <Link href={'/Board'}>
                    <ArrowLeft className="opacity-30 hover:text-blue-800 hover:opacity-100" />
                </Link>
                <button onClick={handleSubmit}>
                    <PlugZap className="opacity-30 hover:text-blue-800 hover:opacity-100" />
                </button>
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
};
export { BoardSibarShortId };
