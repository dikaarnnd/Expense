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

export default function ExpOverview ({ data })  {
    // Extracting the data for the Line chart
    const chartData = {
        labels: data.map((expense) => expense.day), // X-axis labels
        datasets: [
            {
                label: 'Daily Expenses (IDR)',
                data: data.map((expense) =>expense.total_expense), // Data values (amount)
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
