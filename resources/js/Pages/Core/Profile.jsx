/* eslint-disable prettier/prettier */
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FaEdit} from "react-icons/fa";

import TextInput from '@/Components/TextInput';
import DrawerLayout from '@/Layouts/DrawerLayout';
import ModalCategory from '@/Components/ModalCategory';
import DeleteUserForm from '../Profile/Partials/DeleteUserForm';
import DateRangeInput from '@/Components/DateRangeInput';

const Profile = ({ setBalance, categories, userCategories }) => {
  const user = usePage().props.auth.user;
  const [currentDate, setCurrentDate] = useState(new Date());

  const [balance, setYourBalance] = useState(null);
  const [period, setPeriod] = useState(); // Add state for period
  const [startDate, setStartDate] = useState(null); // Changed to null as default
  const [endDate, setEndDate] = useState(null); // Changed to null as default
  const [lastUpdated, setLastUpdated] = useState(null);

  const [categoryList, setCategoryList] = useState(categories);
  const [selectedCategoriesState, setSelectedCategoriesState] = useState(userCategories  || []);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  const [EditUser, setEditUser] = useState(false);
  const [EditBalance, setEditBalance] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Set nilai awal balance dari props
  useEffect(() => {
    if (setBalance !== null && setBalance !== undefined) {
      setYourBalance(setBalance);
    }
  }, [setBalance]);

  const handleLogout = () => {
    router.post(route('logout')); // Melakukan POST ke route logout
  };

  useEffect(() => {
    if (period === 'monthly') {
        const currentDate = new Date();
        const start = currentDate.toISOString().split('T')[0]; // Set start date to current date
        const end = new Date(currentDate);
        end.setMonth(end.getMonth() + 1); // Set end date to 1 month later
        setStartDate(start);
        setEndDate(end.toISOString().split('T')[0]); // Format end date
    }
  }, [period, EditBalance]); // Re-run effect when modal opens or period changes

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

  const formatBalance = (balance) => {
    if (balance !== null) {
      // Use Intl.NumberFormat to format the number
      return new Intl.NumberFormat('id-ID', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(balance);
    }
    return '';
  };

  // Fungsi untuk membuka modal dalam mode "Add"
  const openAddBalanceModal = () => {
    setYourBalance(''); // Reset balance
    setPeriod('monthly'); // Atur default period (opsional)
    setIsEditing(false); // Set mode menjadi "Add"
    setEditBalance(true); // Buka modal
  };

  // Fungsi untuk membuka modal dalam mode "Edit"
  const openEditBalanceModal = () => {
    setPeriod('');
    setIsEditing(true); // Set mode menjadi "Edit"
    setEditBalance(true); // Buka modal
  };

  const handleSave = () => {
    // Lakukan validasi jika diperlukan
    if (!name || !email) {
        alert("Name and email cannot be empty.");
        return;
    }

    // Panggil API untuk menyimpan perubahan
    const data = { name, email, password };
    router.put(route('profile.update', user.id), data, {
        onSuccess: () => {
            alert('Profile updated successfully!');
            setEditUser(false); // Tutup modal
        },
        onError: (errors) => {
            alert("Failed to update profile. Please try again.");
            console.error(errors);
        },
    });
  };

  const handleUpdate = () => {
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
    };

    if (isEditing) {
        // Call API to update balance
        router.put(route('balances.update'), data, {
            onSuccess: () => {
                alert('Balance successfully updated!');
                setEditBalance(false);
            },
            onError: (errors) => handleErrors(errors),
        });
    } else {
        // Call API to add new balance
        router.post(route('balances.store'), data, {
            onSuccess: () => {
                alert('Balance successfully added!');
                setEditBalance(false);
            },
            onError: (errors) => handleErrors(errors),
        });
    }
  };

  const formatCurrency = (value) => {
    if (value !== null) {
      return new Intl.NumberFormat('id-ID', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    }
    return '';
    
  };
  
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString('en-EN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        // hour: '2-digit',
        // minute: '2-digit',
        // second: '2-digit',
        // timeZoneName: 'short'
    });
  };

    return (
      <>
        <Head title="Profile" />
        <DrawerLayout>
          <main className="p-6 min-h-svh space-y-4 ">
            <div className='mb-4 mt-2 flex items-center justify-between'>
              <h1 className="text-2xl ">Profile settings</h1>
            </div>
            <header className="grid grid-cols-2  gap-4"> 
              <div className="space-y-4 forBoxes">

                <section>
                  <div className='p-2 h-28'>
                    <div className='flex items-center space-x-4'>
                      <h1 className='text-2xl text-allBlack'>{user.name}</h1>
                      <FaEdit
                        className="text-paleBlack text-lg rounded-md hover:cursor-pointer"
                        onClick={() => setEditUser(true)}
                      />
                    </div>
                    <p className='text-paleBlack'>{user.email}</p>
                  </div>
                  <div className='flex justify-between items-center p-2'>
                    <p className='text-paleBlack'>Last update : {formatDate(user.updated_at)} </p>
                    <p className='text-subheading'> Created at : {formatDate(user.created_at)} </p>
                  </div>
                  {/* Modal untuk mengedit profil */}
                  {EditUser && (
                    <div className="modal-overlay" onClick={() => setEditUser(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                          <div className='flex justify-between items-start'>
                            <div className="min-h-20 mt-2 space-y-2">
                              <h1>Edit your profile</h1>
                            </div>
                          </div>
                          <form
                              onSubmit={(e) => {
                                  e.preventDefault();
                                  handleSave();
                              }}
                          >
                            <div className="mb-4">
                              <label className="inputLabel">Name</label>
                              <TextInput
                                type="text"
                                className="w-full p-2 border rounded"
                                value={name}
                                autoComplete="off"
                                onChange={(e) => setName(e.target.value)}
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label className="inputLabel">Email</label>
                              <TextInput
                                type="email"
                                className="w-full p-2 border rounded"
                                value={email}
                                // autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label className="inputLabel">Password</label>
                              <TextInput
                                type="password"
                                className="w-full p-2 border rounded"
                                value={password}
                                // autoComplete="off"
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="confirmBtn"
                                    onClick={() => setEditUser(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="confirmBtn"
                                >
                                    Save
                                </button>
                            </div>
                          </form>
                        </div>
                    </div>
                  )}
                </section>

                <div className="space-y-2">
                  <section>
                    <h1 className="text-sm font-GRegular">About Expenses</h1>
                  </section>
                  <section>
                    <h1 className="text-sm font-GRegular">Terms of Use</h1>
                  </section>
                  <section>
                    <h1 className="text-sm font-GRegular">FAQ, Guides, and Help</h1>
                  </section>
                </div>
              </div>

              <div className="space-y-4 forBoxes">

                <section>
                  <div className='flex items-center justify-between mr-2 '>
                    <h1 className='boxLabel '>Your current balance</h1>
                    {balance ? (
                      <>
                        <FaEdit
                          className="text-paleBlack text-lg rounded-md hover:cursor-pointer"
                          onClick={openEditBalanceModal}
                        />
                      </>
                    )  : <FaEdit
                            className="text-paleBlack text-lg rounded-md hover:cursor-pointer"
                            onClick={openAddBalanceModal}
                          />
                    }
                  </div>
                  <p className={` ${!balance ? 'nodataText ' : 'text-green currency'}`}>
                    {balance ? (
                        <>
                          <span className="text-lg pr-1">IDR </span>{formatCurrency(balance)}
                        </>
                      )  : '// No balance has been set'}
                  </p>
                  {EditBalance && (
                    <div className="modal-overlay" onClick={() => setEditBalance(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                          <div className='flex justify-between items-start'>
                            <div className="min-h-20 mt-2 space-y-2">
                              <h1>{isEditing ? "Edit your balance" : "Add a new balance"}</h1>
                              <h2>Balance helps track expenses.</h2>
                            </div>
                          </div>
                          <form
                              onSubmit={(e) => {
                                  e.preventDefault();
                                  handleUpdate();
                              }}
                              className='mt-4 space-y-4 min-h-10'
                          >
                            <div className="flex justify-between">
                              <div className="flex-col">
                                  <p className="inputLabel">Set balance</p>
                                  <p className="tipLabel">// Set your balance</p>
                              </div>
                              <TextInput
                                  id="setBalance"
                                  name="setBalance"
                                  type="number"
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
                        </div>
                    </div>
                  )}
                </section>

                <section>
                  <div className='min-h-40 space-y-4'>
                    <div className='flex items-center justify-between mr-2 '>
                      <h1 className='boxLabel'> Your active categories</h1>
                      {/* <ModalCategory categories={categoryList} onSave={handleSubmit} /> */}
                      <ModalCategory categories={categoryList} />
                    </div>

                    <div >
                      <ul className='my-2 font-GRegular text-sm text-paleBlack gap-4 grid grid-cols-2 scrollnobar max-h-44'>
                        {selectedCategoriesState.length > 0 ? (
                          selectedCategoriesState.map((category) => (
                              <li key={category.id}>
                                  <span>{category.emoji}</span> {category.name}
                              </li>
                          ))
                        ) : (
                            <p>No active categories selected.</p>
                        )}
                      </ul>
                    </div>

                  </div>
                </section>

              </div>
            </header>

            <div className="flex justify-end items-center space-x-8 pt-6 ">
              {/* <p className="text-alert text-sm font-GRegular"> Delete account </p> */}
              <DeleteUserForm/>
              <button className="alertBtn" onClick={handleLogout}>Log out</button>
            </div>
          </main>

        </DrawerLayout>
      
      
      </>
    );
};

export default Profile;
