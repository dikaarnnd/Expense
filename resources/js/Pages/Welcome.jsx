import NavBar from '@/Components/NavBar';
import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Expense Tracker" />
            <div className="min-h-screen bg-[#f1f1f1] text-black dark:text-white">
                <NavBar />
                <Link href={route('Dashboard')} className="confirmBtn">
                    Dashboard
                </Link>
            </div>
        </>
    );
}
