/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { FaEdit } from "react-icons/fa";

import '../../css/others.css';

import TextInput from './TextInput';
import DateRangeInput from './DataRangeInput';

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
export default function ModalBalance() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [period, setPeriod] = useState('monthly'); // Add state for period

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div >
            {/* <button className="confirmBtn" onClick={openModal}>
                Open Modal
            </button> */}
            <FaEdit className='hover:cursor-pointer text-darkprimary text-lg rounded-md ' onClick={openModal}/>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
              
                <div className='flex justify-between items-start'>
                  <div className="min-h-20 mt-2 space-y-2">
                      <h1>Set or edit your balance</h1>
                      <h2>Balance is needed to track your expenses!</h2>
                  </div>
                  <div className="flex justify-end">
                    <button className="modal-close" onClick={closeModal}> &times; </button>
                  </div>
                </div>


                {/* [-------] Form Balance [------] */}
                <form className="mt-6 space-y-4 min-h-10">
                    <div className="flex justify-between">
                        <div className="flex-col">
                            <p className="inputLabel">Set balance in IDR</p>
                            <p className="tipLabel">// Set your balance</p>
                        </div>
                        <TextInput
                            id="name"
                            name="name"
                            placeholder="Enter IDR..."
                            className="w-2/3"
                            autoComplete="name"
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
                    <div className="flex justify-end">
                      <button className="confirmBtn ">Set balance</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
