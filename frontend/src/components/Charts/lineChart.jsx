import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar,Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js line Chart',
      },
    },
  };
  
 //const labels = ['00:00', '01:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

function getRandomNumber(min, max) {
    const random = Math.random();
    const scaledRandom = random * (max - min + 1) + min;
    return Math.floor(scaledRandom);
}

export const data = {
labels: ['00:00', '01:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    datasets: [

      {
        labels: ['00:00', '01:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        data:[0,3,4,1,3,5,8,9,10,13,2,6,4,3,2,5,6,5,4,3,8,10,4,2],
        backgroundColor: 'rgba(255, 103, 77, 0.8)',
        pointBorderColor: 'transparent',
        pointBorderWidth: 4,
      }
    ]
  };
  
export function lineChart() {
    return <Line options={options} data={data} />;
};