export type Column<T> = {
  key: keyof T | string;
  title: string;
  className?: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T, index: number) => React.ReactNode;
};
