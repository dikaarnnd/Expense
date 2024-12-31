/* eslint-disable prettier/prettier */
import { Head } from '@inertiajs/react';
import { useState } from 'react';

import DrawerLayout from '@/Layouts/DrawerLayout';
import ExpFilters from '@/Components/ExpFilters';
import ExpTable from '@/Components/ExpTable';

import { MdCategory, MdAttachMoney,  MdCalendarMonth} from "react-icons/md";

export default function Expenses({ expenses }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAmount, setSelectedAmount] = useState('All');
  const [selectedDate, setSelectedDate] = useState('Recent');

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

  const filteredData = expenses
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
                  data={filteredData.map(item => ({
                    ...item,
                    category: `${item.emoji} ${item.category}` // Sisipkan emoji pada kategori
                  }))}
                  />
              </section>  
            </header>
        </div>
      </DrawerLayout>
    </>
  );
}
