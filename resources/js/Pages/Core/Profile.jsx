/* eslint-disable prettier/prettier */
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { FaEdit} from "react-icons/fa";

import DrawerLayout from '@/Layouts/DrawerLayout';
import ModalBalance from '@/Components/ModalBalance';
import ModalCategory from '@/Components/ModalCategory';
import DeleteUserForm from '../Profile/Partials/DeleteUserForm';

const Profile = () => {
  const user = usePage().props.auth.user;

  const handleLogout = () => {
    router.post(route('logout')); // Melakukan POST ke route logout
  };

  const [balance, setBalance] = useState(null);
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
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        // timeZoneName: 'short'
    });
  };

  const categories = [
    { id: 1, emoji: "🏠", name: "Housing" },
    { id: 2, emoji: "📚", name: "Education" },
    { id: 3, emoji: "🧳", name: "Travel" },
    { id: 4, emoji: "🚗", name: "Transportation" },
    { id: 5, emoji: "📳", name: "Transfer" },
    { id: 6, emoji: "🧃", name: "Groceries" },
    { id: 7, emoji: "🍔", name: "Food" },
    { id: 8, emoji: "🛠️", name: "Repairs" },
    { id: 9, emoji: "🕹️", name: "Gadgets" },
    { id: 10, emoji: "🎬", name: "Entertainment" },
  ]
  

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
                      {/* <h1 className='text-2xl text-allBlack'>DIka</h1> */}
                      <h1 className='text-2xl text-allBlack'>{user.name}</h1>
                      <FaEdit className='text-allBlack'/>
                    </div>
                    {/* <p className='text-paleBlack'>yoo</p> */}
                    <p className='text-paleBlack'>{user.email}</p>
                  </div>
                  <div className='flex justify-between items-center p-2'>
                    {/* <p className='text-paleBlack'>Last update : 121212 </p> */}
                    <p className='text-paleBlack'>Last update : {formatDate(user.updated_at)} </p>
                    {/* <p className='text-subheading'> Created at : 121212 </p> */}
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
                    <ModalBalance setBalance={setBalance}/>
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
                      <ModalCategory/>
                      
                    </div>

                    <div >
                      <ul className='my-2 font-GRegular text-sm text-paleBlack gap-4 grid grid-cols-2 scrollnobar max-h-44'>
                        {categories.map((category) => (
                          <li key={category.id}>
                            <span>{category.emoji}</span> {category.name}
                          </li>
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
