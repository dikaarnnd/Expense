/* eslint-disable prettier/prettier */
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the necessary chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const categories = [
  { id: 1, name: '🍔 Food', percentage: '40 %', amount: 'IDR 360k', expensesCount: 16 },
  { id: 2, name: '🏠 Housing', percentage: '30 %', amount: 'IDR 200k', expensesCount: 10 },
  { id: 3, name: '🚗 Transportation', percentage: '10 %', amount: 'IDR 100k', expensesCount: 5 },
  { id: 4, name: '💪 Health & Fitness', percentage: '15 %', amount: 'IDR 150k', expensesCount: 8 },
  { id: 5, name: '🎉 Entertainment', percentage: '5 %', amount: 'IDR 50k', expensesCount: 3 }
];

export default function ExpOverview ()  {
    // Extracting the data for the Line chart
    const chartData = {
        labels: categories.map((category) => category.name), // X-axis labels
        datasets: [
            {
                label: 'Expenses (IDR)',
                data: categories.map((category) =>
                    parseInt(category.amount.replace(/[^\d.-]/g, '')),
                ), // Data values (amount)
                fill: false,
                borderColor: 'rgba(75,192,192,1)', // Line color
                tension: 0.1,
            },
        ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false, // Allow the chart to resize
      height: '20%', // Ensures the chart height fills the container
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
    

    return (
        <div className=' w-full flex justify-center items-center'>
            <Line data={chartData} options={chartOptions} height={275} />
        </div>
    );
};


