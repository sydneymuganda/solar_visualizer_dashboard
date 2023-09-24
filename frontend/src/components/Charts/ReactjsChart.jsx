import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = ['00:00', '01:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

function getRandomNumber(min, max) {
    const random = Math.random();
    const scaledRandom = random * (max - min + 1) + min;
    return Math.floor(scaledRandom);
}

  export const data = {
    labels,
    datasets: [
      {
        label: ' generation',
        data: labels.map(() => getRandomNumber(1, 1000)),
        backgroundColor: 'rgba(113, 175, 181, 0.8)',
      },
      {
        label: ' consumption',
        data: labels.map(() => getRandomNumber(1, 1000)),
        backgroundColor: 'rgba(255, 103, 77, 0.8)',
      },
    ],
  };
  
export function ReactjsChart() {
    return <Bar options={options} data={data} />;
};