import Link from 'next/link';
import { ArrowLeft, HomeIcon, LayoutGrid, LogOut, PlugZap, User } from 'lucide-react';
import { useRouter } from 'next/router';
function HomeSibar() {
    return (
        <div className="flex flex-col place-content-center items-center w-sidebar text-lg font-medium border-black border-r ">
            <div className="flex flex-col w-full gap-14">
                <Link href={'/'} className="flex flex-row gap-2 h-16 items-center rounded bg-slate-700">
                    <div className=" bg-blue-600 h-full w-1"></div>
                    <HomeIcon className=" text-blue-800" />
                    <div className="text-blue-800">OVER VIEW</div>
                </Link>
                <Link href={'/Board'} className="flex flex-row gap-2 h-16 items-center">
                    <div className="h-full w-1"></div>
                    <LayoutGrid className=" opacity-30 hover:text-blue-800 hover:opacity-100" />
                    <div>ALL BOARD</div>
                </Link>
            </div>
        </div>
    );
}

function BoardSibar() {
    return (
        <div className="flex flex-col place-content-center items-center w-sidebar text-lg font-medium border-black border-r ">
            <div className="flex flex-col  w-full gap-14">
                <Link href={'/'} className="flex flex-row gap-2 h-16 items-center">
                    <div className="h-full w-1"></div>
                    <HomeIcon className=" opacity-30 hover:text-blue-800 hover:opacity-100" />
                    <div>OVER VIEW</div>
                </Link>
                <Link href={'/Board'} className="flex flex-row gap-2 h-16 items-center rounded bg-slate-700">
                    <div className=" bg-blue-600 h-full w-1"></div>
                    <LayoutGrid className=" text-blue-800" />
                    <div className="text-blue-800">ALL BOARD</div>
                </Link>
            </div>
        </div>
    );
}
function UserSibar() {
    return (
        <div className="flex flex-col place-content-center items-center w-sidebar text-lg font-medium ">
            <div className="flex flex-col gap-14">
                <Link href={'/'} className="flex flex-row gap-2">
                    <HomeIcon className=" opacity-30 hover:text-blue-800 hover:opacity-100" />
                    <div className="">OVER VIEW</div>
                </Link>
                <Link href={'/Board'} className="flex flex-row gap-2">
                    <LayoutGrid className=" opacity-30 hover:text-blue-800 hover:opacity-100" />
                    <div>ALL BOARD</div>
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
        </>
    );
}

const BoardSibarShortId = () => {
    const router = useRouter();
    const finalSlashIndex = router.asPath.lastIndexOf('/');
    const previousPath = router.asPath.slice(0, finalSlashIndex);
    return (
        <div className="flex flex-col place-content-center items-center w-sidebar text-lg font-medium border-black border-r ">
            <div className="flex flex-col  w-full gap-14">
                <Link href={previousPath} className="flex flex-row gap-2 h-16 items-center">
                    <div className="h-full w-1"></div>
                    <ArrowLeft className="opacity-30 hover:text-blue-800 hover:opacity-100" />
                    <div>GO BACK</div>
                </Link>
                <Link href={'/'} className="flex flex-row gap-2 h-16 items-center">
                    <div className="h-full w-1"></div>
                    <HomeIcon className=" opacity-30 hover:text-blue-800 hover:opacity-100" />
                    <div>OVER VIEW</div>
                </Link>
                <Link href={'/Board'} className="flex flex-row gap-2 h-16 items-center">
                    <div className="  h-full w-1"></div>
                    <LayoutGrid className="opacity-30 hover:text-blue-800 hover:opacity-100" />
                    <div>ALL BOARD</div>
                </Link>
            </div>
        </div>
    );
};
export { BoardSibarShortId };
