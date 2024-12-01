/* eslint-disable prettier/prettier */
import { useState } from "react";

export default function ExpTable({maxHeight, showPagination, itemsPerPage }) {
    const data = [
      { id: '#2020', category: 'Pangan', amount: 'IDR 40.000,00', date: '01/02/2025', notes: 'Lorem ipsum-' },
      { id: '#2021', category: 'Amal', amount: 'IDR 20.000,00', date: '30/01/2025', notes: 'Lorem ipsum-' },
      { id: '#2022', category: 'Belanja', amount: 'IDR 45.000,00', date: '28/01/2025', notes: 'Lorem ipsum-' },
      { id: '#2023', category: 'Bensin', amount: 'IDR 22.000,00', date: '05/02/2025', notes: 'Lorem ipsum-' },
      { id: '#2024', category: 'Belanja', amount: 'IDR 35.000,00', date: '07/02/2025', notes: 'Lorem ipsum-' },
      { id: '#2025', category: 'Pangan', amount: 'IDR 50.000,00', date: '08/02/2025', notes: 'Lorem ipsum-' },
      { id: '#2026', category: 'Amal', amount: 'IDR 15.000,00', date: '10/02/2025', notes: 'Lorem ipsum-' },
      { id: '#2027', category: 'Belanja', amount: 'IDR 30.000,00', date: '12/02/2025', notes: 'Lorem ipsum-' },
      { id: '#2028', category: 'Bensin', amount: 'IDR 20.000,00', date: '14/02/2025', notes: 'Lorem ipsum-' },
      { id: '#2029', category: 'Belanja', amount: 'IDR 40.000,00', date: '16/02/2025', notes: 'Lorem ipsum-' },
      // Add more items as needed for pagination testing
  ];

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


    return (
      <div>

        <div className={`overflow-y-scroll hover:cursor-n-resize ${maxHeight}`}>
          <table className="min-w-full bg-allWhite">
            <thead className="bg-allWhite text-left text-darkprimary font-GRegular">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Amount (IDR)</th>
                <th className="px-4 py-2 border">Date & Time</th>
                <th className="px-4 py-2 border">Notes</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="text-paleBlack font-GRegular">
                  <td className="px-4 py-2 border">{item.id}</td>
                  <td className="px-4 py-2 border">{item.category}</td>
                  <td className="px-4 py-2 border">{item.amount}</td>
                  <td className="px-4 py-2 border">{item.date}</td>
                  <td className="px-4 py-2 border">{item.notes}</td>
                  <td className="px-4 py-2 border flex items-center space-x-2">
                    {/* Edit Button */}
                    <button className="text-green">
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    {/* Delete Button */}
                    <button className="text-alert hover:text-red-800">
                      <i className="fas fa-trash-alt"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Conditionally Render Pagination */}
        <div className="mt-4 flex items-center justify-end ">

          {showPagination && (
            <div className="join ">
              {/* Previous Button */}
              <button
                className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {/* Page Buttons */}
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page + 1}
                  className={`join-item pagingtab ${currentPage === page + 1 ? '' : ''}`}
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                className={`join-item btn ${currentPage === totalPages ? 'btn-disabled' : ''}`}
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
