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

function SolarBarChart({ chartData }) {
  React.useEffect(() => {
    if (chartData.length > 0) {

      const ctx = document.getElementById('myChart').getContext('2d');
      
      new ChartJS(ctx, {
        type: 'bar', // Use bar chart type
        data: {
          labels: chartData.map(entry => entry.date_time),
          datasets: [
            {
              label: 'Solar Power',
              data: chartData.map(entry => entry.value),
              backgroundColor: 'rgba(75, 192, 192, 1)',
            },
            {
              label: 'Eskom',
              data: chartData.map(entry => entry.eskomValue),
              backgroundColor: 'rgba(255, 99, 132, 1)',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Last 24 Hours',
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
      <canvas id="myChart" height="200px"></canvas>
  );
}

export default SolarBarChart;
