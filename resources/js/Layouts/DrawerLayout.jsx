/* eslint-disable prettier/prettier */
import { Link } from "@inertiajs/react";
import { useState } from "react";

import { MdDashboard, MdHistory } from "react-icons/md";
import { IoCashOutline } from "react-icons/io5";


export default function DrawerLayout({ children }) {
    const menuItems = [
        { label: 'Dashboard', route: route('Dashboard'), icon: MdDashboard },
        { label: 'History', route: route('History'), icon: MdHistory },
        { label: 'Expenses', route: route('Expenses'), icon: IoCashOutline }
    ];
      
    const [selectedItem, setSelectedItem] = useState(menuItems[0]);
    const handleMenuItemClick = (item) => {
        setSelectedItem(item.label); // Set the selected item based on label
    };
   
    return (
        <div className="drawer lg:drawer-open  ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content */}
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-primary text-white drawer-button lg:hidden"
                >
                    Open drawer
                </label>
                <div className="w-full bg-allWhite">{children}</div> 
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="bg-allWhite  text-allBlack text-base min-h-[70vh] w-52 p-4 border-r-1 border-r-paleBlack border">
                <h1 className="py-3 font-GSemibold text-primary"> Expensure</h1>

                    <ul className="space-y-7 mt-6">
                        {menuItems.map((item) => (
                            <li 
                                key={item.label} 
                                className="flex items-center gap-2 "
                                onClick={() => handleMenuItemClick(item)}
                            >
                            <Link href={item.route} className="flex items-center gap-2">
                                <item.icon className="text-allBlack text-xl" /> {item.label}
                            </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
