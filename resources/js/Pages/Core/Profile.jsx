/* eslint-disable prettier/prettier */
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

import DrawerLayout from '@/Layouts/DrawerLayout';

const Profile = () => {
    return (
      <>
        <Head title="Profile" />
        <DrawerLayout>
          <main className="p-6 min-h-svh space-y-4">
              <div className='mb-4 mt-2 flex items-center justify-between'>
                <h1 className="text-2xl ">Your profile</h1>
              </div>
          </main>

        </DrawerLayout>
      
      
      </>
    );
};

export default Profile;
