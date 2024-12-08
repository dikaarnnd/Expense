/* eslint-disable prettier/prettier */
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

import DrawerLayout from '@/Layouts/DrawerLayout';

import ExpOverview from '@/Components/ExpOverview';
import PieChart from '@/Components/PieChartExp';

export default function History() {

  const [balance, setBalance] = useState(null);
  const [expenses, setExpenses] = useState(0);
  const cashFlow = balance !== null ? balance - expenses : null;

  const formatBalance = (balance) => {
    if (balance !== null) {
      // Use Intl.NumberFormat to format the number
      return new Intl.NumberFormat('id-ID', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(balance);
    }
    return '';
  };

  const formatCurrency = (value) => {
    if (value !== null) {
      return new Intl.NumberFormat('id-ID', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    }
    return '';
  };

  const categories = [
    { id: 1, name: '🍔 Food', percentage: '40 %', amount: 'IDR 360k', expensesCount: 16 },
    { id: 2, name: '🏠 Housing', percentage: '30 %', amount: 'IDR 200k', expensesCount: 10 },
    { id: 3, name: '🚗 Transportation', percentage: '10 %', amount: 'IDR 100k', expensesCount: 5 },
    { id: 4, name: '💪 Health & Fitness', percentage: '15 %', amount: 'IDR 150k', expensesCount: 8 },
    { id: 5, name: '🎉 Entertainment', percentage: '5 %', amount: 'IDR 50k', expensesCount: 3 }
  ];

    return (
      <>
        <Head title="History" />
        <DrawerLayout>
          <main className="p-6 min-h-svh space-y-4 ">
            <h1 className="text-2xl font-bold">All reports follow this filter</h1>
    
          
            <div className="grid grid-cols-3 gap-4 forBoxes" >
              {/* Expense Overview*/}

              <div className="col-span-2 space-y-4">
               
                <div className='grid grid-cols-5 gap-4 '>
                {/* Total Expenses data (output) 🔻 */}        
                  <section className='col-span-2'>
                    <h1 className='boxLabel'> Total Expenses</h1>
                    <p className={` ${!balance ? 'nodataText' : 'text-darkprimary currency'}`}> 
                      {balance ? (
                        <>
                          <span className="text-lg pr-1">IDR </span>{formatCurrency(expenses)}
                        </>
                      )  : '// Please set your balance first'}
                    
                    </p>
                  </section>
                  {/* Total Cash Flow (output) 🔻 */}    
                  <section className='col-span-3'>
                    <div className='flex justify-between items-center'>
                      <h1 className='boxLabel'> Total cash flow</h1>
                      <p className='mr-4 text-secondary'> (Your balance - Total expenses) </p>
                    </div>
                    <p className={` ${!balance ? 'nodataText' : 'text-secondary currency'}`}> 
                      {balance ? (
                        <>
                          <span className="text-lg pr-1">IDR </span>{formatCurrency(cashFlow)}
                        </>
                      )  : '// Please set your balance first'}
                    
                    </p>
                  </section>

                </div>

                {/* Grafiknya 🔻 */}
                <section className='col-span-3'>
                  <ExpOverview/>
                </section>
                  
                
              </div>

              {/* Top Categories 🔻*/}
              <section className="col-span-1 bg-white p-4 rounded-lg shadow">
                <div className='flex items-center justify-between mr-2'>
                  <h1 className='boxLabel'> Top Categories</h1>
                  
                </div>
                <PieChart/>
              </section>

            </div>

          </main>
        </DrawerLayout>
      </>
    );
}
