/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import NavBar from '@/Components/NavBar';
import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    // Function to check screen size
    const checkScreenSize = () => {
        if (window.innerWidth < 1024) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };

    useEffect(() => {
        // Check screen size on initial load
        checkScreenSize();

        // Add event listener for resizing the window
        window.addEventListener('resize', checkScreenSize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    return (
        <>
            <Head title="Expense Tracker" />

            {/* Display warning for smaller screens */}
            {isSmallScreen && (
                <div style={styles.overlay}>
                    <div style={styles.warningBox}>
                        <p style={styles.warningText}>
                            This website is best viewed on a laptop or larger screen.
                        </p>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-allWhite text-black dark:text-white">
                <NavBar />

                <section className="bg-allWhite">
                    <div className="h-[72vh] w-full mx-auto items-center flex justify-center">
                        <div className="text-center w-2/3">
                            <h1 className="mb-4 text-5xl font-GSemibold text-primary leading-tight">
                                Track and measure every expense to achieve your financial goals
                            </h1>
                            <p className="mb-8 font-GRegular text-primary text-lg">
                                Expensure helps you track and measure your spending so you can budget smarter.
                            </p>
                            <Link 
                                href={route('register')}
                                className="bg-primary text-allWhite py-3 px-4 rounded-md transition-all duration-200 ease-out hover:px-8 hover:rounded-ss-3xl hover:rounded-se-3xl hover:bg-darkprimary  "
                            >
                                Get started
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

// Inline styles for the warning overlay
const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    warningBox: {
        padding: '20px',
        backgroundColor: '#333',
        borderRadius: '10px',
        textAlign: 'center',
        fontSize: '24px',
    },
    warningText: {
        margin: 0,
    },
};
