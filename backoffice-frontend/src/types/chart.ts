import type { ChartData, ChartOptions, ChartTypeRegistry } from 'chart.js';

export type ChartProps<TType extends keyof ChartTypeRegistry> = {
  data: ChartData<TType>;
  options?: ChartOptions<TType>;
};
