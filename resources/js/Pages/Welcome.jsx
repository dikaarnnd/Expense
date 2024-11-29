import NavBar from '@/Components/NavBar';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Expense Tracker" />
            <div className="min-h-screen bg-[#f1f1f1] text-black dark:text-white">
                <NavBar />
            </div>
        </>
    );
}
