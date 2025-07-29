import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { ChartProps } from '../../types/chart';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart: React.FC<ChartProps<'bar'>> = ({ data, options }) => {
  return (
    <Bar
      data={data}
      options={options}
    />
  );
};

export default BarChart;
