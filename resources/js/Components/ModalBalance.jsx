/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
// import { Inertia } from '@inertiajs/inertia';


import '../../css/others.css';

import TextInput from './TextInput';
import DateRangeInput from './DateRangeInput';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
          
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* <div className="flex justify-end">
              <button className="modal-close" onClick={onClose}> &times; </button>

            </div> */}
            {children}
          </div>
        </div>
    );
};

// Example component to demonstrate usage of Modal
export default function ModalBalance({setBalance}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    const [period, setPeriod] = useState('monthly'); // Add state for period
    // const [balance, setYourBalance] = useState("");
    const [balance, setYourBalance] = useState({
        setYourBalance: '',
        plan_date: 'monthly', // Default monthly
        start_date: '',
        end_date: ''
      });
    
    const [lastUpdated, setLastUpdated] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
        setCurrentDate(new Date());
    };
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        // Check if the balance needs to be reset
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
    }, [isModalOpen, period, lastUpdated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (balance) {
        //     Inertia.post('/balance', balance);
        //     setBalance(balance);  // Set the balance in the parent component
        //     setLastUpdated(new Date());
        //     closeModal();
        // }
        if (!balance.setYourBalance || isNaN(balance.setYourBalance)) {
            alert('Please enter a valid balance.');
            return;
        }

        // Validasi untuk periode custom
        if (period === 'custom') {
            if (!balance.start_date || !balance.end_date) {
                alert('Please select both start and end dates.');
                return;
            }
            
            // Pastikan tanggal dalam format yang benar
            const formattedStartDate = new Date(balance.start_date).toISOString().split('T')[0]; // Format YYYY-MM-DD
            const formattedEndDate = new Date(balance.end_date).toISOString().split('T')[0]; // Format YYYY-MM-DD

            // Update nilai dalam state
            setYourBalance(prev => ({
                ...prev,
                start_date: formattedStartDate,
                end_date: formattedEndDate
            }));
        }

        // Kirim data ke backend (misalnya menggunakan Inertia.js)
        try {
            const response = await Inertia.post('/balance', {
                balance: balance.setYourBalance,
                plan_date: period,
                start_date: balance.start_date,
                end_date: balance.end_date
            });

            if (response.props.success) {
                // Update balance in parent component
                setBalance(parseFloat(balance.setYourBalance)); 
                setLastUpdated(new Date()); // Update last updated date
                closeModal();
            } else {
                alert('Failed to set balance. Please try again.');
            }
        } catch (error) {
            console.error('Error saving balance:', error);
            alert('An error occurred. Please try again later.');
        }
    };
    
    return (
        <div >
            {/* <button className="confirmBtn" onClick={openModal}>
                Open Modal
            </button> */}
            <FaEdit className='hover:cursor-pointer text-paleBlack text-lg rounded-md' onClick={openModal}/>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
              
                <div className='flex justify-between items-start'>
                  <div className="min-h-20 mt-2 space-y-2">
                      <h1>Set or edit your balance</h1>
                      <h2>Balance helps track expenses.</h2>
                  </div>
                  <div className="flex justify-end">
                    <button className="modal-close" onClick={closeModal}> &times; </button>
                  </div>
                </div>


                {/* [-------] Form Balance [------] */}
                <form className="mt-4 space-y-4 min-h-10" onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                        <div className="flex-col">
                            <p className="inputLabel">Set balance</p>
                            <p className="tipLabel">// Set your balance</p>
                        </div>
                        <TextInput
                            id="balance"
                            name="balance"
                            type='number'
                            placeholder="Type amount of IDR..."
                            className="w-2/3"
                            autoComplete="off"
                            value={balance.setYourBalance} // Controlled input
                            onChange={(e) => setYourBalance({ ...balance, setYourBalance: e.target.value })}
                            
                            required
                        />
                    </div>

                    <div className="flex justify-between">
                        <div className="flex-col">
                            <p className="inputLabel">Select period</p>
                            <p className="tipLabel">// Set your balance period</p>
                        </div>

                        <div className="flex space-x-4 p-2 w-2/3 ">
                          <label className='rad'>
                              <input
                                
                                  type="radio"
                                  value="monthly"
                                  checked={period === 'monthly'}
                                  onChange={() => setPeriod('monthly')}
                              />
                              Monthly
                          </label>
                          <label className='rad'>
                              <input
                                type="radio"
                                value="custom"
                                checked={period === 'custom'}
                                onChange={() => setPeriod('custom')}
                              />
                              Custom
                          </label>
                            
                        </div>
                    </div>
                    {period === 'custom' && <DateRangeInput />}
                    <div className="flex justify-between items-center">
                        <p className="text-paleBlack text-sm font-GRegular">Today is  {currentDate.toLocaleDateString()}</p>
                      <button className="confirmBtn">Set balance</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
