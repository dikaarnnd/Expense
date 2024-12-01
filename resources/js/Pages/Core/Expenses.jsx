/* eslint-disable prettier/prettier */
import { Head } from '@inertiajs/react';
import { useState } from 'react';

import DrawerLayout from '@/Layouts/DrawerLayout';
import ExpFilters from '@/Components/ExpFilters';
import ExpTable from '@/Components/ExpTable';

import { MdCategory, MdAttachMoney,  MdCalendarMonth} from "react-icons/md";

export default function Expenses() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAmount, setSelectedAmount] = useState('All');
  // const [selectedDate, setSelectedDate] = useState('Recent');

  const handleCategorySelection = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const handleAmountSelection = (selectedAmount) => {
    setSelectedAmount(selectedAmount);
  };

  const handleDateSelection = (selectedDate) => {
    setSelectedDate(selectedDate);
  };


  const categoryOptions = ['All', '🍔 Food', '🏠 Housing', '🚗 Transportation', '💪 Health & Fitness', '🎬 Entertainment', '🍔 Food', '📚 Education', '🛍️ Shopping', '📳 Transfer', '🛠️ Repairs', '📱 Phone & Internet'];
  const amountOptions = ['All', '⬆ Highest', ' ⬇ Lowest'];
  const presetDateOptions = ['Recent', 'Yesterday', 'This week', 'This Month'];

  const data = [
    { id: '#2020', category: '🍔 Food', amount: 'IDR 40.000,00', date: '01/02/2025', notes: 'Wingstop pack' },
    { id: '#2021', category: '🏠 Housing', amount: 'IDR 20.000,00', date: '30/01/2025', notes: 'Lorem ipsum-' },
    { id: '#2022', category: '🚗 Transportation', amount: 'IDR 25.000,00', date: '28/01/2025', notes: 'Lorem ipsum-' },
    { id: '#2023', category: '💪 Health & Fitness', amount: 'IDR 200.000,00', date: '05/02/2025', notes: 'Lorem ipsum-' },
    { id: '#2024', category: '🎬 Entertainment', amount: 'IDR 35.000,00', date: '07/02/2025', notes: 'Lorem ipsum-' },
    { id: '#2025', category: '🍔 Food', amount: 'IDR 150.000,00', date: '08/02/2025', notes: 'Traktir 4 orang' },
    { id: '#2026', category: '📚 Education', amount: 'IDR 215.000,00', date: '10/02/2025', notes: 'Lorem ipsum-' },
    { id: '#2027', category: '🚗 Transportation', amount: 'IDR 15.000,00', date: '28/01/2025', notes: 'Lorem ipsum-' },
    { id: '#2028', category: '🛍️ Shopping', amount: 'IDR 55.000,00', date: '12/02/2025', notes: 'Lorem ipsum-' },
    { id: '#2029', category: '📳 Transfer', amount: 'IDR 100.000,00', date: '18/02/2025', notes: 'Lorem ipsum-' },
    { id: '#2030', category: '🛠️ Repairs', amount: 'IDR 70.000,00', date: '20/02/2025', notes: 'Lorem ipsum-' },
    { id: '#2031', category: '📱 Phone & Internet', amount: 'IDR 120.000,00', date: '22/02/2025', notes: 'Lorem ipsum-' },
  ];

  const filteredData = data
  .filter((item) => {
    // Category Filter
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }
    return true;
  })
  .sort((a, b) => {
    // Sorting based on Amount (Highest / Lowest)
    if (selectedAmount === '⬆ Highest') {
      return parseInt(b.amount.replace('IDR ', '').replace(',', '').replace('.', '')) - parseInt(a.amount.replace('IDR ', '').replace(',', '').replace('.', ''));
    } else if (selectedAmount === ' ⬇ Lowest') {
      return parseInt(a.amount.replace('IDR ', '').replace(',', '').replace('.', '')) - parseInt(b.amount.replace('IDR ', '').replace(',', '').replace('.', ''));
    }
    return 0; // No sorting if "All" is selected
  });


  return (
    <>
      <Head title="Expenses" />
      <DrawerLayout>
        <div className="p-6 min-h-svh space-y-2">
          <h1 className="text-2xl mb-4 mt-2">Your expenses data</h1>
          
          <div className='flex space-x-2 '>
            <ExpFilters
              label="Category"
              options={categoryOptions}
              onSelect={handleCategorySelection}  // Handle selected category
              icon={MdCategory}
            />
            <ExpFilters
              label="Amount(IDR)"
              options={amountOptions}
              onSelect={handleAmountSelection} // Handle selected amount
              icon={MdAttachMoney}
            />
            <ExpFilters
              label="Date"
              options={presetDateOptions}
              onSelect={handleDateSelection} // Handle selected amount
              icon={ MdCalendarMonth}
            />          
          </div>
          <header className='grid forBoxes '>
              <section>
                
                <ExpTable 
                  maxHeight="max-h-72" 
                  showPagination={true} 
                  itemsPerPage={7}  
                  data={filteredData}/>
              </section>  
            </header>
        </div>
      </DrawerLayout>
    </>
  );
}
