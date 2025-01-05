/* eslint-disable prettier/prettier */
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import DrawerLayout from '@/Layouts/DrawerLayout';

import TextInput from '@/Components/TextInput';

export default function AddExpense({ userCategories = [] }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setSelectedDate(formattedDate); // Set both static and input date to current date
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  

  const validateForm = () => {
    const validationErrors = {};
  
    // Validate price
    if (!price || price <= 0) {
      validationErrors.price = 'Price must be a positive number.';
    }
  
    // Validate category
    if (!category) {
      validationErrors.category = 'Please select a category.';
    }
  
    // Validate date
    if (!selectedDate) {
      validationErrors.buyDate = 'Please select a date.';
    }
  
    // Validate notes if provided (optional field)
    if (note && note.length < 3) {
      validationErrors.notes = 'Notes must be at least 3 characters long.';
    }
  
    setErrors(validationErrors); // Set errors state
    return Object.keys(validationErrors).length === 0; // Return true if no errors
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Validate form before submitting
    if (!validateForm()) {
      return; // If validation fails, do not proceed with submission
    }
  
    const expenseData = {
      price,
      category_id: category,
      notes: note,
      buyDate: selectedDate,
    };
  
    router.post(route('add.expense'), expenseData, {
      onSuccess: () => {
        // Reset form after successful submission
        setPrice('');
        setCategory('');
        setNote('');
        setSelectedDate(new Date().toISOString().split('T')[0]);
        setErrors({}); // Reset errors
      },
      onError: handleErrors,
    });
  };
  



const handleErrors = (errors) => {
  const errorMessages = [];
  if (errors.price) errorMessages.push(`Price: ${errors.price}`);
  if (errors.category_id) errorMessages.push(`Category: ${errors.category_id}`);
  if (errors.notes) errorMessages.push(`Notes: ${errors.notes}`);
  if (errors.buyDate) errorMessages.push(`Buy Date: ${errors.buyDate}`);
  alert(errorMessages.length > 0 ? errorMessages.join('\n') : "An error occurred. Please try again.");
};

  
  return (
    <>
      <Head title="Add Expense" />
        <DrawerLayout>
          <main className="lg:px-52  p-6 min-h-svh space-y-6 ">
            <div className='mb-4 mt-2 space-y- '>
              <h1 className='text-2xl'>Add Expense</h1>
              <h2>Track your expenses by filling out the form.</h2>
            </div>

            {/* Form nya 👇 */}
            <form className="mt-4 space-y-6" onSubmit={handleSubmit} >
              <TextInput
                label="Item price in IDR" tip="// How much did you buy it for?"
                id="price" name="price" type="number"
                className="w-2/3"  placeholder="Type amount of IDR..."
                showLabelTip={true}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && <p className="text-red-600 text-sm">{errors.price}</p>}

              <div className="flex space-x-8 justify-between">
                <div className="flex-col">
                  <p className="inputLabel">Pick a category</p>
                  <p className="tipLabel">// Which category fits the item?</p>
                </div>
                <select
                  id="category"
                  name="category"
                  className="rounded-sm bg-allWhite border-paleBlack text-allBlack shadow-sm focus:border-primary focus:ring-primary w-2/3"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {/* <option value="">Select Category</option> */}
                  {userCategories.map((category) => (
                      <option key={category.id} value={category.id} >
                          {category.emoji} {category.name}
                      </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
              </div>
              
              <TextInput
                label="Choose the date" tip="// When did you buy the item?"
                id="date" name="date" type="date"
                className="w-2/3 dateInput" placeholder="Select date"
                showLabelTip={true}
                value={selectedDate} 
                onChange={handleDateChange}
              />
              {errors.buyDate && <p className="text-red-600 text-sm">{errors.buyDate}</p>}

              <TextArea
                label="Notes" tip="// What was this expense for?"
                id="notes" name="notes"
                placeholder="Enter your notes..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              {errors.notes && <p className="text-red-600 text-sm">{errors.notes}</p>}

              <div className="flex justify-between items-center">
                <p className="text-paleBlack text-sm font-GRegular"> Today is {new Date().toLocaleDateString()}</p>
                <button className="confirmBtn ">Submit</button>
              </div>
            </form>
          </main>          
        </DrawerLayout>
    </>
  );
}

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