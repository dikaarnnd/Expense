/* eslint-disable prettier/prettier */
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import DrawerLayout from '@/Layouts/DrawerLayout';

import TextInput from '@/Components/TextInput';

const AddExpense = () => {
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setSelectedDate(formattedDate); // Set both static and input date to current date
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const data = [
    { category: '🍔 Food' },  { category: '🏠 Housing' },
    { category: '🚗 Transportation' }, { category: '💪 Health & Fitness' },
    { category: '🎬 Entertainment' }, { category: '📚 Education' },
    { category: '🚗 Transportation' },{ category: '🛍️ Shopping' },
    { category: '📳 Transfer' },{ category: '🛠️ Repairs' },
    { category: '📱 Phone & Internet' },
  ];

  const categories= Array.from(new Set(data.map((item) => item.category)));
  return (
    <>
      <Head title="Profile" />
        <DrawerLayout>
          <main className="px-52 p-6 min-h-svh space-y-6 ">
            
              
            <div className='mb-4 mt-2 space-y- '>
              <h1 className='text-2xl'>Add Expense</h1>
              <h2>Track your expenses by filling out the form.</h2>
            </div>

            {/* Form nya 👇 */}
            <form className="mt-4 space-y-6" onSubmit={{}}>
              <TextInput
                label="Item price in IDR"
                tip="// How much did you buy it for?"
                id="price"
                name="price"
                type="number"
                className="w-2/3"
                placeholder="Type amount of IDR..."
                showLabelTip={true}
              />
              <div className="flex space-x-8 justify-between">
                <div className="flex-col">
                  <p className="inputLabel">Pick a category</p>
                  <p className="tipLabel">// Which category fits the item?</p>
                </div>
                <select
                  id="category"
                  name="category"
                  className="rounded-sm bg-allWhite border-paleBlack text-allBlack shadow-sm focus:border-primary focus:ring-primary w-2/3"
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category} >
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <TextInput
                label="Choose the date"
                tip="// When did you buy the item?"
                id="date"
                name="date"
                type="date"
                className="w-2/3 dateInput "
                placeholder="Select date"
                showLabelTip={true}
                value={selectedDate} 
                onChange={handleDateChange}
              />
              <TextArea
                label="Notes"
                tip="// What was this expense for?"
                id="notes"
                name="notes"
                placeholder="Enter your notes..."
              />
              <div className="flex justify-between items-center">
                <p className="text-paleBlack text-sm font-GRegular"> Today is {new Date().toLocaleDateString()}</p>
                <button className="confirmBtn ">Submit</button>
              </div>
              
                
              
            </form>

          </main>

          
        </DrawerLayout>
    </>
  );
};

export default AddExpense;

const TextArea = ({ label, tip, id, name, ...props }) => (
  <div className="flex justify-between">
    <div className="flex-col">
      <p className="inputLabel">{label}</p>
      <p className="tipLabel">{tip}</p>
    </div>
    <textarea
      {...props}
      id={id}
      name={name}
      className="rounded-sm bg-allWhite border-paleBlack text-allBlack shadow-sm focus:border-primary focus:ring-primary w-2/3 h-28"
    />
  </div>
);