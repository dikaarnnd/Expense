/* eslint-disable prettier/prettier */
import DrawerLayout from '@/Layouts/DrawerLayout';

import { Head, Link } from '@inertiajs/react';
export default function Dashboard() {
    return (
      <>
        <Head title="History" />
        <DrawerLayout>
          <div className="p-6 h-screen">
              <h1 className="text-2xl font-bold">All reports follow this filter</h1>
    
          </div>


        </DrawerLayout>
      </>
    );
}
