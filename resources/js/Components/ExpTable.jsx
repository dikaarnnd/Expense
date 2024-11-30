/* eslint-disable prettier/prettier */
export default function ExpTable() {
    const data = [
        {
            id: '#2020',
            category: 'Pangan',
            amount: 'IDR 40.000,00',
            date: '01/02/2025',
            notes: 'Lorem ipsum-',
        },
        {
            id: '#2021',
            category: 'Amal',
            amount: 'IDR 20.000,00',
            date: '30/01/2025',
            notes: 'Lorem ipsum-',
        },
        {
            id: '#2022',
            category: 'Belanja',
            amount: 'IDR 45.000,00',
            date: '28/01/2025',
            notes: 'Lorem ipsum-',
        },
        {
            id: '#2023',
            category: 'Bensin',
            amount: 'IDR 22.000,00',
            date: '05/02/2025',
            notes: 'Lorem ipsum-',
        },
        {
            id: '#2024',
            category: 'Belanja',
            amount: 'IDR 35.000,00',
            date: '07/02/2025',
            notes: 'Lorem ipsum-',
        },
    ];

    return (
      <div className="max-h-32 overflow-y-scroll hover:cursor-n-resize ">
        <table className="min-w-full bg-allWhite ">
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
            {data.map((item) => (
              <tr key={item.id} className="text-paleBlack font-GRegular">
                <td className="px-4 py-2 border">{item.id}</td>
                <td className="px-4 py-2 border">{item.category}</td>
                <td className="px-4 py-2 border">{item.amount}</td>
                <td className="px-4 py-2 border">{item.date}</td>
                <td className="px-4 py-2 border">{item.notes}</td>
                <td className="px-4 py-2 border flex items-center space-x-2">
                  {/* Edit Button */}
                  <button className="text-green ">
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
    );
}
