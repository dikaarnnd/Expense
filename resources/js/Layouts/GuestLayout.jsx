import { Link } from '@inertiajs/react';
import expensurelogo from '../../images/expensurelogo.png';

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
                    <img
                        src={expensurelogo}
                        alt="expsurelogo"
                        className="size-12 object-contain"
                    />
                    <p className="appLabel"> Expensure</p>
                </Link>
                {children}
            </div>
        </div>
    );
}
