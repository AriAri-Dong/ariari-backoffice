// components/DoughnutChart.tsx
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { ChartProps } from '../../types/chart';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart: React.FC<ChartProps<'doughnut'>> = ({ data, options }) => {
  return (
    <Doughnut
      data={data}
      options={options}
    />
  );
};

export default DoughnutChart;
