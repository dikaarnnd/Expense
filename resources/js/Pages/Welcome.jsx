import { Link, Head } from '@inertiajs/react';
import NavBar from '@/Components/NavBar';

export default function Welcome() {
    return (
        <>
            <Head title="Expense Tracker" />
            <div className="min-h-screen  bg-[#f1f1f1] text-black  dark:text-white">
                <NavBar/>
                <div className="text-center">
                    
                    <div className="space-x-4">
                        <Link
                            href={route('login')}
                            className="rounded-md px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route('register')}
                            className="rounded-md px-4 py-2 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
