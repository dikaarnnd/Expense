/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';

const DateRangeInput = ({ onStartDateChange, onEndDateChange }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
      const currentDate = new Date();
      const formattedDate = currentDate
          .toLocaleDateString('en-CA') // 'en-CA' gives the 'yyyy-mm-dd' format
          .split('/') // Split the date into an array
          .join('-'); // Join with dashes to ensure the 'yyyy-mm-dd' format
      setStartDate(formattedDate);
  }, []);

    // Handle changes for start and end date
    const handleStartDateChange = (event) => {
      const value = event.target.value;
      setStartDate(value);
      onStartDateChange(value); // Send value to parent
    };

    const handleEndDateChange = (event) => {
      const value = event.target.value;
      setEndDate(value);
      onEndDateChange(value); // Send value to parent
    };

    return (
        <div className='flex items-center justify-between'>
          <div className="flex-col">
              <p className="inputLabel">Set plan date </p>
              <p className="tipLabel">// Set the plan date manually </p>
          </div>
          <div className='flex w-2/3 space-x-4'>
            <label className='text-sm font-GRegular text-paleBlack'>
                Start Date:
                <input
                  id='balance_start_date'
                  type="date"
                  className='dateInput w-full'
                  value={startDate}
                  onChange={handleStartDateChange}
                  // onChange={onChange}
                  required
                />
            </label>
            <label className='text-sm font-GRegular text-paleBlack'>
                End Date:
                <input
                  id="balance_end_date"
                  type="date"
                  className='txtInput w-full'
                  value={endDate}
                  onChange={handleEndDateChange}  
                  // onChange={onChange}
                  required
                />
            </label>
          </div>
        </div>
    );
};

export default DateRangeInput;
