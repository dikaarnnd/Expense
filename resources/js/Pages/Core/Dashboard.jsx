/* eslint-disable prettier/prettier */
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

import DrawerLayout from '@/Layouts/DrawerLayout';
import TextInput from '@/Components/TextInput';
import DateRangeInput from '@/Components/DateRangeInput';
import ModalCategory from '@/Components/ModalCategory';

import ExpOverview from '@/Components/ExpOverview';
import ExpTable from '@/Components/ExpTable';
import IconLink from '@/Components/IconLink';

import { IoIosArrowForward } from "react-icons/io";
import { FaEdit, FaRegPlusSquare } from "react-icons/fa";


export default function Dashboard({ setBalance, expense, totalExpenses, remainingBalance, categoriesUsage, dailyExpense, category }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [balance, setYourBalance] = useState(null);
  const [period, setPeriod] = useState(); // Add state for period
  const [startDate, setStartDate] = useState(null); // Changed to null as default
  const [endDate, setEndDate] = useState(null); // Changed to null as default
  const [lastUpdated, setLastUpdated] = useState(null);
  const [categoryList, setCategoryList] = useState(category);

  const [expenses, setExpenses] = useState(0);
  const [EditBalance, setEditBalance] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
    if (setBalance !== null && setBalance !== undefined) {
      setYourBalance(setBalance);
    }
  }, [setBalance]);

  useEffect(() => {
    if (period === 'monthly') {
        const currentDate = new Date();
        const start = currentDate.toISOString().split('T')[0]; // Set start date to current date
        const end = new Date(currentDate);
        end.setMonth(end.getMonth() + 1); // Set end date to 1 month later
        setStartDate(start);
        setEndDate(end.toISOString().split('T')[0]); // Format end date
    }
  }, [period, EditBalance]); // Re-run effect when modal opens or period changes

  // Reset balance and last updated when a month has passed since last update
  useEffect(() => {
      if (period === 'monthly' && lastUpdated) {
          const currentDate = new Date();
          const lastUpdateDate = new Date(lastUpdated);
          const oneMonthLater = new Date(lastUpdateDate);
          oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

          if (currentDate >= oneMonthLater) {
              setYourBalance(""); // Reset balance
              setLastUpdated(null); // Reset last updated date
              alert("Your balance has been reset as a month has passed!");
          }
      }
  }, [period, lastUpdated]);

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

  // Fungsi untuk membuka modal dalam mode "Add"
  const openAddBalanceModal = () => {
    setYourBalance(''); // Reset balance
    setPeriod('monthly'); // Atur default period (opsional)
    setIsEditing(false); // Set mode menjadi "Add"
    setEditBalance(true); // Buka modal
  };

  // Fungsi untuk membuka modal dalam mode "Edit"
  const openEditBalanceModal = () => {
    setPeriod('');
    setIsEditing(true); // Set mode menjadi "Edit"
    setEditBalance(true); // Buka modal
  };

  const handleSubmit = () => {
    // Validate balance
    if (isNaN(balance) || balance <= 0) {
        alert("Please enter a valid positive balance.");
        return;
    }

    const data = {
        setBalance: balance,
        plan_date: period,
        start_date: startDate,
        end_date: endDate,
    };

    if (isEditing) {
        // Call API to update balance
        router.put(route('balances.update'), data, {
            onSuccess: () => {
                alert('Balance successfully updated!');
                setEditBalance(false);
            },
            onError: (errors) => handleErrors(errors),
        });
    } else {
        // Call API to add new balance
        router.post(route('balances.store'), data, {
            onSuccess: () => {
                alert('Balance successfully added!');
                setEditBalance(false);
            },
            onError: (errors) => handleErrors(errors),
        });
    }
  };

  const handleErrors = (errors) => {
    const errorMessages = [];
    if (errors.setBalance) errorMessages.push(`Balance: ${errors.setBalance}`);
    if (errors.plan_date) errorMessages.push(`Period: ${errors.plan_date}`);
    if (errors.start_date) errorMessages.push(`Start Date: ${errors.start_date}`);
    if (errors.end_date) errorMessages.push(`End Date: ${errors.end_date}`);
    alert(errorMessages.length > 0 ? errorMessages.join('\n') : "An error occurred. Please try again.");
  };
  
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
                  <h1 className='boxLabel'> Your Balance</h1>
                  {balance ? (
                      <>
                        <FaEdit
                          className="text-paleBlack text-lg rounded-md hover:cursor-pointer"
                          onClick={openEditBalanceModal}
                        />
                      </>
                    )  : <FaEdit
                            className="text-paleBlack text-lg rounded-md hover:cursor-pointer"
                            onClick={openAddBalanceModal}
                          />
                    }
                </div>
                <p className={` ${!balance ? 'nodataText ' : 'text-green currency'}`}>
                  {balance ? (
                      <>
                        <span className="text-lg pr-1">IDR </span>{formatCurrency(balance)}
                      </>
                    )  : '// No balance has been set'}
                </p>
                {EditBalance && (
                  <div className="modal-overlay" onClick={() => setEditBalance(false)}>
                      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className='flex justify-between items-start'>
                          <div className="min-h-20 mt-2 space-y-2">
                            <h1>{isEditing ? "Edit your balance" : "Add a new balance"}</h1>
                            <h2>Balance helps track expenses.</h2>
                          </div>
                        </div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                            className='mt-4 space-y-4 min-h-10'
                        >
                          <div className="flex justify-between">
                            <div className="flex-col">
                                <p className="inputLabel">Set balance</p>
                                <p className="tipLabel">// Set your balance</p>
                            </div>
                            <TextInput
                                id="setBalance"
                                name="setBalance"
                                type="number"
                                step="0.01"
                                placeholder="Type amount of IDR..."
                                className="w-2/3"
                                autoComplete="off"
                                value={balance} // Controlled input
                                onChange={(e) => setYourBalance(e.target.value)}
                                required
                            />
                          </div>

                          <div className="flex justify-between">
                            <div className="flex-col">
                                <p className="inputLabel">Select period</p>
                                <p className="tipLabel">// Set your balance period</p>
                            </div>

                            <div className="flex space-x-4 p-2 w-2/3">
                              <label className='rad'>
                                  <input
                                      type="radio"
                                      name='period'
                                      value="monthly"
                                      checked={period === 'monthly'}
                                      onChange={() => setPeriod('monthly')}
                                  />
                                  Monthly
                              </label>
                              <label className='rad'>
                                  <input
                                    type="radio"
                                    name='period'
                                    value="custom"
                                    checked={period === 'custom'}
                                    onChange={() => setPeriod('custom')}
                                  />
                                  Custom
                              </label>
                            </div>
                        </div>

                        {period === "custom" && (
                            <DateRangeInput
                                onStartDateChange={(date) => {
                                    console.log("Start Date:", date);
                                    setStartDate(date);
                                }}
                                onEndDateChange={(date) => {
                                    console.log("End Date:", date);
                                    setEndDate(date);
                                }}
                            />
                        )}

                        <div className="flex justify-between items-center">
                            <p className="text-paleBlack text-sm font-GRegular">Today is {currentDate.toLocaleDateString()}</p>
                            <button className="confirmBtn" type='submit'>
                                {isEditing ? "Update balance" : "Set balance"}
                            </button>
                        </div>
                        </form>
                      </div>
                  </div>
                )}
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
                  <ModalCategory categories={categoryList}/>
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
