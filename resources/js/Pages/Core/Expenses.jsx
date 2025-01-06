/* eslint-disable prettier/prettier */
import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

import DrawerLayout from '@/Layouts/DrawerLayout';
import ExpFilters from '@/Components/ExpFilters';
import ExpTable from '@/Components/ExpTable';
import IconLink from '@/Components/IconLink';
import { FaRegPlusSquare } from 'react-icons/fa';

import { MdCategory, MdAttachMoney,  MdCalendarMonth} from "react-icons/md";

export default function Expenses({ expenses, categories, filterCategory }) {
  const [selectedCategory, setSelectedCategory] = useState(filterCategory || 'All');
  const [selectedAmount, setSelectedAmount] = useState('All');
  const [selectedDate, setSelectedDate] = useState('Recent');

  const categoryMap = {
    1: { name: 'Housing', emoji: '🏠' },
    2: { name: 'Education', emoji: '📚' },
    3: { name: 'Travel', emoji: '🧳' },
    4: { name: 'Transportation', emoji: '🚗' },
    5: { name: 'Transfer', emoji: '📳' },
    6: { name: 'Groceries', emoji: '🧃' },
    7: { name: 'Food', emoji: '🍔' },
    8: { name: 'Repairs', emoji: '🛠️' },
    9: { name: 'Gadgets', emoji: '🕹️' },
    10: { name: 'Entertainment', emoji: '🎬' },
    11: { name: 'Shopping', emoji: '🛍️' },
    12: { name: 'Subscriptions', emoji: '📑' },
    13: { name: 'Health & Fitness', emoji: '💪' },
    14: { name: 'Phone & Internet', emoji: '📱' },
    15: { name: 'Online Shop', emoji: '🛒' }
  };

  
  const handleCategorySelection = (selectedCategory) => {
    setSelectedCategory(selectedCategory);

    // Kirim permintaan ke server dengan parameter kategori
    router.get(route('Expenses'), { category_id: selectedCategory === 'All' ? '' : selectedCategory });
  };

  const handleAmountSelection = (selectedAmount) => {
    setSelectedAmount(selectedAmount);
  };

  const handleDateSelection = (selectedDate) => {
    setSelectedDate(selectedDate);
  };

  

  const categoryOptions = [
    { id: 'All', label: 'All' },
    ...categories.map((category) => ({
        id: category.id,
        label: `${categoryMap[category.id]?.emoji || ''} ${categoryMap[category.id]?.name || 'Unknown'}`
    }))
  ];


  const amountOptions = ['All', '⬆ Highest', ' ⬇ Lowest'];
  const presetDateOptions = ['Recent', 'Yesterday', 'This week', 'This Month'];

  const filteredData = expenses.filter((item) => {
    // Category Filter
    if (selectedCategory !== 'All') {
      // Convert selectedCategory to a number for comparison
      if (item.category_id !== Number(selectedCategory)) {
        return false;
      }
    }
    return true; // Keep the item if it passes the filter condition
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

  const noDataMessage = filteredData.length === 0 ? "No data available for this category" : "";

  return (
    <>
      <Head title="Expenses" />
      <DrawerLayout>
        <div className="p-6 min-h-svh space-y-2">
          <h1 className="text-2xl mb-4 mt-2">Your expenses data</h1>
          
          <div className='flex justify-between items-center'>
            <div className='flex space-x-2 '>

              <ExpFilters
                label="Category"
                options={categoryOptions.map((option) => option.label)} // Display name and emoji in options
                onSelect={(label) => {
                  // Find the selected option by the label and get the id for selection
                  const selected = categoryOptions.find((option) => option.label === label);
                  handleCategorySelection(selected ? selected.id : 'All');
                }}
                icon={MdCategory}
                selectedCategory={selectedCategory}  // Pass the selected category state to ExpFilters
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
            <IconLink href={route('AddExpense')} icon={FaRegPlusSquare} size='14px' className="p-2 px-4 rounded-md border border-subheading shadow-md">
              <p>Add expense</p>  
            </IconLink>
          </div>
          
          
          <header className='grid forBoxes '>
              <section>
                <ExpTable 
                  maxHeight="max-h-72" 
                  showPagination={true} 
                  itemsPerPage={7}  
                  data={filteredData.map(item => ({
                    ...item,
                    category: `${item.emoji} ${item.category}` 
                  }))}
                  noDataMessage={noDataMessage}
                />
              </section>  
            </header>
        </div>
      </DrawerLayout>
    </>
  );
}
