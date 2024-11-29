import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import regBg from '../../images/registerBg.png';

export default function GuestLayout({ children, bgImage }) {
    return (
        <div className="grid min-h-screen grid-cols-2 flex-col items-center bg-gray-100 sm:justify-center sm:pt-0">
            <div className="h-screen w-full">
                <img
                    src={bgImage}
                    alt="sd"
                    className="size-full object-contain"
                />
            </div>

            <div className="w-full overflow-hidden px-20">
                <Link href="/" className="flex items-center space-x-4">
                    <ApplicationLogo className="size-12 fill-current text-gray-500" />
                    <p className="appLabel"> Expensure</p>
                </Link>
                {children}
            </div>
        </div>
    );
}
