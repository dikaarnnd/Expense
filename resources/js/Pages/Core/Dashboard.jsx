/* eslint-disable prettier/prettier */
import DrawerLayout from '@/Layouts/DrawerLayout';
import { FaEdit, FaRegPlusSquare } from "react-icons/fa";
import IconLink from '@/Components/IconLink';

import { Head, Link } from '@inertiajs/react';
export default function Dashboard() {
    return (
      <>
        <Head title="Dashboard" />
        <DrawerLayout>
          <main className="p-6 min-h-svh space-y-2 ">
            <div className='mb-4 mt-2 flex items-center justify-between'>
              <h1 className="text-2xl font-bold">Spending Smarter, Living Better!</h1>
              <IconLink href={route('History')} icon={FaRegPlusSquare} size='14px' className="p-2 rounded-md border border-paleBlack">
                <p>Add expense</p>  
              </IconLink>
            </div>

            {/*Baris pertama */} 
            <header className='grid grid-cols-7 gap-2  min-h-32 rounded-lg forBoxes'>
              <section className='col-span-2'>
                <div className='flex items-center justify-between mr-2'>
                  <h1 className='boxLabel '> Your Balance</h1>
                  <IconLink href={route('Expenses')} icon={FaEdit} className="text-subheading"/>
                </div>
                  
                <p className='currency text-green'> IDR 500.000,00</p>
              </section>

              <section className='col-span-2'>
                <h1 className='boxLabel'> Total Expenses</h1>
                <p className='currency text-darkprimary'> IDR 455.000,00</p>
              </section>

              <section className='col-span-3 '>
                <div className='flex justify-between items-center'>
                  <h1 className='boxLabel'> Total cash flow</h1>
                  <p className='mr-12'> (Your balance - Total expenses) </p>
                </div>
                <p className='currency text-alert'> IDR 45.000,00</p>
              </section>

            </header>

            {/*Baris kedua */} 
            <header className='grid grid-cols-3 gap-2 min-h-60 forBoxes'>
              <section className='col-span-2'>1</section>
              <section className='col-span-1'>2</section>
            </header>

            {/*Baris ketiga */} 
            <header className='grid min-h-40 forBoxes'>
              <section> 1</section>  
            </header>

          
              
          </main>


        </DrawerLayout>
      </>
    );
}
