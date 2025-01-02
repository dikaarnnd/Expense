/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { router } from '@inertiajs/react'; // Removed the unused `useForm` and `Inertia` imports

import '../../css/others.css';

import TextInput from './TextInput';
import DateRangeInput from './DateRangeInput';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
    );
};

// Example component to demonstrate usage of Modal
export default function ModalBalance({ initialSetBalance }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const [period, setPeriod] = useState(); // Add state for period
    const [startDate, setStartDate] = useState(null); // Changed to null as default
    const [endDate, setEndDate] = useState(null); // Changed to null as default
    const [balance, setYourBalance] = useState('');
    const [lastUpdated, setLastUpdated] = useState(null);

    // Edit Balance
    const [isEditing, setIsEditing] = useState(false); // State untuk mode edit
    const [editId, setEditId] = useState(null); // ID balance yang sedang diupdate
    const [fetchedBalance, setFetchedBalance] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
        setCurrentDate(new Date());
        
        if (initialSetBalance) {
            // Jika balance diberikan, set modal untuk edit mode
            setIsEditing(true);
            setEditId(balance.id);
        } else {
            // Jika tidak ada balance, set modal untuk mode add
            setIsEditing(false);
            setEditId(null);
            setYourBalance('');
            setPeriod('');
            setStartDate(null);
            setEndDate(null);
        }
    };
    const closeModal = () => setIsModalOpen(false);

    // useEffect(() => {
    //     if (isEditing && editId) {
    //         const fetchBalance = async () => {
    //             try {
    //                 const response = await router.get(route('balances.show', { id: editId }));
    //                 const data = response.data;
    //                 setFetchedBalance(data); // Simpan data balance
    //                 setYourBalance(data.setBalance || ""); // Gunakan data dari server
    //                 setPeriod(data.plan_date || null);
    //                 setStartDate(data.start_date || null);
    //                 setEndDate(data.end_date || null);
    //             } catch (error) {
    //                 console.error("Error fetching balance data:", error);
    //             }
    //         };
    //         fetchBalance();
    //     }
    // }, [isEditing, editId]);

    useEffect(() => {
        if (period === 'monthly') {
            const currentDate = new Date();
            const start = currentDate.toISOString().split('T')[0]; // Set start date to current date
            const end = new Date(currentDate);
            end.setMonth(end.getMonth() + 1); // Set end date to 1 month later
            setStartDate(start);
            setEndDate(end.toISOString().split('T')[0]); // Format end date
        }
    }, [period, isModalOpen]); // Re-run effect when modal opens or period changes

    // Reset balance and last updated when a month has passed since last update
    useEffect(() => {
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
    }, [period, lastUpdated]);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validate balance
        if (isNaN(balance) || balance <= 0) {
            alert("Please enter a valid positive balance.");
            return;
        }
    
        const data = {
            setBalance: balance,
            plan_date: period,
            start_date: startDate,
            end_date: endDate,
        }
        // console.log("Data to be submitted:", data);

        if (isEditing) {
            // Call API to update balance
            router.put(route('balances.update', { id: editId }), data, {
                onSuccess: () => {
                    alert('Balance successfully updated!');
                    initialSetBalance(setYourBalance); // Update the balance in parent component
                    closeModal();
                },
                onError: (errors) => handleErrors(errors),
            });
        } else {
            // Call API to add new balance
            router.post(route('balances.store'), data, {
                onSuccess: () => {
                    // alert('Balance successfully added!');
                    initialSetBalance(setYourBalance); // Update the balance in parent component
                    closeModal();
                },
                onError: (errors) => handleErrors(errors),
            });
        }
    };

    const handleErrors = (errors) => {
        const errorMessages = [];
        if (errors.setBalance) errorMessages.push(`Balance: ${errors.setBalance}`);
        if (errors.plan_date) errorMessages.push(`Period: ${errors.plan_date}`);
        if (errors.start_date) errorMessages.push(`Start Date: ${errors.start_date}`);
        if (errors.end_date) errorMessages.push(`End Date: ${errors.end_date}`);
        alert(errorMessages.length > 0 ? errorMessages.join('\n') : "An error occurred. Please try again.");
    };
    
    
    return (
        <div>
            <FaEdit className='hover:cursor-pointer text-paleBlack text-lg rounded-md' onClick={() => openModal(1)}/>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className='flex justify-between items-start'>
                  <div className="min-h-20 mt-2 space-y-2">
                    <h1>{isEditing ? "Edit your balance" : "Add a new balance"}</h1>
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
                            id="setBalance"
                            name="setBalance"
                            type='number'
                            step="0.01"
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

                        <div className="flex space-x-4 p-2 w-2/3">
                          <label className='rad'>
                              <input
                                  type="radio"
                                  name='period'
                                  value="monthly"
                                  checked={period === 'monthly'}
                                  onChange={() => setPeriod('monthly')}
                              />
                              Monthly
                          </label>
                          <label className='rad'>
                              <input
                                type="radio"
                                name='period'
                                value="custom"
                                checked={period === 'custom'}
                                onChange={() => setPeriod('custom')}
                              />
                              Custom
                          </label>
                        </div>
                    </div>

                    {period === "custom" && (
                        <DateRangeInput
                            onStartDateChange={(date) => {
                                console.log("Start Date:", date);
                                setStartDate(date);
                            }}
                            onEndDateChange={(date) => {
                                console.log("End Date:", date);
                                setEndDate(date);
                            }}
                        />
                    )}

                    <div className="flex justify-between items-center">
                        <p className="text-paleBlack text-sm font-GRegular">Today is {currentDate.toLocaleDateString()}</p>
                        <button className="confirmBtn" type='submit'>
                            {isEditing ? "Update balance" : "Set balance"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
