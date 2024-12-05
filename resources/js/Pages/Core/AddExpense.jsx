/* eslint-disable prettier/prettier */
import { Head, Link } from '@inertiajs/react';
import DrawerLayout from '@/Layouts/DrawerLayout';

const AddExpense = () => {
    return (
      <>
        <Head title="Profile" />
          <DrawerLayout>
            <main className="p-6 min-h-svh space-y-4">
              <div className='mb-4 mt-2 flex items-center justify-between'>
                <h1 className='text-2xl'>Add Expense</h1>
              </div>

            </main>

            
          </DrawerLayout>
      </>
    );
};

export default AddExpense;
