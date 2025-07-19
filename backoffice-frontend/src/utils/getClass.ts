export const getTextAlignClass = (align?: 'left' | 'center' | 'right') => {
  if (align === 'left') return 'text-left';
  if (align === 'right') return 'text-right';
  return 'text-center';
};
