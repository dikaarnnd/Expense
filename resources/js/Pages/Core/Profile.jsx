/* eslint-disable prettier/prettier */
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FaEdit} from "react-icons/fa";

import DrawerLayout from '@/Layouts/DrawerLayout';
import ModalBalance from '@/Components/ModalBalance';
import ModalCategory from '@/Components/ModalCategory';
import DeleteUserForm from '../Profile/Partials/DeleteUserForm';

const Profile = ({ setBalance: initialSetBalance, categories = []}) => {
  const user = usePage().props.auth.user;
  const [balance, setBalance] = useState(null);
  // const [selectedCategoriesState, setSelectedCategoriesState] = useState(selectedCategories);

  // Set nilai awal balance dari props
  useEffect(() => {
    if (initialSetBalance !== null && initialSetBalance !== undefined) {
      setBalance(initialSetBalance);
    }
  }, [initialSetBalance]);

  const handleLogout = () => {
    router.post(route('logout')); // Melakukan POST ke route logout
  };

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

  const handleSave = (updatedCategories) => {
    const selectedIds = updatedCategories
            .filter((category) => category.isChecked)
            .map((category) => category.id);

    // Kirim data ke backend menggunakan Inertia
    router.post(('category.update', { selected_categories: selectedIds }), {
        onSuccess: () => {
            alert('Preferences updated successfully!');
        },
    });
  };

  const selectedCategoryNames = categories
        .filter((category) => selectedCategoriesState.includes(category.id))
        .map((category) => `${category.emoji} ${category.name}`);

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
                      <FaEdit className='text-allBlack'/>
                    </div>
                    <p className='text-paleBlack'>{user.email}</p>
                  </div>
                  <div className='flex justify-between items-center p-2'>
                    <p className='text-paleBlack'>Last update : {formatDate(user.updated_at)} </p>
                    <p className='text-subheading'> Created at : {formatDate(user.created_at)} </p>
                  </div>
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
                    <h1 className='boxLabel '> Your current balance</h1>
                    {/* <ModalBalance setBalance={setBalance}/> */}
                  </div>
                  <p className={` ${!balance ? 'nodataText ' : 'text-green currency'}`}>
                    {balance ? (
                        <>
                          <span className="text-lg pr-1">IDR </span>{formatCurrency(balance)}
                        </>
                      )  : '// No balance has been set'}
                  </p>
                </section>

                <section>
                  <div className='min-h-40 space-y-4'>
                    <div className='flex items-center justify-between mr-2 '>
                      <h1 className='boxLabel'> Your active categories</h1>
                      {/* <ModalCategory  categories={categories.map((category) => ({
                            ...category,
                            isChecked: selectedCategoriesState.includes(category.id),
                        }))}
                        onSave={handleSave}
                      /> */}
                      <ModalCategory  categories={categories} onSave={handleSave}/>
                      
                    </div>

                    <div >
                      <ul className='my-2 font-GRegular text-sm text-paleBlack gap-4 grid grid-cols-2 scrollnobar max-h-44'>
                        {/* {categories.map((category) => (
                          <li key={category.id}>
                            <span>{category.emoji}</span> {category.name}
                          </li> */}
                          {selectedCategoryNames.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
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
