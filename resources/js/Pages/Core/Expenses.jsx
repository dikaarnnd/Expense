/* eslint-disable prettier/prettier */
import { Head } from '@inertiajs/react';

import DrawerLayout from '@/Layouts/DrawerLayout';
import ExpFilters from '@/Components/ExpFilters';
import ExpTable from '@/Components/ExpTable';
import IconLink from '@/Components/IconLink';

export default function Dashboard() {
  const handleCategorySelection = (selectedCategory) => {
    console.log(`Selected category: ${selectedCategory}`);
  };

  const handleAmountSelection = (selectedAmount) => {
    console.log(`Selected amount: ${selectedAmount}`);
  };

  const handleDateSelection = (selectedDate) => {
    console.log(`Selected date: ${selectedDate}`);
  };


  const categoryOptions = ['All', 'Food', 'Transport', 'Entertainment', 'Utilities'];
  const amountOptions = ['All', 'Highest', 'Lowest'];
  const presetDateOptions = ['Recent', 'Yesterday', 'This week', 'This Month'];

  return (
    <>
      <Head title="Expenses" />
      <DrawerLayout>
        <div className="p-6 min-h-svh space-y-2">
          <h1 className="text-2xl">Your expenses data</h1>
          
          <div className='flex space-x-2 '>
            <ExpFilters
              label="Category"
              options={categoryOptions}
              onSelect={handleCategorySelection}  // Handle selected category
            />
            <ExpFilters
              label="Amount(IDR)"
              options={amountOptions}
              onSelect={handleAmountSelection} // Handle selected amount
            />
            <ExpFilters
              label="Date"
              options={presetDateOptions}
              onSelect={handleDateSelection} // Handle selected amount
            />
          
          </div>
          <header className='grid forBoxes'>
              <section>
                
                <ExpTable maxHeight="max-h-72" showPagination={true} itemsPerPage={10}/>
              </section>  
            </header>
        </div>
      </DrawerLayout>
    </>
  );
}
