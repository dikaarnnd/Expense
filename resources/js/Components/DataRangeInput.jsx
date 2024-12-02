/* eslint-disable prettier/prettier */
import { useState } from 'react';

const DateRangeInput = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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
                  className='txtInput w-full'
                  value={startDate}
                  onChange={handleStartDateChange}
                />
            </label>
            <label className='text-sm font-GRegular text-paleBlack'>
                End Date:
                <input
                  type="date"
                  className='txtInput w-full'
                  value={endDate}
                  onChange={handleEndDateChange}
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
