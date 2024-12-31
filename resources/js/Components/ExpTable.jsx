/* eslint-disable prettier/prettier */
import { useState } from "react";
import { Link, router } from "@inertiajs/react";

export default function ExpTable({ maxHeight, showPagination, itemsPerPage, data }) {
    const [expenses, setExpenses] = useState([]);
    const addExpense = (expense) => {
        setExpenses((prevExpenses) => [...prevExpenses, expense]);
      };


  // If no data is passed or it's empty, show a message instead of trying to paginate.
  if (!data || data.length === 0) {
      return <div>No data available</div>;
  }

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate current items to show based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
      setCurrentPage(page);
  };

  const handleDelete = (expenseId) => {
    // Konfirmasi penghapusan
    if (window.confirm('Are you sure you want to delete this expense?')) {
      // Kirim request DELETE menggunakan Inertia.js
      router.delete(route('delete.expense', { id: expenseId }), {
        onSuccess: () => {
          alert('Expense deleted successfully!');
          // Secara opsional, Anda bisa memuat ulang halaman atau memanipulasi data yang ditampilkan
        },
        onError: (error) => {
          alert('Error occurred while deleting expense');
          console.error(error);
        }
      });
    }
  };

  return (
      <div>
          <div className={`overflow-y-scroll hover:cursor-n-resize ${maxHeight}`}>
              <table className="min-w-full bg-allWhite">
                  <thead className="bg-allWhite text-left text-darkprimary font-GRegular">
                      <tr>
                          {/* <th className="px-4 py-2 border text-center">ID</th> */}
                          <th className="px-4 py-2 border text-center">Category</th>
                          <th className="px-4 py-2 border text-center">Amount (IDR)</th>
                          <th className="px-4 py-2 border text-center">Date</th>
                          <th className="px-4 py-2 border text-center">Notes</th>
                          <th className="px-4 py-2 border text-center">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {currentItems.map((item) => (
                          <tr key={item.id} className="text-paleBlack font-GRegular">
                              {/* <td className="px-4 py-2 border text-center">{item.id}</td> */}
                              <td className="px-4 py-2 border text-center">{item.category}</td>
                              <td className="px-4 py-2 border text-center">{item.amount}</td>
                              <td className="px-4 py-2 border text-center">{item.date}</td>
                              <td className="px-4 py-2 border truncated-notes text-center">{item.notes}</td>
                              <td className="px-4 py-2 border flex items-center space-x-2 justify-evenly">
                                  {/* Edit Button */}
                                  <button className="text-green">
                                    <Link href={route('EditExpense', { id: item.id })} size='14px'>
                                        <i className="fas fa-trash-alt">Edit</i>  
                                    </Link>
                                  </button>
                                  {/* Delete Button */}
                                  <button onClick={() => handleDelete(item.id)} className="text-alert hover:text-red-800">
                                    <i className="fas fa-trash-alt"></i> Delete
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          {/* Conditionally Render Pagination */}
          <div className="mt-8 flex items-center justify-end">
              {showPagination && (
                  <div className="join">
                      {/* Previous Button */}
                      <button
                          className={`join-item prevnext ${currentPage === 1 ? 'prevnextDisabled' : ''}`}
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                      >
                          Previous
                      </button>

                      {/* Page Buttons */}
                      {[...Array(totalPages).keys()].map((page) => (
                          <button
                              key={page + 1}
                              className={`join-item pagingtab ${currentPage === page + 1 ? 'pagingtabOn' : ''}`}
                              onClick={() => handlePageChange(page + 1)}
                          >
                              {page + 1}
                          </button>
                      ))}

                      {/* Next Button */}
                      <button
                          className={`join-item prevnext ${currentPage === totalPages ? 'prevnextDisabled' : ''}`}
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                      >
                          Next
                      </button>
                  </div>
              )}
          </div>
      </div>
  );
}
