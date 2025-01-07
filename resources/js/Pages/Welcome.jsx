/* eslint-disable prettier/prettier */
import NavBar from '@/Components/NavBar';
import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Expense Tracker" />
            <div className="min-h-screen bg-allWhite text-black dark:text-white">
                <NavBar />

                <section className="bg-allWhite">
                    <div className="h-[72vh] w-full mx-auto items-center flex justify-center">
                        <div className="text-center w-2/3">
                            <h1 className="mb-4 text-5xl font-GSemibold text-primary leading-tight">
                                Track and measure every expense achieve your financial goals
                            </h1>
                            <p className="mb-8 font-GRegular text-primary  text-lg">
                                Expensure helps you track and measure your spending so you can budget smarter.
                            </p>
                            <Link 
                                href={route('register')}
                                className="bg-primary text-allWhite py-3 px-4 rounded-md transition-all duration-200 ease-out hover:px-8 hover:rounded-ss-3xl hover:rounded-se-3xl hover:bg-darkprimary  " >
                                Get started
                            </Link>

                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
