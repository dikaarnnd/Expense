/* eslint-disable prettier/prettier */
import { Link } from '@inertiajs/react';
import expensurelogo from '../../images/expensurelogo.png';

export default function NavBar() {
    return (
        <header className="text-gray-600">
            <div className="mx-6 py-5 flex flex-col items-center  md:flex-row">
                <a className="title-font mb-4 flex items-center font-medium text-alert md:mb-0 space-x-4">
                    <img
                        src={expensurelogo}
                        alt="expsurelogo"
                        className="size-12 object-contain"
                    />
                    <h1 className="appLabel">Expensure</h1>
                </a>
                <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto md:mr-auto space-x-16">
                    <a className="text-primary hover:text-subheading font-GRegular">About</a>
                    <a className="text-primary hover:text-subheading font-GRegular">FAQs</a>
                    <a className="text-primary hover:text-subheading font-GRegular">Support</a>
                </nav>
                <div className='flex items-center justify-center space-x-6'>
                    <Link 
                        href={route('login')}
                        className="underlinedLink" >
                        Log in
                    </Link>
                    <Link 
                        href={route('register')}
                        className="confirmBtn" >
                        Register
                    </Link>

                </div>
            </div>
        </header>
    );
}
