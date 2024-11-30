/* eslint-disable prettier/prettier */
import { Link } from "@inertiajs/react";

export default function DrawerLayout({ children }) {
    return (
        <div className="drawer lg:drawer-open ">
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
                <h1 className="py-2"> Expensure</h1>
                  <ul className=" space-y-4 mt-6 ">
                      <li>
                          <Link href={route('Dashboard')}>Dashboard</Link>
                      </li>
                      <li>
                          <Link href={route('History')}>History</Link>
                      </li>
                      <li>
                          <Link href={route('Expenses')}>Expenses</Link>
                      </li>
                      
                  </ul>
                </div>
            </div>
        </div>
    );
}
