/* eslint-disable prettier/prettier */
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { FaEdit} from "react-icons/fa";

import DrawerLayout from '@/Layouts/DrawerLayout';


const Profile = () => {


    return (
      <>
        <Head title="Profile" />
        <DrawerLayout>
          <main className="p-6 min-h-svh space-y-4">
            <div className='mb-4 mt-2 flex items-center justify-between'>
              <h1 className="text-2xl ">Profile settings</h1>
            </div>
            <header className='grid grid-cols-2  gap-4 forBoxes'>
              <>
                <section>
                  <div className='p-2 h-36'>
                    <div className='flex items-center space-x-4'>
                      <h1 className='text-2xl text-allBlack'> Miguel Cyclops </h1>
                      <FaEdit className='text-allBlack'/>
                    </div>
                    <p className='text-paleBlack'> miguel88cyc@gmail.com </p>
                  </div>

                  <div className='flex justify-between items-center p-2'>
                    <p className='text-paleBlack'>Last update : 07/12/2024 </p>
                    <p className='text-subheading'> Created at : 06/12/2024 </p>
                  </div>
                  <div> </div>
                  
                </section>
              </>
              <section>
                <div>1</div>
                <div>1</div>
                <div>1</div>
              </section>
            </header>
            
          </main>

        </DrawerLayout>
      
      
      </>
    );
};

export default Profile;
