/* eslint-disable prettier/prettier */
import DrawerLayout from '@/Layouts/DrawerLayout';

import { Head, Link } from '@inertiajs/react';
export default function Dashboard() {
    return (
      <>
        <Head title="Expenses" />
        <DrawerLayout>
          <div className="p-6 h-screen">
              <h1 className="text-2xl font-bold">Your expenses data</h1>
              {/* Your Expenses Content */}
          </div>


        </DrawerLayout>
      </>
    );
}
