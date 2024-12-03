/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";

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
    const [balance, setYourBalance] = useState("");
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (balance) {
            setBalance(balance);  // Set the balance in the parent component
            setLastUpdated(new Date());
            closeModal();
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
                            value={balance} // Controlled input
                            onChange={(e) => setYourBalance(e.target.value)}
                            
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
                      <button className="confirmBtn ">Set balance</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
