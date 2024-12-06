/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';

const DateRangeInput = () => {
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
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
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
                  type="date"
                  className='dateInput w-full'
                  value={startDate}
                  onChange={handleStartDateChange}
                  required
                />
            </label>
            <label className='text-sm font-GRegular text-paleBlack'>
                End Date:
                <input
                  type="date"
                  className='txtInput w-full'
                  value={endDate}
                  onChange={handleEndDateChange}
                  required
                />
            </label>

          </div>

          {/* <div>
              <p>Start Date: {startDate}</p>
              <p>End Date: {endDate}</p>
          </div> */}
        </div>
    );
};

export default DateRangeInput;
