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
  { id: 1, day: 'Monday', amount: 'IDR 100k', expensesCount: 5 },
  { id: 2, day: 'Tuesday', amount: 'IDR 120k', expensesCount: 6 },
  { id: 3, day: 'Wednesday', amount: 'IDR 80k', expensesCount: 4 },
  { id: 4, day: 'Thursday', amount: 'IDR 90k', expensesCount: 5 },
  { id: 5, day: 'Friday', amount: 'IDR 110k', expensesCount: 7 },
  { id: 6, day: 'Saturday', amount: 'IDR 150k', expensesCount: 8 },
  { id: 7, day: 'Sunday', amount: 'IDR 130k', expensesCount: 6 },
];

export default function ExpOverview ()  {
    // Extracting the data for the Line chart
    const chartData = {
        labels: categories.map((category) => category.day), // X-axis labels
        datasets: [
            {
                label: 'Daily Expenses (IDR)',
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
