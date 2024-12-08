/* eslint-disable prettier/prettier */
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Link } from '@inertiajs/react';

// Register the necessary chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement // This is required for Pie chart
);

// Example static data (could come from Laravel API)
const categories = [
    { id: 1, name: '🍔 Food', percentage: '40 %', amount: 'IDR 360k', expensesCount: 16 },
    { id: 2, name: '🏠 Housing', percentage: '30 %', amount: 'IDR 200k', expensesCount: 10 },
    { id: 3, name: '🚗 Transportation', percentage: '10 %', amount: 'IDR 100k', expensesCount: 5 },
    { id: 4, name: '💪 Health & Fitness', percentage: '15 %', amount: 'IDR 150k', expensesCount: 8 },
    { id: 5, name: '🎉 Entertainment', percentage: '5 %', amount: 'IDR 50k', expensesCount: 3 }
];

const PieChart = () => {
    // Data for Pie chart

    const data = categories.map(category => parseFloat(category.percentage.replace('%', '')));

    const pieData = {
        datasets: [
            {
                data: data, // Pie chart data
                backgroundColor: [
                    '#FF6384', // Food
                    '#36A2EB', // Housing
                    '#FFCE56', // Transportation
                    '#4BC0C0', // Health & Fitness
                    '#9966FF'  // Entertainment
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF'
                ],
            },
        ],
    };

    // Options for Pie chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Expense Distribution by Category',
            },
            tooltip: {
              callbacks: {
                  // Customizing the tooltip label
                  label: function (tooltipItem) {
                      const category = categories[tooltipItem.dataIndex]; // Get category by index
                      return `${category.name}: ${category.amount} (${category.percentage})`;
                  },
              },
          },
        },
    };

    return (
        <div>
            {/* Pie chart */}
            <div className='size-40 w-full flex-col flex items-center'>
              <Pie data={pieData} options={options} />

            </div>

            {/* List of categories */}
            <div className="scrollnobar max-h-60">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 border-b border-subheading">
                    <div>
                      <h2 className="categoryLabel">{category.id}. {category.name}</h2>
                      <p className="text-sm text-paleBlack">{category.percentage}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-darkprimary font-GMedium">{category.amount}</p>
                      <p className="text-sm text-paleBlack font-GRegular">{category.expensesCount} expenses</p>
                    </div>
                  </div>
                ))}
               
            </div>
        </div>
    );
};

export default PieChart;
