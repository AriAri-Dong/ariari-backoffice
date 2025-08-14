// components/LineChart.tsx
import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { ChartProps } from '../../types/chart';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChart: React.FC<ChartProps<'line'>> = ({ data, options }) => {
  return (
    <Line
      data={data}
      options={options}
    />
  );
};

export default LineChart;
