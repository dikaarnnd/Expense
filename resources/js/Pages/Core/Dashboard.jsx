/* eslint-disable prettier/prettier */
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

import DrawerLayout from '@/Layouts/DrawerLayout';

import ExpOverview from '@/Components/ExpOverview';
import ExpTable from '@/Components/ExpTable';
import IconLink from '@/Components/IconLink';
import ModalBalance from '@/Components/ModalBalance';
import ModalEditBalance from '@/Components/ModalBalance';
import ModalCategory from '@/Components/ModalCategory';

import { IoIosArrowForward } from "react-icons/io";
import { FaEdit, FaRegPlusSquare } from "react-icons/fa";


export default function Dashboard({ setBalance: initialSetBalance, expense, totalExpenses, remainingBalance, categoriesUsage, dailyExpense }) {
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

  // Set nilai awal balance dari props
  useEffect(() => {
    if (initialSetBalance !== null && initialSetBalance !== undefined) {
      setBalance(initialSetBalance);
    }
  }, [initialSetBalance]);

  const formatCurrency = (value) => {
    if (value !== null) {
      return new Intl.NumberFormat('id-ID', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }
    return '';
  };

  const recentExpenses = expense.filter(() => {
    return true;
  })

  const categories = categoriesUsage.map((category) => ({
    id: category.row_number,
    name: `${category.emoji} ${category.name}`,
    percentage: `${((category.total_amount / totalExpenses) * 100).toFixed(1)}%`, // Hitung persentase
    amount: `IDR ${category.total_amount.toLocaleString('id-ID')}`, // Format mata uang
    expensesCount: category.expenses_count,
  }));

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Format data untuk memastikan semua hari dalam seminggu ada
  const formattedCategoriesData = daysOfWeek.map((day) => {
      const dayData = dailyExpense.find((expense) => expense.day === day);
      return {
          day,
          total_expense: dayData ? parseInt(dayData.total_amount) : 0,
      };
  });
  
    return (
      <>
        <Head title="Dashboard" />
        <DrawerLayout>
          <main className="p-6 min-h-svh space-y-4  ">
            <div className='mb-4 mt-2 flex items-center justify-between'>
              <h1 className="text-2xl ">Spending Smarter, Living Better!</h1>
              <IconLink href={route('AddExpense')} icon={FaRegPlusSquare} size='14px' className="p-2 px-4 rounded-md border border-subheading shadow-md">
                <p>Add expense</p>  
              </IconLink>
            </div>

            {/*Baris pertama 1️⃣ */} 
            <header className='grid grid-cols-7 gap-4  min-h-10 rounded-lg forBoxes'>
              
              {/* Balance data (output) 🔻 */}
              <section className='col-span-2 '>
                <div className='flex items-center justify-between mr-2 '>
                  <h1 className={` ${!balance ? 'boxLabel' : 'boxLabel'}`}> Your Balance</h1>
                  <ModalBalance/>
                </div>
                <p className={` ${!balance ? 'nodataText ' : 'text-green currency'}`}>
                  {balance ? (
                      <>
                        <span className="text-lg pr-1">IDR </span>{formatCurrency(balance)}
                      </>
                    )  : '// No balance has been set'}
                </p>
              </section>

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
              <section className='col-span-3 '>
                <div className='flex justify-between items-center'>
                  <h1 className='boxLabel'> Total cash flow</h1>
                  <p className='mr-12 text-secondary'> (Your balance - Total expenses) </p>
                </div>
                <p className={` ${!balance ? 'nodataText' : 'text-secondary currency'}`}> 
                  {balance ? (
                    <>
                      <span className="text-lg pr-1">IDR </span>{formatCurrency(remainingBalance)}
                    </>
                  )  : '// Please set your balance first'}
                 
                </p>
              </section>

            </header>

            {/*Baris kedua 2️⃣*/} 
            <header className='grid grid-cols-3 gap-4 min-h-60 forBoxes'>
              
              {/* Expenses Overview */}
              <section className='col-span-2'>
                <ExpOverview data={formattedCategoriesData}/>
              </section>

              {/* Top Categories 🔻 */}
              <section className='col-span-1'>
                <div className='flex items-center justify-between mr-2'>
                  <h1 className='boxLabel'> Top Categories</h1>
                  {/* <ModalCategory/> */}
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
                  <Link href={route('History')} className="underlinedLink my-4  block text-center w-24 "> View more</Link>

                </div>
              </section>
            </header>

            {/*Baris ketiga 3️⃣*/} 
            <header className='grid min-h-40 forBoxes'>
              <section>
                <div className=' flex justify-between items-center'>
                  <h1 className='boxLabel'> Recent Expenses</h1>
                  <IconLink href={route('Expenses')} icon={IoIosArrowForward} reverse={true} size='14px' >
                    <p>Go to expenses</p> 
                  </IconLink>
                </div>
                <ExpTable
                  maxHeight="max-h-72"
                  showPagination={false}
                  itemsPerPage={5}
                  data={recentExpenses.map((item) => ({
                    ...item,
                    category: `${item.emoji || ''} ${item.category}`, // Tambahkan emoji jika ada
                    // date: new Date(item.created_at).toLocaleDateString(), // Format tanggal
                  }))}
                />
              </section>  
            </header>
          </main>
        </DrawerLayout>
      </>
    );
}
