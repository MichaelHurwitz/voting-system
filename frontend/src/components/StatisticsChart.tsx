import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Candidate } from '../types/candidate';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StatisticsChartProps {
  candidates: Candidate[];
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ candidates }) => {
  const data = {
    labels: candidates.map(candidate => candidate.name),
    datasets: [
      {
        label: 'Votes',
        data: candidates.map(candidate => candidate.votes),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true, 
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StatisticsChart;
