/* eslint-disable prettier/prettier */
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

import DrawerLayout from '@/Layouts/DrawerLayout';

import ExpOverview from '@/Components/ExpOverview';
import PieChart from '@/Components/PieChartExp';

export default function History({ setBalance, totalExpenses, remainingBalance, categoriesUsage, dailyExpense, category }) {

  const [balance, setYourBalance] = useState(null);
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

  // Set nilai awal balance dari props
  useEffect(() => {
    if (setBalance !== null && setBalance !== undefined) {
      setYourBalance(setBalance);
    }
  }, [setBalance]);

  // Format data untuk memastikan semua hari dalam seminggu ada
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const formattedCategoriesData = daysOfWeek.map((day) => {
    const dayData = dailyExpense.find((expense) => expense.day === day);
    return {
        day,
        total_expense: dayData ? parseInt(dayData.total_amount) : 0,
    };
  });

  const categories = categoriesUsage.map((category) => ({
    id: category.row_number,
    name: `${category.emoji} ${category.name}`,
    percentage: `${((category.total_amount / totalExpenses) * 100).toFixed(1)}%`, // Hitung persentase
    amount: `IDR ${category.total_amount.toLocaleString('id-ID')}`, // Format mata uang
    expensesCount: category.expenses_count,
  }));

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
                          <span className="text-lg pr-1">IDR </span>{formatCurrency(totalExpenses)}
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
                          <span className="text-lg pr-1">IDR </span>{formatCurrency(remainingBalance)}
                        </>
                      )  : '// Please set your balance first'}
                    
                    </p>
                  </section>

                </div>

                {/* Grafiknya 🔻 */}
                <section className='col-span-3'>
                  <ExpOverview data={formattedCategoriesData}/>
                </section>
                  
                
              </div>

              {/* Top Categories 🔻*/}
              <section className="col-span-1 bg-white p-4 rounded-lg shadow">
                <div className='flex items-center justify-between mr-2'>
                  <h1 className='boxLabel'> Top Categories</h1>
                </div>
                <PieChart categories={categories}/>
              </section>
            </div>
          </main>
        </DrawerLayout>
      </>
    );
}
