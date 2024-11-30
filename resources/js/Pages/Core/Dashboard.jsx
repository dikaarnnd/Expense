/* eslint-disable prettier/prettier */
import { Head, Link } from '@inertiajs/react';
import DrawerLayout from '@/Layouts/DrawerLayout';

import ExpOverview from '@/Components/ExpOverview';
import ExpTable from '@/Components/ExpTable';
import IconLink from '@/Components/IconLink';

import { IoIosArrowForward } from "react-icons/io";
import { FaEdit, FaRegPlusSquare } from "react-icons/fa";

export default function Dashboard() {
  const categories = [
    { id: 1, name: '🍔 Food', percentage: '40 %', amount: 'IDR 360k', expensesCount: 16 },
    { id: 2, name: '🏠 Housing', percentage: '30 %', amount: 'IDR 200k', expensesCount: 10 },
    { id: 3, name: '🚗 Transportation', percentage: '10 %', amount: 'IDR 100k', expensesCount: 5 },
    { id: 4, name: '💪 Health & Fitness', percentage: '15 %', amount: 'IDR 150k', expensesCount: 8 },
    { id: 5, name: '🎉 Entertainment', percentage: '5 %', amount: 'IDR 50k', expensesCount: 3 }
  ];
    return (
      <>
        <Head title="Dashboard" />
        <DrawerLayout>
          <main className="p-6 min-h-svh space-y-2 ">
            <div className='mb-4 mt-2 flex items-center justify-between'>
              <h1 className="text-2xl ">Spending Smarter, Living Better!</h1>
              <IconLink href={route('History')} icon={FaRegPlusSquare} size='14px' className="p-2 rounded-md border border-paleBlack">
                <p>Add expense</p>  
              </IconLink>
            </div>

            {/*Baris pertama 1️⃣ */} 
            <header className='grid grid-cols-7 gap-4  min-h-32 rounded-lg forBoxes'>
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

            {/*Baris kedua 2️⃣*/} 
            <header className='grid grid-cols-3 gap-4 min-h-60 forBoxes'>
              {/* Expenses Overview */}
              <section className='col-span-2'>
                <ExpOverview/>
              </section>

              {/* Top Categories */}
              <section className='col-span-1'>
                <div className='flex items-center justify-between mr-2'>
                  <h1 className='boxLabel'> Top Categories</h1>
                  <IconLink href={route('Expenses')} icon={FaEdit} className="text-subheading"/>
                </div>

                {/* Data top categories 👇 🏆*/}
                <div className='scrollnobar max-h-60 '>
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center justify-between p-3 border-b border-subheading ">
                      <div>
                        <h2 className="categoryLabel">{category.id}. {category.name}</h2>
                        <p className="text-sm text-paleBlack">{category.percentage}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg text-darkprimary font-GMedium">{category.amount}</p>
                        <p className="text-sm text-paleBlack font-GRegular">{category.expensesCount} expenses</p>
                      </div>
                    </div>
                  ))}
                  <Link href={route('History')} className="underlinedLink my-4  block text-center w-24 mx-auto"> View more</Link>

                </div>
              </section>
            </header>

            {/*Baris ketiga 3️⃣*/} 
            <header className='grid min-h-40 forBoxes'>
              <section>
                <div className='px-4 flex justify-between items-center'>
                  <h1 className='boxLabel'> Recent Expenses</h1>
                  <IconLink href={route('Expenses')} icon={IoIosArrowForward} reverse={true} size='14px' >
                    <p>Go to expenses</p> 
                  </IconLink>
                </div>
                <ExpTable/>
              </section>  
            </header>

          
              
          </main>


        </DrawerLayout>
      </>
    );
}
